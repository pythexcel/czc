import { useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import ChevronDownIcon from "../Component/ChevronDownIcon";
import CustomField from "../Component/CustomField";
import DropDown from "../Component/DropDown";
import LoadingButton from "../Component/LoadingButton";
import TagType from "../Component/TagType";
import InputField from "../Component/TextInput";
import Title from "../Component/Title";
import TriggerWebhook from "../Component/TriggerWebhook";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import TextArea from "../Common-Component/TextArea";
import { addEmptyWebhookObject, deleteWebhook, handleReset } from "../Store/slice/TriggerWebhookSlice";
import CustomSelector from "../Common-Component/CustomSelector";
import { deleteTagType, resetTagState } from '../Store/slice/TagTypeSlice';
import { deleteCustomField, resetCustomField } from '../Store/slice/CustomFieldSlice';
import ToastFailed from '../Modal/ToastFailed';

const Intromessage = ["Text", "Custom Field", "Custom Value"];

const TzReference = ["Contact", "Location"];

const Tzformate = ["Abbreviated", "Hidden"];

const Timeformat = ["12 H", "24 H"];

const opt = ["Tag Type", "Custom Field Type", "Trigger Webhook"];

const optGpt = ["GPT-3", "GPT-3.5", "GPT-4"];

const OptAi = ["Booking", "Non Booking"];

function CreateBot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("Custom Field Name")
  const [message, setMassage] = useState("Custom Field Name")

  const [allerror, setAllError] = useState([]);

  const [respErr, setRespErr] = useState(false)

  const childData = useSelector((state) => state.tag.childData);

  const customfieldata = useSelector((state) => state.custom.customfieldData);

  const triggerwebhookdata = useSelector((state) => state.TriggerWebhook.triggerWebhookData);

  const [addtag, setAddTag] = useState([]);
  const [customfield, setCustomfield] = useState([]);
  const [tagNameErrors, setTagNameErrors] = useState([])

  const HandleAddTage = () => {
    setAddTag([...addtag, addtag.length]);
  };

  const handleDeleteTage = (index) => {
    setAddTag((p) => p.filter((addtagIndex) => addtagIndex !== index));
    dispatch(deleteTagType(index));
  };

  const handleAddCustomField = () => {
    setCustomfield([...customfield, customfield.length]);
  };

  const handleDeleteCustomeField = (index) => {
    setCustomfield((p) =>
      p.filter((addCustomIndex) => addCustomIndex !== index)
    );
    dispatch(deleteCustomField(index))
  };

  const handleAddTriggerWebhook = () => {
    dispatch(addEmptyWebhookObject())
  };

  const handleDeleteTriggerWebhook = (index) => {
    dispatch(deleteWebhook(index))
  };

  const handleSelectChange = (event) => {
    const renderComponent = event.target.value;
    if (renderComponent === "Tag Type") {
      HandleAddTage();
    } else if (renderComponent === "Custom Field Type") {
      handleAddCustomField();
    } else if (renderComponent === "Trigger Webhook") {
      handleAddTriggerWebhook();
    }
  };

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const foreignElements = (
    <div>
      {respErr &&
        <ToastFailed
          onClose={() => setRespErr(false)}
          title="Error!"
          message="something went wrong"
        />}
      {Array.isArray(addtag) &&
        addtag.map((index) => (
          <TagType
            onDeleteClick={handleDeleteTage}
            index={index}
            key={index}
            errors={tagNameErrors}
          />
        ))}

      {Array.isArray(customfield) &&
        customfield.map((index) => (
          <CustomField
            onDeleteClick={handleDeleteCustomeField}
            index={index}
            key={index}
            error={tagNameErrors}
          />
        ))}

      {Array.isArray(triggerwebhookdata) &&
        triggerwebhookdata.map((item, index) => (
          <TriggerWebhook
            onDeleteWebhook={handleDeleteTriggerWebhook}
            index={index}
            key={index}
            data={item}
            error={tagNameErrors}
          />
        ))}
    </div>
  );

  const tag_type = childData?.map((item) => ({
    tag_name: item?.tagname,
    goal_description: item?.description,
  }));

  const customfields = customfieldata?.map((item) => ({
    field_name: item.customFieldTagname,
    field_type: item.customFieldType,
    field_description: item.customFieldDescription,
    allow_overwrite: item.allowCustomOverWright,
  }));

  const tiggerwebhook = triggerwebhookdata?.map((item) => ({
    goal_name: item.Triggergoalname,
    triggers: item.TriggerselectTriggers,
    webhook_request_method: item.TriggervalueOfheaders,
    webhook_url: item.TriggerwebhookUrl,
    webhook_description: item.Triggerwebhookdesc,
    header_type: item.headers.map((data) => ({
      headers: data.headerName,
      value_of_header: data.valueOfHeader
    }))
  }));

  const CreateAIBot = async (values) => {
    setIsLoading(true);
    setAllError([])
    setTagNameErrors([])
    try {
      const createBotresp = await axiosInstance.post("bot/", {
        bot_type: {
          ai_type: values.AiType,
          bot_name: values.Botname,
          bot_description: values.BotDescription,
          prompt_type: values.PromptType ? values.PromptType : "Custom Field",
          prompt: values.Prompt,
          intro_message_type: values.IntroMessageType ? values.IntroMessageType : "Custom Field",
          intro_message: values.IntroMessage,
          converstation_limit: values.Conversation,
          time_zone_reference: values.TimeZoneReference,
          time_zone_format: values.TimeZoneFormat,
          time_format: values.TimeFormat,
          gpt_model: values.GPTmodel,
          open_ai_api_key: values.OpenAikey,
          message_delay: values.messageDelay,
        },
        tag_type: tag_type,
        custom_field_type: customfields,
        trigger_webhook_type: tiggerwebhook,
      });
      console.log(createBotresp.webhook)
      dispatch(resetCustomField())
      dispatch(resetTagState())
      dispatch(handleReset())
      navigate("/dashboard/bots");
    } catch (error) {
      setRespErr(true)
      setIsLoading(false)
      if (error?.response?.data) {
        setAllError(error.response.data);
        if (error.response.data?.non_field_errors) {
          setTagNameErrors(error.response.data?.non_field_errors)
        }
      }
      console.log(error.response.data.non_field_errors, "I am error");
    }
  };

  const formik = useFormik({
    initialValues: {
      AiType: "",
      Botname: "",
      BotDescription: "",
      PromptType: "",
      Prompt: "",
      IntroMessageType: "",
      IntroMessage: "",
      OpenAikey: "",
      Conversation: "",
      TimeZoneReference: "",
      TimeZoneFormat: "",
      TimeFormat: "",
      GPTmodel: "",
      messageDelay: "",
    },
    onSubmit: async (values) => {
      CreateAIBot(values);
    },
  });

  useEffect(() => {
    if (formik.values.PromptType === "Text") {
      setPrompt("Prompt Text");
    } else if (formik.values.PromptType === "Custom Field") {
      setPrompt("Custom Field Name");
    } else if (formik.values.PromptType === "Custom Value") {
      setPrompt("Custom Value Name")
    } else {
      setPrompt("Custom Field Name");
    }
  }, [formik.values.PromptType]);

  useEffect(() => {
    if (formik.values.IntroMessageType === "Text") {
      setMassage("Text")
    } else if (formik.values.IntroMessageType === "Custom Field") {
      setMassage("Custom Field Name")
    } else if (formik.values.IntroMessageType === "Custom Value") {
      setMassage("Custom Value Name")
    } else {
      setMassage("Custom Field Name");
    }
  }, [formik.values.IntroMessageType])

  const handleCancel = () => {
    dispatch(resetCustomField())
    dispatch(resetTagState())
    dispatch(handleReset())
    navigate("/dashboard/bots")
  }

  return (
    <div className="w-[100%] bg-white border border-gray-400 rounded-lg px-8 py-6 shadow-lg">
      <p className="text-gray-600 font-bold text-xl">Create Bot</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-6 my-7">
          <div className="w-[50%]">
            <Title>AI Type</Title>
            <div className="relative">
              <DropDown
                id="AiType"
                name="AiType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.AiType}
              >
                <option default value={""} className="hidden">
                  Select
                </option>
                {OptAi.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
            {allerror.ai_type &&
              <p className="text-red-500">{allerror.ai_type}</p>
            }
          </div>
          <div className="w-[50%]">
            <Title>Bot Name</Title>
            <InputField
              type="text"
              id="Botname"
              name="Botname"
              placeholder="Bot Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Botname}
            />
            {allerror.bot_name &&
              <p className="text-red-500">{allerror.bot_name}</p>
            }
          </div>
        </div>
        <div className="w-full my-4">
          <Title>Bot Description</Title>
          <TextArea
            type="text"
            id="BotDescription"
            name="BotDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.BotDescription}
            placeholder="Description"
          />
        </div>
        <div className="flex gap-6 my-4">
          <div className="w-[50%]">
            <Title>Prompt Type</Title>
            <div className="relative">
              <DropDown
                id="PromptType"
                name="PromptType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.PromptType}
              >
                <option selected value="Custom Field" className="hidden">
                  Custom Field
                </option>
                {Intromessage.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
          </div>

          <div className="w-[50%]">
            <Title>Enter {prompt}</Title>
            <InputField
              type="text"
              id="Prompt"
              name="Prompt"
              placeholder="Prompt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Prompt}
            />
            {allerror.prompt &&
              <p className="text-red-500">{allerror.prompt}</p>
            }
          </div>
        </div>
        <div className="flex gap-6 my-4">
          <div className="w-[50%]">
            <Title>Intro Message Type</Title>
            <div className="relative">
              <DropDown
                id="IntroMessageType"
                name="IntroMessageType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.IntroMessageType}
              >
                <option selected value="Custom Field" className="hidden">
                  Custom Field
                </option>
                {Intromessage.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="w-[50%]">
            <Title>Intro Message {message}</Title>
            <InputField
              type="text"
              id="IntroMessage"
              name="IntroMessage"
              placeholder="IntroMessage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.IntroMessage}
            />
            {allerror.intro_message &&
              <p className="text-red-500">{allerror.intro_message}</p>
            }
          </div>
        </div>
        <div className="flex gap-6 my-4">
          <div className="w-[50%]">
            <Title>OpenAi Key</Title>
            <InputField
              type="text"
              id="OpenAikey"
              name="OpenAikey"
              placeholder="OpenAikey"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.OpenAikey}
              autoComplete="off"
            />
            {allerror.open_ai_api_key &&
              <p className="text-red-500">{allerror.open_ai_api_key}</p>
            }
          </div>
          <div className="w-[50%]">
            <Title>Conversation Limit</Title>
            <InputField
              type="number"
              id="Conversation"
              name="Conversation"
              placeholder="Bot Conversation Limit"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Conversation}
              min={0}
            />
            {allerror.converstation_limit &&
              <p className="text-red-500">{allerror.converstation_limit}</p>
            }
          </div>
        </div>
        <div className="flex gap-6 my-4">
          <div className="w-[50%] flex gap-6">
            <div className="w-1/3">
              <Title>Time Zone Reference</Title>
              <div className="relative">
                <DropDown
                  id="TimeZoneReference"
                  name="TimeZoneReference"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.TimeZoneReference}
                >
                  <option default value={""} className="hidden">
                    Select
                  </option>
                  {TzReference.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
              {allerror.time_zone_reference &&
                <p className="text-red-500">{allerror.time_zone_reference}</p>
              }
            </div>
            <div className="w-1/3">
              <Title>Time zone Format</Title>
              <div className="relative">
                <DropDown
                  id="TimeZoneFormat"
                  name="TimeZoneFormat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.TimeZoneFormat}
                >
                  <option default value={""} className="hidden">
                    Select
                  </option>
                  {Tzformate.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
              {allerror.time_zone_format &&
                <p className="text-red-500">{allerror.time_zone_format}</p>
              }
            </div>
            <div className="w-1/3">
              <Title>Time Format</Title>
              <div className="relative">
                <DropDown
                  id="TimeFormat"
                  name="TimeFormat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.TimeFormat}
                >
                  <option default value={""} className="hidden">
                    Select
                  </option>
                  {Timeformat.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
              {allerror.time_format &&
                <p className="text-red-500">{allerror.time_format}</p>
              }
            </div>
          </div>
          <div className="w-[50%]">
            <Title>GPT Model</Title>
            <div className="relative">
              <DropDown
                id="GPTmodel"
                name="GPTmodel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GPTmodel}
              >
                <option default value={""} className="hidden">
                  Select
                </option>
                {Array.isArray(optGpt) &&
                  optGpt.map((item, i) => <option key={i}>{item}</option>)}
              </DropDown>
              <ChevronDownIcon />
            </div>
            {allerror.gpt_model &&
              <p className="text-red-500">{allerror.gpt_model}</p>
            }
          </div>
        </div>
        <div className="flex gap-6 my-4">
          <div className="w-[50%]">
            <Title>Message Waiting Delay (seconds) ?</Title>
            <InputField
              type="number"
              id="messageDelay"
              name="messageDelay"
              placeholder="Waiting Delay"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.messageDelay}
              min={0}
            />
            {allerror.message_delay &&
              <p className="text-red-500">{allerror.message_delay}</p>
            }
          </div>
          <div className="w-[50%]">
            <div className="relative gap-3">
              <CustomSelector
                onChange={handleSelectChange}
                onClick={toggleIsOpen}
                value={"+ add a Goal"}
              >
                <option className="font-bold text-blue-600 hidden">
                  + Add a Goal
                </option>
                {opt.map((item, i) => (
                  <option
                    key={i}
                    className="hover:text-blue-400 bg-white text-gray-500 text-start p-5"
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </CustomSelector>
              <span
                className={`absolute top-0 h-full ml-[18%] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${isOpen ? "transform rotate-180" : ""
                  }`}
                style={{
                  hover: {
                    color: "white",
                  },
                }}
              >
                <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold" />
              </span>
            </div>
          </div>
        </div>
        {foreignElements}
        <div className="flex gap-2 my-6">
          <button
            type="button"
            onClick={handleCancel}
            className="border border-blue-600 rounded-md text-blue-600 px-12 font-semibold py-2 text-md hover:bg-blue-600 hover:text-white"
          >
            Cancel
          </button>
          <LoadingButton type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default CreateBot;

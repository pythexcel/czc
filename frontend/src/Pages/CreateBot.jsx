import { useEffect, useState } from "react";
import { HiOutlineChevronDown } from 'react-icons/hi';
import ChevronDownIcon from "../Component/ChevronDownIcon";
import CustomField from "../Component/CustomField";
import DropDown from "../Component/DropDown";
import LoadingButton from "../Component/LoadingButton";
import TagType from "../Component/TagType";
import InputField from '../Component/TextInput';
import Title from "../Component/Title";
import TriggerWebhook from "../Component/TriggerWebhook";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../utils/axios";
import 'react-toastify/dist/ReactToastify.css';
import TextArea from "../Common-Component/TextArea";
import Updatebutton from "../Common-Component/Updatebutton";

const Intromessage = [
  "Text",
  "Custom Field",
  "Custom Value"
]

const TzReference = [
  "Contact",
  "Location"
]

const Tzformate = [
  "Abbreviated",
  "Hidden"
]

const Timeformat = [
  "12H",
  "24H"
]

const opt = [
  "Tag Type",
  "Custom Field Type",
  "Trigger Webhook"
]

const optGpt = [
  "GPT-3",
  "GPT-3.5",
  "GPT-4"
]

const OptAi = [
  "Booking",
  "Non-Booking"
]


function CreateBot() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uniqueId = queryParams.get('id');

  const [headerValues, setHeaderValues] = useState({});
  const [nameValues, setNameValues] = useState({});
  // const [headerData, setHeaderData] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  console.log(headerValues, nameValues, "this is values");

  const childData = useSelector((state) => state.tag.childData);
  console.log(childData, "I am child component data")

  const customfieldata = useSelector((state) => state.customReducer.customfieldData);
  console.log(customfieldata, "this is data of custom Fields")

  const triggerwebhookdata = useSelector((state) => state.TriggerWebhook.triggerWebhookData);
  console.log(triggerwebhookdata, "triggerwebhookdata,,,,")

  const headerdata = useSelector((state) => state.inputHeader.inputHeaderData);
  console.log(headerdata)

  const [addtag, setAddTag] = useState([]);
  const [customfield, setCustomfield] = useState([]);
  const [triggerWebhook, setTriggerWebhook] = useState([]);

  const HandleAddTage = () => {
    setAddTag([...addtag, addtag.length])
  }

  const handleDeleteTage = (index) => {
    setAddTag(p => p.filter(addtagIndex => addtagIndex !== index))
  }

  const handleAddCustomField = () => {
    setCustomfield([...customfield, customfield.length])
  }

  const handleDeleteCustomeField = (index) => {
    setCustomfield(p => p.filter(addCustomIndex => addCustomIndex !== index))
  }

  const handleAddTriggerWebhook = () => {
    setTriggerWebhook([...triggerWebhook, triggerWebhook.length])
  }

  const handleDeleteTriggerWebhook = (index) => {
    setTriggerWebhook(p => p.filter(addWebhookIndex => addWebhookIndex !== index))
  }

  const handleSelectChange = (event) => {
    const renderComponent = event.target.value;
    if (renderComponent === 'Tag Type') {
      HandleAddTage();
    } else if (renderComponent === 'Custom Field Type') {
      handleAddCustomField();
    } else if (renderComponent === 'Trigger Webhook') {
      handleAddTriggerWebhook();
    }
  };

  const toggleIsOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const foreignElements =
    <div>
      {Array.isArray(addtag) && addtag.map((index) => (
        <TagType
          onDeleteClick={handleDeleteTage}
          index={index}
          key={index}
        />
      ))}

      {Array.isArray(customfield) && customfield.map((index) => (
        <CustomField
          onDeleteClick={handleDeleteCustomeField}
          index={index}
          key={index} />
      ))}

      {Array.isArray(triggerWebhook) && triggerWebhook.map((index) => (
        <TriggerWebhook
          setHeaderValues={setHeaderValues}
          setNameValues={setNameValues}
          onDeleteWebhook={handleDeleteTriggerWebhook}
          index={index}
          key={index}
        />
      ))}
    </div>

  const tag_type = childData.map((item, index) => ({
    "tag_name": item.tagname,
    "goal_description": item.description
  }));

  const customfields = customfieldata.map((item, index) => ({
    "field_name": item.customFieldTagname,
    "field_type": item.customFieldType,
    "field_description": item.customFieldDescription,
    "allow_overwrite": item.allowCustomOverWright
  }));

  const tiggerwebhook = triggerwebhookdata.map((item, index) => ({
    "goal_name": item.Triggergoalname,
    "triggers": item.TriggerselectTriggers,
    "webhook_request_method": item.TriggervalueOfheaders,
    "webhook_url": item.TriggerwebhookUrl,
    "webhook_description": item.Triggerwebhookdesc
  }))

  const CreateAIBot = async (values) => {
    setIsLoading(true)
    try {
      const createBot = await axiosInstance.post("bot", {
        "bot_type": {
          "ai_type": values.AiType,
          "bot_name": values.Botname,
          "bot_description": values.BotDescription,
          "prompt_type": values.PromptType,
          "prompt": values.Prompt,
          "intro_message_type": values.IntroMessageType,
          "intro_message": values.IntroMessage,
          "converstation_limit": values.Conversation,
          "time_zone_reference": values.TimeZoneReference,
          "time_zone_format": values.TimeZoneFormat,
          "time_format": values.TimeFormat,
          "gpt_model": values.GPTmodel,
          "open_ai_api_key": values.OpenAikey,
          "message_delay": values.messageDelay
        },
        "tag_type": tag_type,
        "custom_field_type": customfields,
        "trigger_webhook_type": tiggerwebhook
      })
      navigate("/dashboard/bots")
      console.log(createBot.response.data, ">>>>>>>>>>")
    } catch (error) {
      alert("i am error")
    }
  }

  const handleSubmitForUpdate = async (values) => {
    try {
      const createBot = await axiosInstance.put(`bot/${uniqueId}`, {
        "bot_type": {
          "ai_type": values.AiType,
          "bot_name": values.Botname,
          "bot_description": values.BotDescription,
          "prompt_type": values.PromptType,
          "prompt": values.Prompt,
          "intro_message_type": values.IntroMessageType,
          "intro_message": values.IntroMessage,
          "converstation_limit": values.Conversation,
          "time_zone_reference": values.TimeZoneReference,
          "time_zone_format": values.TimeZoneFormat,
          "time_format": values.TimeFormat,
          "gpt_model": values.GPTmodel,
          "open_ai_api_key": values.OpenAikey,
          "message_delay": values.messageDelay
        },
        "tag_type": tag_type,
        "custom_field_type": customfields,
        "trigger_webhook_type": tiggerwebhook
      })
      navigate("/dashboard/bots")
      console.log(createBot.response.data, "udpate data as well")
    } catch (error) {
      // alert("i am error")
      console.log(error,"i am error")
    }
  }

  const formik = useFormik({
    initialValues: {
      AiType: '',
      Botname: '',
      BotDescription: '',
      PromptType: '',
      Prompt: '',
      IntroMessageType: '',
      IntroMessage: '',
      OpenAikey: '',
      Conversation: '',
      TimeZoneReference: '',
      TimeZoneFormat: '',
      TimeFormat: '',
      GPTmodel: '',
      messageDelay: ''
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      if (update) {
        await handleSubmitForUpdate(values);
      } else {
        await CreateAIBot(values);
      }
      resetForm();
    },
  });

  const getBotForUpdate = async (uniqueId) => {
    try {
      const resp = await axiosInstance.get(`bot/${uniqueId}`)
      const data = resp.details[0];
      formik.setValues({
        AiType: data.ai_type,
        Botname: data.bot_name,
        BotDescription: data.bot_description,
        PromptType: data.prompt_type,
        Prompt: data.prompt,
        IntroMessageType: data.intro_message_type,
        IntroMessage: data.intro_message,
        OpenAikey: data.open_ai_api_key,
        Conversation: data.converstation_limit,
        TimeZoneReference: data.time_zone_reference,
        TimeZoneFormat: data.time_zone_format,
        TimeFormat: data.time_format,
        GPTmodel: data.gpt_model,
        messageDelay: data.message_delay
      })
      console.log(resp.details[0], "i am ready for update ")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBotForUpdate(uniqueId)
    setUpdate(true)
  }, [uniqueId])


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
                <option default value={""} className="hidden">Select</option>
                {OptAi.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
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
          </div>
        </div>
        <div className="w-full my-4">
          <Title>Bot Description</Title>
          <TextArea
            id="BotDescription"
            name="BotDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.BotDescription}
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
                <option default value={""} className="hidden">Select</option>
                {Intromessage.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="w-[50%]">
            <Title>Prompt</Title>
            <InputField
              type="text"
              id="Prompt"
              name="Prompt"
              placeholder="Prompt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Prompt}
            />
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
                value={formik.values.IntroMessageType}>
                <option default value={""} className="hidden">Select</option>
                {Intromessage.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="w-[50%]">
            <Title>Intro Message</Title>
            <InputField
              type="text"
              id="IntroMessage"
              name="IntroMessage"
              placeholder="IntroMessage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.IntroMessage}
            />
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
            />
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
                  <option default value={""} className="hidden">Select</option>
                  {TzReference.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
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
                  <option default value={""} className="hidden">Select</option>
                  {Tzformate.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
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
                  <option default value={""} className="hidden">Select</option>
                  {Timeformat.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
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
                <option default value={""} className="hidden">Select</option>
                {Array.isArray(optGpt) && optGpt.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
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
            />
          </div>
          <div className="w-[50%]">
            <div className="relative gap-3">
              <select className="rounded-lg border border-blue-600 appearance-none py-2 text-base justify-center focus:shadow-lg pl-5 pr-8 text-center font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer"
                onChange={handleSelectChange}
                onClick={toggleIsOpen}
                value={"+ add a Goal"}
              >
                <option className="font-bold text-blue-600 hidden">+ Add a Goal</option>
                {opt.map((item, i) => (
                  <option
                    key={i}
                    className="hover:text-blue-400 bg-white text-gray-500 text-start p-5"
                    value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className={`absolute top-0 h-full ml-[18%] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${isOpen ? 'transform rotate-180' : ''}`} style={{
                hover: {
                  color: "white"
                }
              }}>
                <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold" />
              </span>
            </div>
          </div>
        </div>
        {foreignElements}
        <div className="flex gap-2 my-6">
          <Link to="/dashboard/bots">
            <button type="btn" className="border border-blue-600 rounded-md text-blue-600 px-12 font-semibold py-2 text-md hover:bg-blue-600 hover:text-white">Cancel</button>
          </Link>
          {update ? <Updatebutton type="submit" handleSubmitForUpdate={handleSubmitForUpdate} /> : <LoadingButton type="submit" isLoading={isLoading} />}
        </div>
      </form>
    </div>
  )
}

export default CreateBot;
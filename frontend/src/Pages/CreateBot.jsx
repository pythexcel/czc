import { useState } from "react";
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
import * as Yup from 'yup';
import AlertTitle from '../Common-Component/AlertTitle';
import { useSelector } from 'react-redux';

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
  const [isLoading, setIsLoading] = useState(false);
  const [headerValues, setHeaderValues] = useState({});
  const [nameValues, setNameValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  console.log(headerValues, nameValues, "this is values");

  const Tagname = useSelector(state => state.tag.Tagname)
  const textArea = useSelector(state => state.tag.textArea)
  console.log(Tagname, textArea, "this is the data of Tag Type ")

  const customfieldTagname = useSelector(state => state.customReducer.customfieldtag)
  const customfieldDropdown = useSelector(state => state.customReducer.customfieldselector)
  const customfieldDescription = useSelector(state => state.customReducer.customfieldDesc)

  console.log(customfieldTagname, customfieldDropdown, customfieldDescription, "this is data of custom Fields")

  const GoalName = useSelector(state => state.TriggerWebhook.Triggergoalname)
  const selectTrigger = useSelector(state => state.TriggerWebhook.TriggerselectTriggers)
  const webhookurl = useSelector(state => state.TriggerWebhook.TriggerwebhookUrl)
  const webhookdescription = useSelector(state => state.TriggerWebhook.Triggerwebhookdesc)
  const valueOfheader = useSelector(state => state.TriggerWebhook.TriggervalueOfheaders)

  console.log(GoalName, selectTrigger, webhookurl, webhookdescription, valueOfheader, "this is data of Trigger Webhook")

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
    setIsOpen(prevIsOpen => !prevIsOpen); // Toggle the value
  };

  const foreignElements =
    <div>
      {Array.isArray(addtag) && addtag.map((index) => (
        <TagType onDeleteClick={handleDeleteTage} index=
          {index} key={index} />
      ))}

      {Array.isArray(customfield) && customfield.map((index) => (
        <CustomField onDeleteClick={handleDeleteCustomeField} index={index} key={index} />
      ))}

      {Array.isArray(triggerWebhook) && triggerWebhook.map((index) => (
        <TriggerWebhook setHeaderValues={setHeaderValues} setNameValues={setNameValues} onDeleteWebhook={handleDeleteTriggerWebhook} index={index} key={index} />
      ))}
    </div>

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
    validationSchema: Yup.object({
      AiType: Yup.string().required('Field is required'),
      Botname: Yup.string().required('Field is required'),
      PromptType: Yup.string().required('Field is required'),
      Prompt: Yup.string().required('Field is required'),
      IntroMessageType: Yup.string().required('Field is required'),
      IntroMessage: Yup.string().required('Field is required'),
      OpenAikey: Yup.string().required('Field is required'),
      Conversation: Yup.string().required('Field is required'),
      TimeZoneReference: Yup.string().required('Field is required'),
      TimeZoneFormat: Yup.string().required('Field is required'),
      TimeFormat: Yup.string().required('Field is required'),
      GPTmodel: Yup.string().required('Field is required')
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

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
            {formik.touched.AiType && formik.errors.AiType ? (
              <AlertTitle>{formik.errors.AiType}</AlertTitle>
            ) : null}


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
            {formik.touched.Botname && formik.errors.Botname ? (
              <AlertTitle>{formik.errors.Botname}</AlertTitle>
            ) : null}
          </div>
        </div>
        <div className="w-full my-4">
          <Title>Bot Description</Title>
          <textarea
            id="BotDescription"
            name="BotDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.BotDescription}
            className=" bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[100px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder="Description"></textarea>
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
            {formik.touched.PromptType && formik.errors.PromptType ? (
              <AlertTitle>{formik.errors.PromptType}</AlertTitle>
            ) : null}
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
            {formik.touched.Prompt && formik.errors.Prompt ? (
              <AlertTitle>{formik.errors.Prompt}</AlertTitle>
            ) : null}
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
            {formik.touched.IntroMessageType && formik.errors.IntroMessageType ? (
              <AlertTitle>{formik.errors.IntroMessageType}</AlertTitle>
            ) : null}
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
            {formik.touched.IntroMessage && formik.errors.IntroMessage ? (
              <AlertTitle>{formik.errors.IntroMessage}</AlertTitle>
            ) : null}
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
            {formik.touched.OpenAikey && formik.errors.OpenAikey ? (
              <AlertTitle>{formik.errors.OpenAikey}</AlertTitle>
            ) : null}
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
            />
            {formik.touched.Conversation && formik.errors.Conversation ? (
              <AlertTitle>{formik.errors.Conversation}</AlertTitle>
            ) : null}
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
              {formik.touched.TimeZoneReference && formik.errors.TimeZoneReference ? (
                <AlertTitle>{formik.errors.TimeZoneReference}</AlertTitle>
              ) : null}
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
              {formik.touched.TimeZoneFormat && formik.errors.TimeZoneFormat ? (
                <AlertTitle>{formik.errors.TimeZoneFormat}</AlertTitle>
              ) : null}
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
              {formik.touched.TimeFormat && formik.errors.TimeFormat ? (
                <AlertTitle>{formik.errors.TimeFormat}</AlertTitle>
              ) : null}
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
            {formik.touched.GPTmodel && formik.errors.GPTmodel ? (
              <AlertTitle>{formik.errors.GPTmodel}</AlertTitle>
            ) : null}
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
              <select
                onChange={handleSelectChange}
                onClick={toggleIsOpen}
                value={"+ add a Goal"}
                className="rounded-lg border border-blue-600 appearance-none py-2 text-base justify-center focus:shadow-lg pl-5 pr-8 text-center font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer">
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
              <span className={`absolute top-0 h-full ml-[18%] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${isOpen ? 'transform rotate-180' : ''}`} style={{ hover :{
                  color:"white"
              }}}>
                <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold"/>
              </span>
            </div>
          </div>
        </div>
        {foreignElements}
        <div className="flex gap-2 my-6">
          <button type="btn" className="border border-blue-600 rounded-md text-blue-600 px-12 font-semibold py-2 text-md hover:bg-blue-600 hover:text-white">Cancel</button>
          <LoadingButton type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  )
}

export default CreateBot
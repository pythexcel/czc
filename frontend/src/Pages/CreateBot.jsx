import { useState } from "react";
import TagType from "../Component/TagType";
import CustomField from "../Component/CustomField";
import TriggerWebhook from "../Component/TriggerWebhook";
import { HiOutlineChevronDown } from 'react-icons/hi';
import Title from "../Component/Title";
import InputField from '../Component/TextInput';
import DropDown from "../Component/DropDown";
import ChevronDownIcon from "../Component/ChevronDownIcon";


function CreateBot() {

  const Inputs = [
    {
      name: "Prompt Type",
      options: ["Text", "Custom Field", "Custom Value"],
      Inputname: "Prompt",
    },
    {
      name: "Intro Message Type",
      options: ["Text", "Custom Field", "Custom Value"],
      Inputname: "Intro Message",
    }
  ];

  const selectData = [
    {
      name: "Time Zone Reference",
      options: ["Contact", "Location"]
    },
    {
      name: "Timezone Format",
      options: ["Abbreviated", "Hidden"]
    },
    {
      name: "Time Format",
      options: ["12H", "24H"]
    }
  ];

  const opt = [
    "+ add a Goal",
    "Tag Type",
    "Custom Field Type",
    "Trigger Webhook"
  ]

  const optGpt = [
    "Select",
    "GPT-3",
    "GPT-3.5",
    "GPT-4"
  ]

  const OptAi = [
    "Select",
    "Booking",
    "Non-Booking"
  ]

  const [selectedOption, setSelectedOption] = useState('');
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

  return (
    <div className="w-[100%] bg-white border border-gray-400 rounded-lg px-8 py-6 shadow-lg">
      <p className="text-gray-600 font-bold text-xl">Create Bot</p>
      <div className="flex gap-6 my-7">
        <div className="w-[50%]">
          <Title>AI Type</Title>
          <div className="relative">
            <DropDown>
              {OptAi.map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </DropDown>
            <ChevronDownIcon />
          </div>
        </div>
        <div className="w-[50%]">
          <Title>Bot Name</Title>
          <InputField placeholder="Bot Name" />
        </div>
      </div>
      <div className="w-full my-4">
        <Title>Bot Description</Title>
        <textarea id="message" name="message" className=" bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[100px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder="Description"></textarea>
      </div>
      {Inputs.map((input, index) => (
        <div className="flex gap-6 my-4" key={index}>
          <div className="w-[50%]">
            <Title>{input.name}</Title>
            <div className="relative">
              <DropDown>
                <option>Select</option>
                {input.options.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </DropDown>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="w-[50%]">
            <Title>{input.Inputname}</Title>
            <InputField type="text" placeholder={input.Inputname} />
          </div>
        </div>
      ))}
      <div className="flex gap-6 my-4">
        <div className="w-[50%]">
          <Title>OpenAi Key</Title>
          <InputField type="text" placeholder="OpenAi Key" />
        </div>
        <div className="w-[50%]">
          <Title>Conversation Limit</Title>
          <InputField type="number" placeholder="Bot Conversation Limit" />
        </div>
      </div>
      <div className="flex gap-6 my-4">
        <div className="w-[50%] flex gap-6">
          {selectData.map((item, i) => (
            <div className="w-1/3" key={i}>
              <Title>{item.name}</Title>
              <div className="relative">
                <DropDown>
                  <option>Select</option>
                  {item.options.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </DropDown>
                <ChevronDownIcon />
              </div>
            </div>
          ))}
        </div>
        <div className="w-[50%]">
          <Title>GPT Model</Title>
          <div className="relative">
            <DropDown>
              {optGpt.map((item, i) => (
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
          <InputField type="number" placeholder="Waiting Delay" />
        </div>
        <div className="w-[50%]">
          <div className="relative">
            <select className="border border-blue-500 rounded-lg px-8 py-2 focus:outline-none hover:bg-blue-500 hover:text-white" onChange={handleSelectChange}
              value={selectedOption} >
              {opt.map((item, i) => (
                <option key={i} className="hover:text-blue-400 bg-white text-black hover:bg-blue-300">{item}</option>
              ))}
            </select>
            <span className="absolute top-0 h-full ml-[20%] text-center text-blue-500 font-bold pointer-events-none flex items-center justify-center hover:text-white">
              <HiOutlineChevronDown className="text-blue-500 hover:text-white" />
            </span>
          </div>
        </div>
      </div>

      {addtag.map((index) => (
        <TagType onDeleteClick={handleDeleteTage} index=
        {index} key={index}/>
      ))}

      {customfield.map((index) => (
        <CustomField onDeleteClick={handleDeleteCustomeField} index={index} key={index}/>
      ))}

      {triggerWebhook.map((index) => (
        <TriggerWebhook onDeleteWebhook={handleDeleteTriggerWebhook} index={index} key={index}/>
      ))}

      <div className="flex gap-2 my-6">
        <button type="btn" className="border border-blue-600 rounded-md text-blue-600 px-12 font-semibold py-2 text-md hover:bg-blue-600 hover:text-white">Cancel</button>
        <button type="btn" className="rounded-md bg-blue-600 text-white px-14 font-semibold py-2 text-md hover:bg-green-400">Add</button>
      </div>
    </div>
  )
}

export default CreateBot
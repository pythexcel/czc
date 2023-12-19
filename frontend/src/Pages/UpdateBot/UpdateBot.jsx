import { useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import UpdateCustomField from "../../Pages/UpdateBot/UpdateCustomField";
import DropDown from "../../Component/DropDown";
import InputField from "../../Component/TextInput";
import Title from "../../Component/Title";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import TextArea from "../../Common-Component/TextArea";
import Updatebutton from "../../Common-Component/Updatebutton";
import UpdateTriggerwebhook from '../../Pages/UpdateBot/UpdateTriggerwebhook';
import { setFlag } from "../../Store/slice/flagSlice";
import { handleReset } from "../../Store/slice/TriggerWebhookSlice";
import CustomSelector from "../../Common-Component/CustomSelector";
import ChevronDownIcon from "../../Component/ChevronDownIcon";
import UpdateTagtype from "./UpdateTagtype";
import { resetCustomField } from "../../Store/slice/CustomFieldSlice";
import { resetTagState } from "../../Store/slice/TagTypeSlice";

const Intromessage = ["Text", "Custom Field", "Custom Value"];

const TzReference = ["Contact", "Location"];

const Tzformate = ["Abbreviated", "Hidden"];

const Timeformat = ["12 H", "24 H"];

const opt = ["Tag Type", "Custom Field Type", "Trigger Webhook"];

const optGpt = ["GPT-3", "GPT-3.5", "GPT-4"];

const OptAi = ["Booking", "Non Booking"];

function UpdateBot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uniqueId = queryParams.get("id");

    const [isOpen, setIsOpen] = useState(false);

    const [Botids, setBotids] = useState("")
    const [addtag, setAddTag] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [updatetriggerwebhook, setUpdatetriggerwebhook] = useState([]);

    const [customfield, setCustomfield] = useState([]);
    const [prompt, setPrompt] = useState("Custom Field Name")
    const [message, setMassage] = useState("Custom Field Name")

    const [allerror, setAllError] = useState([]);
    const [tagNameErrors, setTagNameErrors] = useState([])

    console.log(allerror,">>>>>>>>>>>>>>>>>>>>>>>>>>")

    const HandleAddTage = () => {
        const newTag = {
            tag_name: "",
            goal_description: ""
        }
        setAddTag(prev => [...prev, newTag]);
    };

    const getBotForUpdate = async (uniqueId) => {
        try {
            const resp = await axiosInstance.get(`bot/${uniqueId}/`);
            const data = resp.details;
            setBotids(data.id)
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
                messageDelay: data.message_delay,
            });
            // console.log(resp.details.goal.tag_type, "i am tag type")
            setAddTag(resp.details.goal.tag_type)

            // console.log(resp.details.goal.custom_field_type, "i am custom field")
            setCustomfield(resp.details.goal.custom_field_type)

            // console.log(resp.details.goal.trigger_webhook_field, "i am triggerwebhook data")
            setUpdatetriggerwebhook(resp.details.goal.trigger_webhook_field)
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateDeleteTage = async (id, index) => {
        if (id === undefined) {
            setAddTag((prev) => {
                const updatedTags = [...prev];
                updatedTags.splice(index, 1);
                return updatedTags;
            });
            return
        } else {
            try {
                await axiosInstance.delete(`bot/${Botids}/`, {
                    data: {
                        "tag_type_ids": id
                    }
                });
                getBotForUpdate(uniqueId);
            } catch (error) {
                console.log(error, "This isn't error");
            }
        }
    }

    const handleAddUpdateCustomField = () => {
        const newCustom = {
            field_name: "",
            field_type: "",
            field_description: "",
            allow_overwrite: false
        }
        setCustomfield(prev => [...prev, newCustom]);
    };

    const handleDeleteCustomeField = async (id, index) => {
        if (id === undefined) {
            setCustomfield((prev) => {
                const updatedTags = [...prev];
                updatedTags.splice(index, 1);
                return updatedTags;
            });
            return
        } else {
            try {
                await axiosInstance.delete(`bot/${Botids}/`, {
                    data: {
                        "custom_field_type_ids": id
                    }
                });
                getBotForUpdate(uniqueId);
            } catch (error) {
                console.log(error, "This isn't error");
            }
        }
    }

    const [index, setIndex] = useState(0);

    const handleDeleteHeader = async (id, Headerindex) => {
        if (id === undefined) {
            const newUpdatetriggerwebhook = [...updatetriggerwebhook];
            newUpdatetriggerwebhook[index].header_field.splice(Headerindex, 1);
            setUpdatetriggerwebhook(newUpdatetriggerwebhook);
            return
        } else {
            try {
                await axiosInstance.delete(`bot/${Botids}/`, {
                    data: {
                        "header_type_ids": id
                    }
                });
                getBotForUpdate(uniqueId);
            } catch (error) {
                console.log(error, "This isn't error");
            }
        }
    }

    const handleAddTriggerWebhook = () => {
        const newTrigger = {
            goal_name: "",
            header_field: [],
            triggers: "",
            webhook_description: "",
            webhook_request_method: "",
            webhook_url: ""
        }
        setUpdatetriggerwebhook(prev => [...prev, newTrigger])
    };

    const DeleteTriggerWebhook = async (id, index) => {
        if (id === undefined) {
            setUpdatetriggerwebhook((prev) => {
                const updatedTags = [...prev];
                updatedTags.splice(index, 1);
                return updatedTags;
            });
            return
        } else {
            try {
                await axiosInstance.delete(`bot/${Botids}/`, {
                    data: {
                        "trigger_webhook_type_ids": id
                    }
                });
                getBotForUpdate(uniqueId);
            } catch (error) {
                console.log(error, "This isn't error");
            }
        }
    }

    const handleSelectChange = (event) => {
        const renderComponent = event.target.value;
        if (renderComponent === "Tag Type") {
            HandleAddTage();
        } else if (renderComponent === "Custom Field Type") {
            handleAddUpdateCustomField();
        } else if (renderComponent === "Trigger Webhook") {
            handleAddTriggerWebhook();
        }
    };

    useEffect(() => {
        if (addtag) {
            setAddTag([...addtag, addtag.length]);
        }
        if (customfield) {
            setCustomfield([...customfield, customfield.length]);
        }
    }, [])


    const toggleIsOpen = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const foreignElements = (
        <div>
            {Array.isArray(addtag) &&
                addtag.map((item, index) => (
                    <UpdateTagtype
                        key={index}
                        data={item}
                        index={index}
                        addtag={addtag}
                        setAddTag={setAddTag}
                        onDeleteClick={handleUpdateDeleteTage}
                        errors={allerror}
                    />
                ))}

            {Array.isArray(customfield) &&
                customfield.map((item, index) => (
                    <UpdateCustomField
                        key={index}
                        data={item}
                        index={index}
                        error={allerror}
                        customfield={customfield}
                        setCustomfield={setCustomfield}
                        onDeleteClick={handleDeleteCustomeField}
                    />
                ))}

            {Array.isArray(updatetriggerwebhook) &&
                updatetriggerwebhook.map((item, index) => (
                    <UpdateTriggerwebhook
                        onDeleteWebhook={DeleteTriggerWebhook}
                        updatetriggerwebhook={updatetriggerwebhook}
                        setUpdatetriggerwebhook={setUpdatetriggerwebhook}
                        handleDeleteHeader={handleDeleteHeader}
                        index={index}
                        key={index}
                        error={tagNameErrors}
                        data={item}
                    />
                ))}
        </div>
    );

    const tag_type = addtag?.map((item) => ({
        id: item.id,
        tag_name: item?.tag_name,
        goal_description: item?.goal_description,
    }));

    const customfields = customfield?.map((item) => ({
        id: item.id,
        field_name: item?.field_name,
        field_type: item?.field_type,
        field_description: item?.field_description,
        allow_overwrite: item?.allow_overwrite,
    }));

    const tiggerwebhook = updatetriggerwebhook.map((item) => ({
        id: item.id,
        goal_name: item.goal_name,
        triggers: item.triggers,
        webhook_request_method: item.webhook_request_method,
        webhook_url: item.webhook_url,
        webhook_description: item.webhook_description,
        header_type: item.header_field.map((data) => ({
            id: data.id,
            headers: data.headers,
            value_of_header: data.value_of_header
        }))
    }));

    const handleSubmitForUpdate = async (values) => {
        setIsLoading(true);
        setAllError([])
        setTagNameErrors([])
        try {
             await axiosInstance.patch(`bot/${uniqueId}/`, {
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
                tag_type: tag_type,
                custom_field_type: customfields,
                trigger_webhook_type: tiggerwebhook,
            });
            dispatch(setFlag(true));
            dispatch(resetCustomField())
            dispatch(resetTagState())
            dispatch(handleReset())
            navigate("/dashboard/bots");
        } catch (error) {
            setIsLoading(false);
            if (error?.response?.data) {
                setAllError(error.response.data);
                if (error.response.data?.non_field_errors) {
                    setTagNameErrors(error.response.data?.non_field_errors)
                }
            }
            console.log(error, "i am error");
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
            handleSubmitForUpdate(values);
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

    useEffect(() => {
        if (uniqueId) {
            getBotForUpdate(uniqueId);
        }
    }, [uniqueId]);

    const handleCancel = () => {
        dispatch(resetCustomField())
        dispatch(resetTagState())
        dispatch(handleReset())
        navigate("/dashboard/bots")
      }

    return (
        <div className="w-[100%] bg-white border border-gray-400 rounded-lg px-8 py-6 shadow-lg">
            <p className="text-gray-600 font-bold text-xl">Update Bot</p>
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
                            onClick={handleCancel}
                            type="button"
                            className="border border-blue-600 rounded-md text-blue-600 px-12 font-semibold py-2 text-md hover:bg-blue-600 hover:text-white"
                        >
                            Cancel
                        </button>
                    <Updatebutton
                        isLoading={isLoading}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}

export default UpdateBot;

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiChevronDown } from 'react-icons/fi';
import InputField from '../../Component/TextInput';
import Title from "../../Component/Title";
import DropDown from "../../Component/DropDown";
import UpdateHeaders from '../../Pages/UpdateBot/UpdateHeaders';
import TextArea from "../../Common-Component/TextArea";


function TriggerWebhook({ data, onDeleteWebhook, index, updatetriggerwebhook, setUpdatetriggerwebhook, handleDeleteHeader, error }) {


    const handleAddHeaders = () => {
        const newHeaders = {
            headers: "",
            value_of_header: ""
        }
        const newUpdatetriggerwebhook = [...updatetriggerwebhook]
        newUpdatetriggerwebhook[index].header_field.push(newHeaders)
        setUpdatetriggerwebhook(newUpdatetriggerwebhook) 
    }

    const handleChangeTriggerWebhook = (event) => {
        const { value, name } = event.target;
        const newWebHookData = [...updatetriggerwebhook]
        newWebHookData[index][name] = value
        setUpdatetriggerwebhook(newWebHookData)
    }

    const opt = [
        "Once Only",
        "Multiple Times"
    ]

    const op = [
        "GET",
        "POST"
    ]

    return (
        <div className="gap-6 my-4 border border-blue-500 rounded-2xl p-4 -mx-4">
            <div className="flex justify-between my-4">
                <div className="w-[50%]">
                    <Title>Goal Name</Title>
                    <InputField
                        type="text"
                        id="goal_name"
                        name="goal_name"
                        placeholder="Name"
                        value={data.goal_name}
                        onChange={handleChangeTriggerWebhook}
                    />
                    {error.length && error[index]?.goal_name ? <span className="text-red-500">{error[index].goal_name}</span> : null}
                </div>
                <div className="w-[40%]">
                    <Title>Triggers</Title>
                    <div className="relative flex">
                        <DropDown
                            id="triggers"
                            name="triggers"
                            value={data.triggers}
                            onChange={handleChangeTriggerWebhook}
                        >
                            <option value={""} className="hidden">Select</option>
                            {opt.map((item, i) => (
                                <option key={i} value={item}>{item}</option>
                            ))}
                        </DropDown>
                        <span className="relative top-0 right-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <FiChevronDown />
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-[75%]">
                <Title>Webhook Url</Title>
                <InputField
                    type="text"
                    id="webhook_url"
                    name="webhook_url"
                    value={data.webhook_url}
                    onChange={handleChangeTriggerWebhook}
                    placeholder="https://app.zappychat/example/webhook"
                />
                {error.length && error[index]?.webhook_url ? <span className="text-red-500">{error[index].webhook_url}</span> : null}
            </div>
            <div className="w-[75%] my-4">
                <Title>Webhook Description</Title>
                <TextArea
                    type="text"
                    id="webhook_description"
                    name="webhook_description"
                    value={data.webhook_description}
                    onChange={handleChangeTriggerWebhook}
                    placeholder="Description"></TextArea>
            </div>
            <div className="my-7">
                <button type="button" onClick={handleAddHeaders} className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-2 text-center rounded-lg">Add Headers +</button>
            </div>

            {Array.isArray(data.header_field) && data.header_field.map((item, headerIndex) => (
                <UpdateHeaders
                    data={item}
                    key={headerIndex}
                    index={headerIndex}
                    webHookIndex={index}
                    header_type={error[index]?.header_type}
                    onDelete={handleDeleteHeader}
                    updatetriggerwebhook={updatetriggerwebhook}
                    setUpdatetriggerwebhook={setUpdatetriggerwebhook}

                />
            ))}

            <div className="flex gap-6 p-4 items-top items-center text-center">
                <div className="w-[20%]">
                    <Title>Value Of header</Title>
                    <div className="relative items-center">
                        <DropDown
                            id="webhook_request_method"
                            name="webhook_request_method"
                            value={data.webhook_request_method}
                            onChange={handleChangeTriggerWebhook}
                        >
                            <option value={""} className="hidden">Select</option>
                            {op.map((item, i) => (
                                <option key={i} value={item}>{item}</option>
                            ))}
                        </DropDown>
                        <span className="absolute right-7 -mt-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <FiChevronDown />
                        </span>
                    </div>
                </div>
                <div className="border border-gray-400 px-2 py-2 mt-5 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                    <RiDeleteBin6Line onClick={()=>onDeleteWebhook(data.id, index)} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white" />
                </div>
            </div>
        </div>
    )
}

export default TriggerWebhook;
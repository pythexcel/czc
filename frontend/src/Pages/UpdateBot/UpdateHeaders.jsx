import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "../../Component/Title";
import InputField from '../../Component/TextInput';
import { useEffect, useState } from "react";
// import { useState } from "react";


const UpdateHeaders = ({ data, onDelete, index, webHookIndex, updatetriggerwebhook, setUpdatetriggerwebhook, header_type }) => {
    const { headers, value_of_header } = data;

    const [name, setName] = useState("");
    const [valueOfHeader, setValueofHeader] = useState("")

    const handleUpdateHeaders = (event) => {
        const { value, name } = event.target;
        const newWebHookData = [...updatetriggerwebhook]
        let webhookToModify = newWebHookData[webHookIndex]
        webhookToModify.header_field[index][name] = value
        setUpdatetriggerwebhook(newWebHookData)
    }
    
    useEffect(() => {
        if (headers) {
            setName(headers)
        }
        if (value_of_header) {
            setValueofHeader(value_of_header)
        }
    }, [headers, value_of_header])

    return (
        <div className="flex gap-6 p-4 items-center">
            <div className="w-[32%]">
                <Title>Headers</Title>
                <InputField
                    name="headers"
                    id="headers"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleUpdateHeaders}
                />
                {header_type.length && header_type[index]?.headers ? <span className="text-red-500">{header_type[index].headers}</span> : null}   
            </div>
            <div className="w-[40%]">
                <Title>Value Of header</Title>
                <textarea
                    type="text"
                    name="value_of_header"
                    id="value_of_header"
                    value={valueOfHeader}
                    className="border border-slate-300 rounded-lg px-3 h-[40px] focus:outline-none focus:shadow-lg w-full items-center"
                    placeholder="Header..."
                    onChange={handleUpdateHeaders}
                />
            </div>
            <div onClick={() => onDelete(data.id, index)} className="border border-gray-400 px-2 py-2 mt-4 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                <RiDeleteBin6Line className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default UpdateHeaders;
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiChevronDown } from 'react-icons/fi';
import InputHeaders from "./InputHeaders";
import { useState } from "react";
import Title from "./Title";
import InputField from '../Component/TextInput';
import DropDown from "./DropDown";
import { useDispatch } from "react-redux";
import { setTriggerWebhookSlice } from '../Store/slice/TriggerWebhookSlice';


function TriggerWebhook({ onDeleteWebhook, index }) {
    const dispatch = useDispatch();
    const [headers, setHeaders] = useState([]);

    const handleGoalName = (e) => {
        dispatch(setTriggerWebhookSlice({ index, Triggergoalname: e.target.value }));
    }

    const handleSelectTriggers = (e) => {
        dispatch(setTriggerWebhookSlice({ index, TriggerselectTriggers: e.target.value }))
    }

    const handleWebhookUrl = (e) => {
        dispatch(setTriggerWebhookSlice({ index, TriggerwebhookUrl: e.target.value }))
    }

    const handleWebhookDesc = (e) => {
        dispatch(setTriggerWebhookSlice({ index, Triggerwebhookdesc: e.target.value }))
    }

    const handleValueOfHeaders = (e) => {
        dispatch(setTriggerWebhookSlice({ index, TriggervalueOfheaders: e.target.value }))
    }

    const handleDeleteWebhook = () => {
        onDeleteWebhook(index)
    }

    const handleAddHeaders = () => {
        setHeaders([...headers, headers.length + 1]);
    }

    const handleDelete = (index) => {
        setHeaders(prevHeaders => prevHeaders.filter(headerIndex => headerIndex !== index));
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
                        placeholder="Name"
                        onChange={handleGoalName}
                    />
                </div>
                <div className="w-[40%]">
                    <Title>Triggers</Title>
                    <div className="relative flex">
                        <DropDown
                            onChange={handleSelectTriggers}
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
                    placeholder="https://app.zappychat/example/webhook"
                    onChange={handleWebhookUrl}
                />
            </div>
            <div className="w-[75%] my-4">
                <Title>Webhook Description</Title>
                <textarea
                    id="message"
                    name="message"
                    onChange={handleWebhookDesc}
                    className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder="Description"></textarea>
            </div>
            <div className="my-7">
                <button type="button" onClick={handleAddHeaders} className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-2 text-center rounded-lg">Add Headers +</button>
            </div>

            {headers.map((index) => (
                <InputHeaders
                    key={index}
                    index={index}
                    onDelete={handleDelete}
                />
            ))}

            <div className="flex gap-6 p-4 items-top items-center text-center">
                <div className="w-[20%]">
                    <Title>Value Of header</Title>
                    <div className="relative items-center">
                        <DropDown onChange={handleValueOfHeaders}>
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
                    <RiDeleteBin6Line onClick={handleDeleteWebhook} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white" />
                </div>
            </div>
        </div>
    )
}

export default TriggerWebhook;
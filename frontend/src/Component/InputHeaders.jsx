import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "./Title";
import InputField from './TextInput';
import { useDispatch } from "react-redux";
import { handleHeaderChange } from "../Store/slice/TriggerWebhookSlice";
// import { useState } from "react";


const InputHeaders = ({ data, onDelete, index, webHookIndex }) => {
    const dispatch = useDispatch();

    // const [currentIndex, setCurrentIndex] = useState(i); // Set the initial index as needed

    // const dispatchAddHeader = (header) => {
    //     const addHeaderData = [
    //         { name: header.headername, header: header.valueOfHeader }
    //     ];
    //     dispatch(addHeadersSlice({ index, addHeader: addHeaderData }));
    // };

    const handleheaderChange = (event) => {
        const { name, value } = event.target
        const payload = {
            name: name,
            value: value,
            headerIndex: index,
            webHookIndex: webHookIndex
        }
        dispatch(handleHeaderChange(payload))
    };

    return (
        <div className="flex gap-6 p-4 items-center">
            <div className="w-[32%]">
                <Title>Headers</Title>
                <InputField
                    name="headerName"
                    value={data?.headerName}
                    id="headername"
                    type="text"
                    placeholder="Name"
                    onChange={handleheaderChange}
                />
            </div>
            <div className="w-[40%]">
                <Title>Value Of header</Title>
                <textarea
                    type="text"
                    name="valueOfHeader"
                    id="valueOfHeader"
                    value={data?.valueOfHeader}
                    className="border border-slate-300 rounded-lg px-3 h-[40px] focus:outline-none focus:shadow-lg w-full items-center"
                    placeholder="Header..."
                    onChange={handleheaderChange}
                />
            </div>
            <div onClick={() => onDelete(index, webHookIndex)} className="border border-gray-400 px-2 py-2 mt-4 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                <RiDeleteBin6Line className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default InputHeaders
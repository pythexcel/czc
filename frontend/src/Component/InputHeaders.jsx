import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "./Title";
import InputField from './TextInput';


function InputHeaders({ onDelete, index, handleHeaderChange, handleNameChange }) {
  
    return (
        <div className="flex gap-6 p-4 items-center">
            <div className="w-[32%]">
                <Title>Headers</Title>
                <InputField
                    name={`name${index}`}
                    type="text"
                    placeholder="Name"
                    onChange={handleNameChange}
                />
            </div>
            <div className="w-[40%]">
                <Title>Value Of header</Title>
                <textarea
                    type="text"
                    name={`valueOfheader${index}`}
                    className="border border-slate-300 rounded-lg px-3 h-[40px] focus:outline-none focus:shadow-lg w-full items-center"
                    placeholder="adbjsabxanmzxnamnzakl"
                    onChange={handleHeaderChange}
                />
            </div>
            <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center">
                <RiDeleteBin6Line onClick={() => onDelete(index)} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default InputHeaders
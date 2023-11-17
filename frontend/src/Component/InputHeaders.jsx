import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "./Title";
import InputField from './TextInput';
import { useDispatch } from "react-redux";
import { setInputHeaderSlice } from '../Store/slice/InputHeaderSlice';


const InputHeaders = ({  onDelete, index, }) => {
    const dispatch = useDispatch();

    const handleheadernameChange = (event) => {
        dispatch(setInputHeaderSlice({ index, headername: event.target.value }))
    }

    const handlevalueofheaderChange = (event) => {
        dispatch(setInputHeaderSlice({ index, valueOfHeader: event.target.value }))
    }

    return (
        <div className="flex gap-6 p-4 items-center">
            <div className="w-[32%]">
                <Title>Headers</Title>
                <InputField
                    name="headername"
                    id="headername"
                    type="text"
                    placeholder="Name"
                    onChange={handleheadernameChange}
                />
            </div>
            <div className="w-[40%]">
                <Title>Value Of header</Title>
                <textarea
                    type="text"
                    name="valueOfheader"
                    id="valueOfHeader"
                    className="border border-slate-300 rounded-lg px-3 h-[40px] focus:outline-none focus:shadow-lg w-full items-center"
                    placeholder="adbjsabxanmzxnamnzakl"
                    onChange={handlevalueofheaderChange}
                />
            </div>
            <div className="border border-gray-400 px-2 py-2 mt-4 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                <RiDeleteBin6Line onClick={() => onDelete(index)} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default InputHeaders
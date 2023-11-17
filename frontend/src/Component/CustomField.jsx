import { RiDeleteBin6Line } from "react-icons/ri";
import ToggleSwitch from "./ToggleSwitch";
import { HiOutlineChevronDown } from "react-icons/hi";
import Title from "./Title";
import InputField from './TextInput';
import DropDown from "./DropDown";
import { setCustomFieldSlice } from '../Store/slice/CustomFieldSlice';
import { useDispatch } from "react-redux";
import { useState } from "react";

function CustomField({ onDeleteClick, index }) {
    const dispatch = useDispatch();
    const [allowCustomOverWright, setAllowCustomOverWright] = useState(false);

    const handleDelete = () => {
        onDeleteClick(index)
    }

    const handleCustomFieldtagname = (e) => {
        dispatch(setCustomFieldSlice({ index, customFieldTagname: e.target.value }));
    }

    const selectedFieldType = (e) => {
        dispatch(setCustomFieldSlice({
            index, customFieldType: e.target.value
        }));
    }

    const handleCustomFieldGoalDescription = (e) => {
        dispatch(setCustomFieldSlice({ index, customFieldDescription: e.target.value }));
    }

    const handleToggleChange = () => {
        const newToggleValue = !allowCustomOverWright;
        dispatch(setCustomFieldSlice({ index, allowCustomOverWright: newToggleValue }));
        setAllowCustomOverWright(newToggleValue);
    };


    const options = [
        'Text',
        'Number',
        'Date',
        'Contact Full Name',
        'Contact Date of Birth',
        'Contact Email',
        'Contact Address',
        'Contact Timezone',
        'Phone',
        'Email'
    ];

    return (
        <div className="flex gap-6 my-4 border border-blue-500 rounded-2xl p-4 -mx-3">
            <div className="w-[15%]">
                <Title>Tag Name</Title>
                <InputField
                    type="text"
                    placeholder="Name"
                    onChange={handleCustomFieldtagname}
                />
            </div>
            <div className="w-[15%]">
                <Title>Field Type</Title>
                <div className="relative">
                    <DropDown onChange={selectedFieldType}>
                        <option default value={""} className="hidden">Select</option>
                        {options.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </DropDown>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-black pointer-events-none flex items-center justify-center"><HiOutlineChevronDown />
                    </span>
                </div>
            </div>
            <div className="w-[40%]">
                <Title>Goal Description</Title>
                <textarea
                    onChange={handleCustomFieldGoalDescription}
                    id="message"
                    name="message"
                    className=" bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg"
                    placeholder="Description" />
            </div>
            <div className="flex justify-between items-center mx-4 w-[30%]">
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                    <RiDeleteBin6Line onClick={handleDelete} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white" />
                </div>
                <div className="">
                    <ToggleSwitch AllowCustomOverWright={allowCustomOverWright} onToggleChange={handleToggleChange} />
                </div>
            </div>
        </div>
    )
}

export default CustomField;
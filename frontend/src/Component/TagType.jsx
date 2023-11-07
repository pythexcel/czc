import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "./Title";
import InputField from './TextInput';
import { setTagname } from '../Store/slice/TagTypeSlice';
import { useDispatch } from "react-redux";


function TagType({ onDeleteClick, index }) {
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        dispatch(setTagname({ type: 'name', value: e.target.value }));
    };

    const handleGoalDescription = (e) => {
        dispatch(setTagname({ type: 'textarea', value: e.target.value }));
    }

    return (
        <div className="flex gap-6 my-4 border border-blue-500 rounded-2xl p-4 -mx-4">
            <div className="w-[30%]">
                <Title>Tag Name</Title>
                <InputField
                    type="text"
                    placeholder="Name"
                    name="TagName"
                    onChange={handleInputChange}
                />
            </div>
            <div className="items-end flex">
                <div className="w-[80%]">
                    <Title>Goal Description</Title>
                    <textarea onChange={handleGoalDescription} id="message" name="message" className=" bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder="Description"></textarea>
                </div>
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center">
                    <RiDeleteBin6Line onClick={() => onDeleteClick(index)} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white" />
                </div>
            </div>
        </div>
    )
}

export default TagType;
import { RiDeleteBin6Line } from "react-icons/ri";
import Title from "./Title";
import InputField from './TextInput';
import { updateChildData } from '../Store/slice/TagTypeSlice';
import { useDispatch } from "react-redux";
import { useState } from "react";


function TagType(props) {
    const { onDeleteClick, index, data, errors } = props;
    console.log(data, "this is data :- ///////////////////////");

    const dispatch = useDispatch();

    const [tagname, setTagname] = useState(data?.tag_name || "");
    const [descritption, setDescription] = useState(data?.goal_description || "");

    const handleTagNameChange = (event) => {
        const newTagName = event.target.value;
        setTagname(newTagName);
        dispatch(updateChildData({ index, tagname: newTagName }));
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        dispatch(updateChildData({ index, description: newDescription }));
    };

    // const { tag_name, description}

    return (
        <div className="flex gap-6 my-4 border border-blue-500 rounded-2xl p-4 -mx-4">
            <div className="w-[50%]">
                <Title>Tag Name</Title>
                <InputField
                    type="text"
                    placeholder="Name"
                    id="tagname"
                    name="tagname"
                    value={tagname}
                    onChange={handleTagNameChange}
                />
                {errors.length && errors[index]?.tag_name ? <span className="text-red-500">{errors[index].tag_name}</span> : null}
            </div>
            <div className="items-end flex w-full space-x-4">
                <div className="w-[80%]">
                    <Title>Goal Description</Title>
                    <textarea
                        id="descritption"
                        name="descritption"
                        className="w-full  bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out focus:shadow-lg"
                        placeholder="descritption"
                        value={descritption}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center mb-2 cursor-pointer">
                    <RiDeleteBin6Line
                        onClick={() => onDeleteClick(index)}
                        className="w-[20px] h-[20px] text-gray-600 hover:text-white"
                    />
                </div>
            </div>
        </div>
    )
}

export default TagType;
import { RiDeleteBin6Line } from "react-icons/ri";
import Title from '../../Component/Title';
import InputField from '../../Component/TextInput';


function UpdateTagtype({ addtag, setAddTag, onDeleteClick, index, data, errors }) {

    const handleUpdateTagtype = (event) => {
        const { value, name } = event.target;
        const newWebHookData = [...addtag]
        newWebHookData[index][name] = value
        setAddTag(newWebHookData)
    }

    return (
        <div className="flex gap-6 my-4 border border-blue-500 rounded-2xl p-4 -mx-4">
            <div className="w-[50%]">
                <Title>Tag Name</Title>
                <InputField
                    type="text"
                    placeholder="Name"
                    id="tag_name"
                    name="tag_name"
                    value={data.tag_name}
                    onChange={handleUpdateTagtype}
                />
                 <span className="text-red-500">{errors?.tag_name}</span> 
            </div>
            <div className="items-end flex w-full space-x-4">
                <div className="w-[80%]">
                    <Title>Goal Description</Title>
                    <textarea
                        id="goal_description"
                        name="goal_description"
                        className="w-full  bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out focus:shadow-lg"
                        placeholder="descritption"
                        value={data.goal_description}
                        onChange={handleUpdateTagtype}
                    />
                </div>
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center mb-2 cursor-pointer">
                    <RiDeleteBin6Line
                        onClick={() => onDeleteClick(data.id, index)}
                        className="w-[20px] h-[20px] text-gray-600 hover:text-white"
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateTagtype;
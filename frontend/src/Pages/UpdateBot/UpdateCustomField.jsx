import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineChevronDown } from "react-icons/hi";
import InputField from "../../Component/TextInput";
import Title from "../../Component/Title";
import DropDown from "../../Component/DropDown";
import TextArea from "../../Common-Component/TextArea";

function CustomField({ onDeleteClick, index, data, customfield, setCustomfield, error }) {

    const handleCustomFieldData = (event) => {
        const { checked, value, name } = event.target;
        const newWebHookData = [...customfield]
        if (name === 'allow_overwrite') {
            newWebHookData[index][name] = checked
        }
        else {
            newWebHookData[index][name] = value
        }
        setCustomfield(newWebHookData)
    }
    
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
                <Title>Field Name</Title>
                <InputField
                    type="text"
                    id="field_name"
                    name="field_name"
                    placeholder="Name"
                    value={data.field_name}
                    onChange={handleCustomFieldData}
                />
                <span className="text-red-500">{error?.field_name[index]}</span> 
            </div>
            <div className="w-[15%]">
                <Title>Field Type</Title>
                <div className="relative">
                    <DropDown
                        id="field_type"
                        name="field_type"
                        value={data.field_type}
                        onChange={handleCustomFieldData}
                    >
                        <option default value={""} className="hidden">Select</option>
                        {options.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </DropDown>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-black pointer-events-none flex items-center justify-center"><HiOutlineChevronDown />
                    </span>
                    {error.length && error[index]?.field_type ? <span className="text-red-500">{error[index].field_name}</span> : null}
                </div>
            </div>
            <div className="w-[40%]">
                <Title>Goal Description</Title>
                <TextArea
                    id="field_description"
                    name="field_description"
                    value={data.field_description}
                    onChange={handleCustomFieldData}
                    placeholder="Description" />
            </div>
            <div className="flex justify-between items-center mx-4 w-[30%]">
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center cursor-pointer">
                    <RiDeleteBin6Line onClick={() => onDeleteClick(data.id, index)} className="w-[20px] h-[20px] text-gray-600 my-auto hover:text-white" />
                </div>
                <div className="">
                    <div className="flex w-[200px] items-center gap-2">
                        <label className="text-gray-600 text-sm font-bold">Allow Overwrite</label>
                        <input
                            type="checkbox"
                            id="allow_overwrite"
                            name="allow_overwrite"
                            value={data?.allow_overwrite}
                            checked={data?.allow_overwrite}
                            onClick={handleCustomFieldData}
                            className="relative w-[2.70rem] h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:shadow-lg ring-offset-white focus:outline-none appearance-none dark:bg-gray-200 dark:checked:bg-blue-600 focus:ring-offset-white before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:white dark:checked:before:bg-blue-200" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomField;
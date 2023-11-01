import { RiDeleteBin6Line } from "react-icons/ri";
import ToggleSwitch from "./ToggleSwitch";
import { HiOutlineChevronDown } from "react-icons/hi";

function CustomField({onDeleteClick, index}) {

    const handleDelete = () => {
        onDeleteClick(index)
    }

    const options = [
        'Select',
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
                <p className="text-left text-xs text-slate-800 font-bold pb-2">Tag Name</p>
                <input type="text" className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:shadow-lg w-full" placeholder="Name" />
            </div>
            <div className="w-[15%]">
                <p className="text-left text-xs text-slate-800 font-bold pb-2">Field Type</p>
                <div className="relative">
                    <select className="rounded-lg border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 focus:shadow-lg w-full">
                        {options.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-black pointer-events-none flex items-center justify-center"><HiOutlineChevronDown />
                    </span>
                </div>
            </div>
            <div className="w-[40%]">
                <p className="text-left text-xs text-slate-800 font-bold pb-2">Goal Description</p>
                <textarea id="message" name="message" className=" bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[60px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder="Description"></textarea>
            </div>
            <div className="flex justify-between items-center mx-4 w-[30%]">
                <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center">
                    <RiDeleteBin6Line onClick={handleDelete} className="w-[25px] h-[25px] text-gray-600 my-auto hover:text-white"/>
                </div>
                <div className="">
                    <ToggleSwitch />
                </div>
            </div>
        </div>
    )
}

export default CustomField;
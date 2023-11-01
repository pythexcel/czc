import { RiDeleteBin6Line } from "react-icons/ri"


function InputHeaders({ onDelete, index }) {

    const handleDelete = () => {
        onDelete(index);
    }

    return (
        <div className="flex gap-6 p-4 items-center">
            <div className="w-[32%]">
                <p className="text-left text-xs text-slate-800 font-bold pb-2">Headers</p>
                <input type="text" className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:shadow-lg w-full" placeholder="Name" />
            </div>
            <div className="w-[40%]">
                <p className="text-left text-xs text-slate-800 font-bold pb-2">Value Of header</p>
                <textarea type="text" className="border border-slate-300 rounded-lg px-3 h-[40px] focus:outline-none focus:shadow-lg w-full items-center" placeholder="adbjsabxanmzxnamnzakl" />
            </div>
            <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[40px] float-bottom items-center">
                <RiDeleteBin6Line onClick={handleDelete} className="w-[25px] h-[25px] text-gray-600 my-auto hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default InputHeaders
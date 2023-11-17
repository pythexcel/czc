import { RiDeleteBin6Line } from "react-icons/ri"


function DeleteBox({handleDeleteWebhook}) {
    return (
        <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[30px] w-[30px] float-bottom items-center cursor-pointer">
            <RiDeleteBin6Line onClick={handleDeleteWebhook} className="w-[15px] h-[15px] text-gray-600 my-auto hover:text-white" />
        </div>
    )
}

export default DeleteBox
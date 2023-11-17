import {FaPencilAlt} from 'react-icons/fa';

function EditBox(){
    return (
        <div className="border border-gray-400 px-2 py-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg h-[30px] w-[30px] float-bottom items-center cursor-pointer">
        <FaPencilAlt className="w-[15px] h-[15px] text-gray-600 my-auto hover:text-white" />
    </div>
    )
}

export default EditBox
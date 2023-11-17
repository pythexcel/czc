import { RxCross2 } from "react-icons/rx";
import ToastContainer from "../Common-Component/ToastContainer";


function ToastFailed({onClose, title, message}) {
    return (
        <ToastContainer>
            <div className="bg-gradient-to-r from-[#933823] to-[#932831] rounded-lg w-[350px] p-4">
                <div className='flex justify-between mb-4 px-2'>
                    <p className='text-white text-md font-bold'>{title}</p>
                    <RxCross2 onClick={onClose} className='text-white text-md font-bold cursor-pointer' />
                </div>
                <hr className='border-slate-400 w-[150px] mx-auto' />
                <div className='mt-4'>
                    <p className='text-white text-md font-semibold'>{message}</p>
                </div>
            </div>
        </ToastContainer>
    )
}

export default ToastFailed
import { RxCross2 } from "react-icons/rx";


function ToastFailed({onClose}) {
    return (
        <div className="justify-end float-right">
            <div className="bg-gradient-to-r from-[#933823] to-[#932831] rounded-lg w-[350px] p-4">
                <div className='flex justify-between mb-4 px-2'>
                    <p className='text-white text-md font-bold'>Error</p>
                    <RxCross2 onClick={onClose} className='text-white text-md font-bold cursor-pointer' />
                </div>
                <hr className='border-slate-400 w-[150px] mx-auto' />
                <div className='mt-4'>
                    <p className='text-white text-md font-semibold'>An error occured</p>
                </div>
            </div>
        </div>
    )
}

export default ToastFailed
import { RxCross2 } from 'react-icons/rx';


function ToastSuccess({onClose}) {


  return (
    <div className="justify-end float-right">
      <div className="bg-gradient-to-r from-[#2DCEC7] to-[#2DCE9C] rounded-lg w-[350px] p-4">
        <div className='flex justify-between mb-4 px-2'>
          <p className='text-white text-md font-bold'>Success</p>
          <RxCross2 onClick={onClose} className='text-white text-md font-bold cursor-pointer' />
        </div>
        <hr className='border-slate-400 w-[150px] mx-auto'/>
        <div className='mt-4'>
          <p className='text-white text-md font-semibold'>Selected agency updated successfully!</p>
        </div>
      </div>
    </div>
  )
}

export default ToastSuccess;
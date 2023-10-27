import { FaCopy, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineBars } from 'react-icons/ai';

function BookingCard() {
    return (
        <div className="w-[32%] h-[200px] border-2 border-gray-300 rounded-lg bg-white shadow-md flex flex-col justify-between">
            <div className="p-4">
                <p className='text-xl font-medium text-blue-500 flex flex-start'>user_test</p>
                <p className='text-[17px] text-slate-500 font-normal text-left'>https://chat.botwebhook.com/message?b=8681698042045389</p>
            </div>
            <div className="py-3">
                <hr />
                <div className="font-medium text-end flex justify-between items-center gap-2 px-5 mt-3">
                    <button className="text-green-600 hover:bg-green-200 hover:border-green-700 border border-gray-300 py-2 px-4 rounded-md text-sm shadow-lg">BOOKING</button>
                    <div className="gap-2 flex flex-row">
                        <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><FaCopy/></div>
                        <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><FaPencilAlt /></div>
                        <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><RiDeleteBin6Line /></div>
                        <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><AiOutlineBars/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
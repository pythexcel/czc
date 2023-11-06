import { HiSearch } from "react-icons/hi";
import Card from '../Component/BotCard';
import BookingCard from "../Component/BookingCard";
import { FaCopy, FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBars } from "react-icons/ai";


function Bots() {
    return (
        <div className="text-center font-bold text-red-500 px-5">
            <section className="text-gray-600 body-font">
                <form className='w-[30%] mt-4'>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 shadow-md pointer-events-none bg-blue-600 rounded-l-md">
                            <HiSearch className='text-white w-[20px] h-[20px]' />
                        </div>
                        <input type="search" className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-semibold shadow-md" placeholder='Type and Press Enter' required />
                    </div>
                </form>

                <div className="py-2 my-4 mx-auto flex flex-wrap gap-6">
                    <Card />
                    <BookingCard />
                    <BookingCard />
                    <div className="w-[32%] h-[200px] border-2 border-gray-300 rounded-lg bg-white shadow-md flex flex-col justify-between">
                        <div className="p-4">
                            <p className='text-xl font-medium text-blue-500 flex flex-start'>Main Appointment Setter - Non-Booking</p>
                            <p className='text-[17px] text-slate-500 font-normal text-left'>https://chat.botwebhook.com/message?b=8681698042045389</p>
                        </div>
                        <div className="py-3">
                            <hr />
                            <div className="font-medium text-end flex justify-between items-center gap-2 px-5 mt-3">
                                <button className="text-red-600 hover:bg-red-200 hover:border-red-700 border border-red-300 py-2 px-4 rounded-md text-sm shadow-lg">NON-BOOKING</button>
                                <div className="gap-2 flex flex-row">
                                    <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><FaCopy /></div>
                                    <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><FaPencilAlt /></div>
                                    <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><RiDeleteBin6Line /></div>
                                    <div className="border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg"><AiOutlineBars /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bots
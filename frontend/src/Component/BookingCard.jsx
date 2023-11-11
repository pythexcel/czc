import { FaCopy, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineBars } from 'react-icons/ai';
import Card from '../Common-Component/Box';

function BookingCard({ handleCopy, handleEdit, HandleDelete, HandleDetails }) {

    return (
        <Card>
            <div className="p-4">
                <p className='text-xl font-medium text-blue-500 text-left break-words cursor-pointer'>user_test</p>
                <p className='text-[17px] text-slate-500 font-normal text-left break-words cursor-pointer'>https://chat.botwebhook.com/message?b=8681698042045389</p>
            </div>
            <div className="py-3">
                <hr />
                <div className="font-medium text-end flex justify-between items-center gap-2 px-5 mt-3">
                    <button className="text-green-600 hover:bg-green-200 hover:border-green-700 border border-gray-300 py-2 px-4 rounded-md text-sm shadow-lg">BOOKING</button>
                    <div className="gap-2 flex flex-row">
                        <div onClick={handleCopy} className="copyicon border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg cursor-pointer"><FaCopy />
                            <span className="copyicontext">CLONE</span>
                        </div>

                        <div onClick={handleEdit} className="edit border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg cursor-pointer"><FaPencilAlt />
                        <span className="edittext">EDIT</span>
                        </div>

                        <div onClick={HandleDelete} className="delete border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg cursor-pointer"><RiDeleteBin6Line />
                        <span className="deletetext">DELETE</span>
                        </div>

                        <div onClick={HandleDetails} className="details border border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white shadow-lg cursor-pointer"><AiOutlineBars />
                        <span className="detailstext flex">BOT DETAIL</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BookingCard;
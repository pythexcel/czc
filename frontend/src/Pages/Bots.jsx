import { HiSearch } from "react-icons/hi";
import BotCard from '../Component/BotCard';
import BookingCard from "../Component/BookingCard";
import { FaCopy, FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from "react";
import DetailsModal from "../Modal/DetailsModal";
import CloneBot from "../Modal/CloneBot";
import IsDelete from "../Modal/IsDelete";
import NonBookingCard from "../Component/NonBookingCard";


function Bots() {
    const [openModal, setOpenModal] = useState(false);
    const [Clone, setClone] = useState(false);
    const [deleteBot, setDeleteBot] = useState(false);

    const handcloseModal = () => {
        setOpenModal(false) 
    }

    const handleCopy = () => {
        setClone(true)
    }

    const handleCloseCloneBot = () => {
        setClone(false)
    }

    const handleEdit = () => {

    }

    const handleDelete = () => {
        setDeleteBot(false)
    }
 
    const HandleDelete = () => {
        setDeleteBot(true)
    }

    const HandleDetails = () => {
        setOpenModal(true)  
    }
                  

    const renderModals = <div>
        {openModal && <DetailsModal onClose={handcloseModal} />}
        {Clone && <CloneBot onClose={handleCloseCloneBot} />}
        { deleteBot && <IsDelete onClose={handleDelete} />} 
    </div>

    return (
        <div>
        {renderModals}
        <div className="text-center font-bold text-red-500">
            <section className="text-gray-600 body-font">
                <form className='w-[90%] sm:w-[30%] mt-4'>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 focus:shadow-md pointer-events-none bg-blue-600 rounded-l-md">
                            <HiSearch className='text-white w-[20px] h-[20px]' />
                        </div>
                        <input type="search" className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-semibold focus:shadow-md" placeholder='Type and Press Enter' required />
                    </div>
                </form>

                <div className="my-4 flex flex-wrap gap-4">
                    <BotCard/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <NonBookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <NonBookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <BookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                    <NonBookingCard {...{handleCopy,handleEdit,HandleDelete,HandleDetails }}/>
                </div>
            </section>
        </div>
        </div>
    )
}

export default Bots
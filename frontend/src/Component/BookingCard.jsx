import { FaCopy, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineBars } from 'react-icons/ai';
import Card from '../Common-Component/Box';
import BookingBtn from '../Common-Component/BookingBtn';
import Para from '../Common-Component/Para';
import Botname from '../Common-Component/Botname';
import Bars from '../Common-Component/Bars';
import NonBookingbtn from '../Common-Component/Nonbookingbtn';

function BookingCard({
    handleCopy,
    handleEdit,
    handleDelete,
    handleDetails,
    userData
}) {

    const { id, bot_name, ai_type } = userData;

    return (
        <Card>
            <div className="p-4">
                <Botname>{bot_name}</Botname>
                <Para>https://chat.botwebhook.com/message?b=8681698042045389</Para>
            </div>
            <div className="py-3">
                <hr />
                <div className="font-medium text-end flex justify-between items-center gap-2 px-5 mt-3">
                    { ai_type === "Non-Booking"
                        ?
                        <NonBookingbtn>{ai_type.toUpperCase()}</NonBookingbtn>
                        :
                        <BookingBtn>{ai_type.toUpperCase()}</BookingBtn>
                    }

                    <div className="gap-2 flex flex-row">
                        <Bars
                            handleClick={()=>handleCopy(id)}
                            icon={<FaCopy />}
                            text="CLONE"
                            textClassName="copyicontext"
                            containerClassName="copyicon"
                        />

                        <Bars
                            handleClick={()=>handleEdit(id)}
                            icon={<FaPencilAlt />}
                            text="EDIT"
                            textClassName="edittext"
                            containerClassName="edit"
                        />

                        <Bars
                            handleClick={() => handleDelete(id)}
                            icon={<RiDeleteBin6Line />}
                            text="DELETE"
                            textClassName="deletetext"
                            containerClassName="delete"
                        />

                        <Bars
                            handleClick={() => handleDetails(id)}
                            icon={<AiOutlineBars />}
                            text="BOT DETAIL"
                            textClassName="detailstext flex"
                            containerClassName="details"
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BookingCard;
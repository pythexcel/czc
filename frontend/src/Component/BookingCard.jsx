import { FaCopy, FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBars } from "react-icons/ai";
import Card from "../Common-Component/Box";
import BookingBtn from "../Common-Component/BookingBtn";
import Botname from "../Common-Component/Botname";
import Bars from "../Common-Component/Bars";
import NonBookingbtn from "../Common-Component/Nonbookingbtn";
import { useState } from "react";
import CopyLink from "../Modal/CopyLink";

function BookingCard({
  handleCopy,
  handleEdit,
  handleDelete,
  handleDetails,
  userData,
}) {


  const [showCopyButton, setShowCopyButton] = useState(false);
  const [isshowmodal, setIsShowModal] = useState(false);

  const onClose = () => {
    setIsShowModal(false);
  };

  const handleParaClick = (id) => {
    const paraText = `https://chat.botwebhook.com/message?b=${id}`;
    setIsShowModal(true);
    navigator.clipboard
      .writeText(paraText)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text to clipboard: ", err);
      });
  };

  const { id, bot_name, ai_type } = userData;

  return (
    <Card>
      <div className="p-4">
        <Botname>{bot_name}</Botname>
        <p
          className="cursor-pointer font-thin  "
          onMouseEnter={() => setShowCopyButton(true)}
          onMouseLeave={() => setShowCopyButton(false)}
        >
          https://chat.botwebhook.com/message?b={id}
          {showCopyButton && (
            <button
              className=" top-0 right-[80%] ml-[40%] bg-blue-600 text-white px-2 py-1 border border-green-600 rounded"
              onClick={()=>handleParaClick(id)}
            >
              Copy
            </button>
          )}
        </p>
      </div>
      <div className="py-3">
        <hr />
        <div className="font-medium text-end flex justify-between items-center gap-2 px-5 mt-3">
          {ai_type === "Non Booking" ? (
            <NonBookingbtn>{ai_type.toUpperCase()}</NonBookingbtn>
          ) : (
            <BookingBtn>{ai_type.toUpperCase()}</BookingBtn>
          )}

          <div className="gap-2 flex flex-row">
            <Bars
              handleClick={() => handleCopy(id)}
              icon={<FaCopy />}
              text="CLONE"
              textClassName="copyicontext"
              containerClassName="copyicon"
            />

            <Bars
              handleClick={() => handleEdit(id)}
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
      {isshowmodal && <CopyLink onClose={onClose} />}
    </Card>
  );
}

export default BookingCard;

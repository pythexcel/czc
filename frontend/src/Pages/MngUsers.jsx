import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import InputModal from "../Modal/InputModal";

const MngUsers = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="font-bold  text-[#344767] text-2xl">Agency Users</h6>
          <button onClick={handleOpenModal} className="bg-[#0F45F5] flex py-2 px-4 rounded-lg gap-2">
            <i className="text-slate-50 text-xl">
              <AiOutlinePlus />
            </i>
            <p className="mt-[-2%] text-md text-slate-50 font-semibold">
              Add New Users
            </p>
          </button>
        </div>
        <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17 rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-[#F3F5FE] ">
                <th className="py-2 font-normal text-[#8392AB]">USER REFERNCE</th>
                <th className="py-2 font-normal text-[#8392AB]">
                  EMAIL REFERNCE
                </th>
                <th className="py-2 font-normal text-[#8392AB]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2  text-[#8392AB] bg-slate-50 text-lg text-center" colSpan="3">
                  No User found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openModal && <InputModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MngUsers;
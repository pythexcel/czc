import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../Modal/Modal";

const MngUsers = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="font-bold  text-[#344767] text-3xl">Agency Users</h6>
          <button onClick={handleOpenModal} className="bg-[#0F45F5] flex py-4 px-4 rounded-lg gap-2">
            <i className="text-slate-50 text-xl">
              <AiOutlinePlus />
            </i>
            <p className="mt-[-2%] text-xl text-slate-50 font-semibold">
              Add New Users
            </p>
          </button>
        </div>
        <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 ">
                <th className="py-4 text-xl text-[#8392AB]">USER REFERNCE</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  EMAIL REFERNCE
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 text-2xl text-center" colSpan="3">
                  No User found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openModal && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default MngUsers;
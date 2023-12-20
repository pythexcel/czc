import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import InputModal from "../Modal/InputModal";
import axiosInstance from "../utils/axios";
import DeleteBox from "../Common-Component/DeleteBox";
import EditBox from "../Common-Component/EditBox";
import { getCreUser } from "../Store/slice/CreUserFlagSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCreUserFlag } from "../Store/slice/CreUserFlagSlice";

const MngUsers = () => {
  const referesh = useSelector(getCreUser);

  const [openModal, setOpenModal] = useState(false);
  const [userdata, setUserData] = useState([]);
  const [isuserdelete, setIsUserDelete] = useState(false);
  const [isedituser, setIsEditUser] = useState(false);
  const [editData, setEditData]= useState({})
  const dispatch = useDispatch();

  const getAllDetails = async () => {
    try {
      dispatch(setCreUserFlag(false));
      const res = await axiosInstance.get("users/manage-user/");
      setUserData(res.details);
    } catch (error) {
      console.log(error, "i am error");
    }
  };

  const deleteUser = async ({ id }) => {
    try {
      const res = await axiosInstance.delete(`users/manage-user/${id}`);
      getAllDetails();
      console.log("User deleted successfully", res);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };


  useEffect(() => {
    getAllDetails();
  }, []);

  if (referesh === true) {
    getAllDetails();
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditData({})
    setOpenModal(false);
    setIsUserDelete(false);
    setIsEditUser(false);
  };

  // const removeHyphens = (inputString) => {
  //   return inputString.replace(/-/g, "");
  // };

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="font-bold  text-[#344767] text-2xl">Agency Users</h6>
          <button
            onClick={handleOpenModal}
            className="bg-[#0F45F5] flex py-2 px-4 rounded-lg gap-2"
          >
            <i className="text-slate-50 text-xl">
              <AiOutlinePlus />
            </i>
            <p className="mt-[-2%] text-md text-slate-50 font-semibold">
              Add New Users
            </p>
          </button>
        </div>
        <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17 rounded-lg">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-semibold text-[#A4B0C6] text-sm bg-gray-100 rounded-tl rounded-bl">
                  USER REFERNCE
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-semibold text-[#A4B0C6] text-sm bg-gray-100">
                  EMAIL REFERNCE
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-semibold text-[#A4B0C6] text-sm bg-gray-100">
                  ASSIGNED LOCATION
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-semibold text-[#A4B0C6] text-sm bg-gray-100">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className=" text-center">Location</td>
                  <td className="px-4 py-2 text-lg text-gray-900 flex space-x-2">
                    <i onClick={() => {
                      setEditData(item)
                      setIsEditUser(true)
                    }}>
                      <EditBox />
                    </i>
                    <i onClick={() => deleteUser(item)}>
                      <DeleteBox />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(openModal || isedituser) && <InputModal onClose={handleCloseModal} isedituser={isedituser} editData={editData} />}
      {/* {isuserdelete && <Deleted onClose={handleCloseModal} />} */}
    </div>
  );
};

export default MngUsers;

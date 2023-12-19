import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";
import axiosInstance from "../utils/axios";
import { useState } from "react";

function ScrapURL({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manageuser = async () => {
    try {
      const resp = await axiosInstance.post("users/create-user", {
        email: email,
        password: password,
      });
      onClose();
      console.log(resp, "i ama done boss");
    } catch (error) {
      console.log(error, "i am error");
    }
  };

  const handleEmail = (event) => {
    const useremail = event.target.value;
    setEmail(useremail);
  };

  const handlepassword = (event) => {
    const UserPasssword = event.target.value;
    setPassword(UserPasssword);
  };

  return (
    <ModalShadow onClose={onClose}>
      <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto  w-[400px] z-50">
        <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl ">
          <h3 className="text-xl font-bold text-white">Scrape URL</h3>
          <button
            type="button"
            className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center "
            data-modal-hide="static-modal"
          >
            <RxCross2 onClick={onClose} />
          </button>
        </div>
        <div className="p-6 space-y-6 bg-white">
          <div>
            <ModalPara>Parent Url</ModalPara>
            <input
              type="text"
              onChange={handleEmail}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="https://www.example.com"
            />
          </div>
          <div>
            <ModalPara>Type</ModalPara>
            <select
              onChange={handlepassword}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="" disabled selected className="hidden">
                Select Type
              </option>
              <option value="option1">Add</option>
              <option value="option2">Replace</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="flex justify-end p-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
          <CustomButton type="button" onClick={onClose} text="Close">
            Close
          </CustomButton>
          <button
            onClick={manageuser}
            type="button"
            className="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 text-white bg-[#0445F5]"
          >
            Submit
          </button>
        </div>
      </div>
    </ModalShadow>
  );
}

export default ScrapURL;

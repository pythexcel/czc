import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import InputField from '../Component/TextInput';
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";
import axiosInstance from "../utils/axios";
import { useState } from "react";

function UpdateModal({ onClose }) {
    const [openAIKey, setOpenAIKey] = useState("")

    const handleCreateOpenAI = async () => {
        onClose()
        try {
            const resp = await axiosInstance.post("users/manage-open-ai/", {
                open_ai_key: openAIKey
            })
            console.log(resp, "openAI");
            onClose();
        } catch (error) {
            console.log(error, "")
        }
    }

    return (
        <ModalShadow onClose={onClose}>
            <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto w-[500px] z-50">
                <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl ">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Update OpenAI
                    </h3>
                    <button type="button" className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center cursor-pointer" data-modal-hide="static-modal" onClick={onClose}>
                        <RxCross2 />
                    </button>
                </div>
                <div className="pt-6 px-8 pb-4 space-y-6 bg-white">
                    <div>
                        <ModalPara>OpenAI API Key</ModalPara>
                        <InputField type='text' onChange={(e) => setOpenAIKey(e.target.value)} placeholder='sk-l*********************************************Ms' />
                    </div>
                </div>
                <div className="flex justify-start px-6 pb-12 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                    <CustomButton type="button" text="Close" onClick={onClose}>Close</CustomButton>
                    <button
                        type="button"
                        onClick={handleCreateOpenAI}
                        className="focus:outline-none rounded-lg text-sm font-medium px-10 py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002] cursor-pointer">Update</button>
                </div>
            </div>
        </ModalShadow>
    )
}

export default UpdateModal
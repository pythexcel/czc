import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import InputField from '../Component/TextInput';
import CustomButton from "../Common-Component/CustomButton";

function UpdateModal({ onClose }) {
    return (
        <div>
            <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-2xl max-h-full m-auto">
                    <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[5%] w-[500px] z-50">
                        <div className="flex items-start bg-blue-600 justify-between p-4 rounded-t-xl ">
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
                                <InputField type='text' placeholder='sk-l*********************************************Ms' />
                            </div>
                        </div>
                        <div className="flex justify-start px-6 pb-12 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                            <CustomButton type="button" text="Close" onClick={onClose}>Close</CustomButton>
                            <button type="button" className="focus:outline-none rounded-lg text-sm font-medium px-10 py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002] cursor-pointer">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal
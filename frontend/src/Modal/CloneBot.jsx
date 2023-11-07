import { RxCross2 } from "react-icons/rx"
import ModalPara from "../Component/ModalPara"
import CustomButton from "../Common-Component/CustomButton"
import InputField from '../Component/TextInput';


function CloneBot({ onClose }) {
    return (
        <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative w-full max-w-2xl max-h-full m-auto">
                <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[5%] w-[500px] z-50">
                    <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-3">
                            Clone Bot
                        </h3>
                        <button type="button" className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="static-modal" onClick={onClose}>
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="p-6 space-y-6 bg-white">
                        <div>
                            <ModalPara>New Bot Name</ModalPara>
                            <InputField type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="flex justify-start px-6 pb-9 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                        <CustomButton onClick={onClose} type="button" text="Close" >Close</CustomButton>
                        <button
                            type="button"
                            className="focus:outline-none rounded-lg text-sm font-medium w-[150px] py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002]"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CloneBot
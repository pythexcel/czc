import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import CustomButton from "../Common-Component/CustomButton";
import InputField from '../Component/TextInput';
import ModalShadow from "../Common-Component/ModalShadow";
import AddButton from "../Common-Component/AddButton";
import { useState } from "react";


function CloneBot({ onClose, handleSuccess, onInputChange, isLoading }) {

    const [cloneBotName, setCloneBotName] = useState('');

    const handleCloneBotname = (event) => {
        setCloneBotName(event.target.value);
        onInputChange(event.target.value);
    };

    return (
        <ModalShadow onClose={onClose}>
            <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto w-[500px] z-50">
                <div className="flex items-center bg-[#0F45F5] justify-between p-4 rounded-t-xl">
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
                        <InputField type="text" placeholder="" onChange={handleCloneBotname} />
                    </div>
                </div>
                <div className="flex justify-start px-6 pb-9 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                    <CustomButton onClick={onClose} type="button" text="Close" >Close</CustomButton>
                    <AddButton handleSuccess={handleSuccess} isLoading={isLoading} />
                </div>
            </div>
        </ModalShadow>
    )
}

export default CloneBot
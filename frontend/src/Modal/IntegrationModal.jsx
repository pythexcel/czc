import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import DropDown from "../Component/DropDown";
import ChevronDownIcon from "../Component/ChevronDownIcon";
import InputField from '../Component/TextInput';
import Spinner from "../Component/Spinner";
import { useState } from "react";
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";


function IntegrationModal({ onClose }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [hide, setHide] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const option = [
        "Agency",
        "Location"
    ]

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
        if (selectedOption === 'Location') {
            setHide(false)
        } else if (selectedOption === 'Agency') {
            setHide(true)
        }
    }

    const handleUpdate = () => {
        
    }

    return (
        <ModalShadow onClose={onClose}>
            <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[20%] w-[500px] z-50">
                <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Update Highlevel
                    </h3>
                    <button type="button" className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="static-modal" onClick={onClose}>
                        <RxCross2 />
                    </button>
                </div>
                <div className="p-6 space-y-6 bg-white">
                    <div>
                        <ModalPara>Account Type</ModalPara>
                        <div className="relative shadow-lg">
                            <DropDown value={selectedValue} onChange={handleSelectChange}>
                                {option.map((item, i) => (
                                    <option key={i}>{item}</option>
                                ))}
                            </DropDown>
                            <ChevronDownIcon />
                        </div>
                    </div>
                    {hide && <><div>
                        <ModalPara>Agency Name</ModalPara>
                        <InputField type="text" placeholder="CoachGrowth" />
                    </div>
                        <div>
                            <ModalPara>Agency Domain</ModalPara>
                            <InputField type="text" placeholder="app.coachgrowth.io" />
                        </div>
                        <div>
                            <ModalPara>HighLevel Agency API Key</ModalPara>
                            <InputField type="text" placeholder="eyJh********************eY" />
                        </div>
                    </>
                    }
                </div>
                <hr />
                <div className="flex justify-start p-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                    <CustomButton onClick={onClose} type="button" text="Close" >Close</CustomButton>
                    <button
                        onClick={handleUpdate}
                        type="button"
                        className="focus:outline-none rounded-lg text-sm font-medium px-10 py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002]"
                    >
                        {isLoading ? <p className="text-white flex font-bold">Updating in.. <Spinner className="border-white" /></p> : <span>Update</span>}
                    </button>
                </div>
            </div>
        </ModalShadow>
    )
}

export default IntegrationModal
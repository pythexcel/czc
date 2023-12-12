import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import InputField from '../Component/TextInput';
import Spinner from "../Component/Spinner";
import { useState } from "react";
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";
import axiosInstance from "../utils/axios";
import { useDispatch } from "react-redux";
import { setConnect } from "../Store/slice/ConnectedFlagSlice";


function IntegrationModal({ onClose, handlesuccess, highlevel }) {

    const dispatch = useDispatch();
    const [name, setName] = useState(highlevel.agency_name || "");
    const [domain, setDomain] = useState(highlevel.domain || "");
    const [api, setApi] = useState(highlevel.agency_api_key || "");

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        setIsLoading(true)
        try {
            const resp = await axiosInstance.post("users/agency-integration/", {
                agency_name: name,
                domain: domain,
                agency_api_key: api
            })
            dispatch(setConnect(true));
            handlesuccess();
            onClose();
        } catch (error) {
            onClose();
            console.log(error, "this is error")
        }
    }

    return (
        <ModalShadow onClose={onClose}>
            <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto w-[500px] z-50">
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
                        <ModalPara>Agency Name</ModalPara>
                        <InputField value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Agency Name" />
                    </div>
                    <div>
                        <ModalPara>Agency Domain</ModalPara>
                        <InputField value={domain} onChange={(event) => setDomain(event.target.value)} type="text" placeholder="Agency Domain" />
                    </div>
                    <div>
                        <ModalPara>HighLevel Agency API Key</ModalPara>
                        <InputField value={api} onChange={(event) => setApi(event.target.value)} type="text" placeholder="eyJh********************eY" />
                    </div>
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
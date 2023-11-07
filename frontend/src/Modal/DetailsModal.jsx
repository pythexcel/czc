import { RxCross2 } from "react-icons/rx"
import CustomButton from "../Common-Component/CustomButton"
import Label from "../Common-Component/Label"
import NormalText from "../Common-Component/NormalText"

function DetailsModal({ onClose }) {
    return (
        <div>
            <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-2xl max-h-full m-auto">
                    <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[5%] w-[500px] z-50">
                        <div className="flex items-start bg-[#0f45f5] justify-between p-4 rounded-t-xl ">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Bot
                            </h3>
                            <button type="button" className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="static-modal">
                                <RxCross2 onClick={onClose} />
                            </button>
                        </div>
                        <div className="px-8 py-4 space-y-3 bg-white">
                            <div>
                                <Label>Bot Name</Label>
                                <NormalText>reset</NormalText>
                            </div>
                            <div>
                                <Label>Bot Description</Label>
                                <NormalText>It just for testing purpose as well</NormalText>
                            </div>
                            <div>
                                <Label>Bot Webhook</Label>
                                <NormalText>https://chat.botwebhook.com/message?b=4651699011051154</NormalText>
                            </div>
                            <div>
                                <Label>OpenAi Key</Label>
                                <NormalText>sk-b*********************************************K8</NormalText>
                            </div>
                            <div className="flex gap-x-20">
                                <div className="">

                                </div>
                                <div className="">

                                </div>
                            </div>                        
                        </div>
                        <div className="flex justify-start px-6 pb-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                            <CustomButton onClick={onClose} type="button" text="Close">Close</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsModal
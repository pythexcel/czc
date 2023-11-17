import { RxCross2 } from "react-icons/rx"
import CustomButton from "../Common-Component/CustomButton"
import Label from "../Common-Component/Label"
import NormalText from "../Common-Component/NormalText"
import ModalShadow from "../Common-Component/ModalShadow"

function DetailsModal({ onClose, botdetails }) {

    const { ai_type,
        bot_description,
        bot_name,
        gpt_model,
        open_ai_api_key,
        prompt,
        converstation_limit,
        prompt_type } = botdetails;

        const maskString = (str) => {
            const visibleChars = 2; 
            const maskedChars = str.length - visibleChars * 2;
            const maskedString = '*'.repeat(maskedChars);
            return str.substr(0, visibleChars) + maskedString + str.substr(str.length - visibleChars);
        };

    return (
        <ModalShadow onClose={onClose}>
            <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[2%] w-[500px] z-50">
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
                        <NormalText>{bot_name}</NormalText>
                    </div>
                    <div>
                        <Label>Bot Description</Label>
                        <NormalText>{bot_description}</NormalText>
                    </div>
                    <div>
                        <Label>Bot Webhook</Label>
                        <NormalText>https://chat.botwebhook.com/message?b=4651699011051154</NormalText>
                    </div>
                    <div>
                        <Label>OpenAi Key</Label>
                        <NormalText>{maskString(open_ai_api_key)}</NormalText>
                    </div>
                    <div className="flex gap-x-20">
                        <div className="space-y-3">
                            <div>
                                <Label>Bot Prompt</Label>
                                <NormalText>{prompt}</NormalText>
                            </div>
                            <div>
                                <Label>Bot Reference</Label>
                                <NormalText>Under Processing</NormalText>
                            </div>
                            <div>
                                <Label>Bot Conversation Limit</Label>
                                <NormalText>{converstation_limit}</NormalText>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <Label>Bot Prompt Type</Label>
                                <NormalText>{prompt_type}</NormalText>
                            </div>

                            <div>
                                <Label>Bot Type</Label>
                                <NormalText>{ai_type}</NormalText>
                            </div>
                            <div>
                                <Label>Bot Gpt Model</Label>
                                <NormalText>{gpt_model}</NormalText>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start px-8 pb-8 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                    <CustomButton onClick={onClose} type="button" text="Close">Close</CustomButton>
                </div>
            </div>
        </ModalShadow>
    )
}

export default DetailsModal
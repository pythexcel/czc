import ModalShadow from "../Common-Component/ModalShadow";

const ForgetPasswordModal = ({ onClose, heading }) => {
    return (
        <ModalShadow onClose={onClose}>
            <div className="relative bg-white rounded-md justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[500px] z-50 p-8">
                <div className="flex items-center justify-center">
                    <svg
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="font-Arial text-2xl font-semibold text-gray-600 my-5 justify-center">
                    Congratulation..!!
                </h1>
                <h1 className="text-gray-600 my-2">{heading}</h1>
                <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                    <button
                        type="button"
                        title="Close"
                        className="border-2 rounded-lg px-2 py-2 bg-blue-800 text-slate-50"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </ModalShadow>
    );
};
export default ForgetPasswordModal;
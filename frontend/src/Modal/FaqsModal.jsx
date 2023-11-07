import { HiOutlineExclamationCircle } from "react-icons/hi";

const FaqsModal = ({ onClose, heading }) => {
  return (
      <div>
        <div
          className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-2xl max-h-full m-auto">
            <div className="relative bg-white rounded-md justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[500px] z-50 p-8">
              <i>
                <HiOutlineExclamationCircle className="w-[100px] h-[100px] text-gray-500 font-normal mx-auto mb-10" />
              </i>
              <h1 className="font-Arial text-2xl font-semibold text-gray-600 my-5 justify-center">
                Attention!
              </h1>
              <h1 className="text-gray-600 my-2">{heading}</h1>
              <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-blue-500 text-slate-50 py-1 px-2 rounded-lg"
                >
                  OK
                </button>
                <button
                  type="button"
                  title="Close"
                  className="border-2 rounded-lg px-2 py-1"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default FaqsModal;
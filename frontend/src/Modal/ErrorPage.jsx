import { RxCrossCircled } from "react-icons/rx";
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";

function ErrorPage({ onClose }) {
  return (
    <ModalShadow className="z-50">
      <div className="relative bg-white rounded-md justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[500px] z-20 p-8">
        <RxCrossCircled className="w-[100px] h-[100px] text-red-400 font-normal mx-auto mb-10" />
        <h1 className="font-Arial text-2xl font-semibold text-gray-600 my-5 justify-center">
          Error!
        </h1>
        <h1 className="text-gray-600 my-6">
          The OpenAI API key you have entered is invalid!
        </h1>
        <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
          <CustomButton onClick={onClose} type="button" text="Close">
            Close
          </CustomButton>
        </div>
      </div>
    </ModalShadow>
  );
}

export default ErrorPage;

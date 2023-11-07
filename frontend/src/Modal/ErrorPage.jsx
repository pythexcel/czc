import { RxCrossCircled } from 'react-icons/rx';
import CustomButton from "../Common-Component/CustomButton"

function ErrorPage({ onClose }) {
  return (
    <div>
      <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-2xl max-h-full m-auto">
          <div className="relative bg-white rounded-md justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[500px] z-50 p-8">
            <RxCrossCircled className='w-[100px] h-[100px] text-red-400 font-normal mx-auto mb-10' />
            <h1 className='font-Arial text-2xl font-semibold text-gray-600 my-5 justify-center'>Error!</h1>
            <h1 className='text-gray-600 my-6'>The OpenAI API key you have entered is invalid!</h1>
            <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
              <CustomButton onClick={onClose} type="button" text="Close">Close</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;
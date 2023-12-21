import { message } from 'antd';
import successGif from '../assets/successfully.gif';

function DeleteFaq({ onClose, heading, message }) {
    return (
        <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full`}>
            <div className="relative w-full max-w-2xl max-h-full m-auto"></div>
            <div className="relative bg-white rounded-2xl justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[530px] z-50 p-8">
                <img src={successGif} className='w-[150px] h-[145px] text-orange-300 mx-auto mb-3' />
                <h1 className='text-gray-600 text-2xl font-semibold my-4 font-Arial'>{heading}</h1>
                <p className='text-gray-800 text-lg my-5 font-normal'>{message}</p>
                <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white mt-3">
                    <button
                        className='font-semibold rounded-lg bg-[#0F45F5] px-6 py-2 text-white'
                        onClick={onClose} type="button"
                        title="Close">
                        OK
                    </button>
                </div>
            </div>
        </div>

    )
}

export default DeleteFaq
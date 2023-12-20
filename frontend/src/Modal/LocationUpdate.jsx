import ModalShadow from "../Common-Component/ModalShadow";
import successGif from '../assets/successfully.gif';

function LocationUpdate({onClose, heading, message}) {
    return (
        <ModalShadow onClose={onClose}>
            <div className="relative bg-white rounded-2xl justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[530px] z-50 p-8">
                <img src={successGif} className='w-[150px] h-[145px] text-orange-300 mx-auto mb-3' />
                <h1 className='text-gray-800 text-2xl font-bold my-4 font-Arial'>{heading}</h1>
                <p className='text-gray-600 text-lg my-5 font-semibold'>{message}</p>
                <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white mt-3">
                    <button
                        className='font-semibold rounded-lg bg-[#0F45F5] px-6 py-2 text-white'
                        onClick={onClose} type="button"
                        title="Close">
                        ok
                    </button>
                </div>
            </div>
        </ModalShadow>
    )
}

export default LocationUpdate
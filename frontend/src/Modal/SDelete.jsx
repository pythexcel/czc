import { CiCircleAlert } from "react-icons/ci"



function SDelete({ onClose, handleDeletefaq, heading, message }) {


    return (
        <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full`}>
        <div className="relative bg-white rounded-2xl justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[530px] z-50 p-8">
        <CiCircleAlert className='w-[100px] h-[100px] text-orange-300 mx-auto mb-3' />
        <h1 className='text-gray-600 text-2xl font-semibold my-4 font-Arial'>{heading}</h1>
        <p className='text-gray-800 text-lg my-5 font-normal'>You won&lsquo;t be able to revert this!</p>
        <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white mt-3">
            <button
                className='bg-white border font-semibold text-[#0F45F5] border-blue-400 rounded-lg hover:bg-[#0F45F5] px-6 py-2 hover:text-white'
                onClick={onClose} type="button"
                title="Close">
                Cancel
            </button>
            <button
                onClick={handleDeletefaq}
                className='bg-[#0F45F5] text-white px-6 py-2 rounded-lg font-semibold'
                type="button"
                title="Close">
                Yes, delete it!
            </button>
        </div>
    </div>
        </div>
    )
}

export default SDelete
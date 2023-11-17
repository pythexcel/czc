import { CiCircleAlert } from 'react-icons/ci';
import ModalShadow from '../Common-Component/ModalShadow';

function IsDelete({ onClose, handleDeleteBot }) {
    return (
        <ModalShadow onClose={onClose}>
            <div className="relative bg-white rounded-2xl justify-center text-center items-center shadow-lg dark:white mx-auto mt-[40%] w-[530px] z-50 p-8">
                <CiCircleAlert className='w-[100px] h-[100px] text-orange-300 mx-auto mb-3' />
                <h1 className='text-gray-600 text-2xl font-semibold my-4 font-Arial'>Are you sure you want to delete this bot?</h1>
                <p className='text-gray-800 text-lg my-5 font-normal'>You won&lsquo;t be able to revert this!</p>
                <div className="flex justify-center space-x-2 rounded-b-lg dark:border-gray-600 bg-white mt-3">
                    <button
                        className='bg-white border font-semibold text-[#0F45F5] border-blue-400 rounded-lg hover:bg-[#0F45F5] px-6 py-2 hover:text-white'
                        onClick={onClose} type="button"
                        title="Close">
                        Cancel
                    </button>
                    <button
                        className='bg-[#0F45F5] text-white px-6 py-2 rounded-lg font-semibold'
                        onClick={handleDeleteBot}
                        type="button"
                        title="Close">
                        Yes, delete it!
                    </button>
                </div>
            </div>
        </ModalShadow>
    )
}

export default IsDelete
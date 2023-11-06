import { RxCross2 } from 'react-icons/rx';
import ModalPara from '../Component/ModalPara';
import CustomButton from '../Common-Component/CustomButton';



function InputModal({ onClose }) {
    return (
        <div>
            <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-2xl max-h-full m-auto">
                    <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[20%] w-[500px] z-50">
                        <div className="flex items-start bg-blue-600 justify-between p-4 rounded-t-xl ">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Add Users
                            </h3>
                            <button type="button" className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="static-modal">
                                <RxCross2 onClick={onClose} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                            <div>
                                <ModalPara>Email</ModalPara>
                                <textarea type='text' className='w-full border border-gray-300 rounded-lg p-2' placeholder='email' />
                            </div>
                            <div>
                                <ModalPara>Password</ModalPara>
                                <textarea type='text' className='w-full border border-gray-300 rounded-lg p-2' placeholder='Password' />
                            </div>
                        </div>
                        <hr />
                        <div className="flex justify-end p-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                            <CustomButton type="button" text="Close">Close</CustomButton>
                            <button type="button" className="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 text-white bg-blue-600">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InputModal;
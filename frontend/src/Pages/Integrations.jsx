import { HiCheck } from 'react-icons/hi';
import heighlevel from '../assets/HighLevel.png';
import OpenAI from '../assets/open.png';
import IntegrationModal from '../Modal/IntegrationModal';
import { useEffect, useState } from 'react';
import UpdateModal from '../Modal/UpdateModal';
import ToastSuccess from '../Modal/ToastSuccess';
import ToastFailed from '../Modal/ToastFailed';
import ErrorPage from '../Modal/ErrorPage';
import axiosInstance from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnet } from '../Store/slice/ConnectedFlagSlice';
import { setFaqs } from '../Store/slice/FaqsSlice';


function Integrations() {
    const dispatch = useDispatch();

    const access = useSelector(selectConnet)

    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [error, setError] = useState(false);
    const [highlevel, setHighlevel] = useState([])
    const [allow, setAllow] = useState();

    useEffect(() => {
        setAllow(access)
    },[access])

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false)
    }

    const handleCloseSuccess = () => {
        setSuccess(false)
    }

    const handleCloseFailed = () => {
        setFailed(false)
    }

    const handleCloseError = () => {
        setError(false)
    }

    const handlegethighlevel = async () => {
        try {
            const resp = await axiosInstance.get("users/agency-integration/")
            setHighlevel(resp.message);
            if(resp.message){
                dispatch(setFaqs(resp.message.id));
            }
            setOpenModal(true);
        } catch (error) {
            console.log(error, "error of high level")
        }
    }

    const handleButtonClick = (itemName) => {
        if (itemName === 'HighLevel') {
            handlegethighlevel()
        } else if (itemName === 'OpenAI') {
            setOpenUpdateModal(true)
        }
    }

    const handlesuccess = () => {
        setSuccess(true)
    }

    const data = [
        { img: heighlevel, brand: 'level_Brand', name: 'HighLevel' },
        { img: OpenAI, brand: 'OpenAI', name: 'OpenAI' }
    ]

    const renderModals = <div>
        {openModal && <IntegrationModal onClose={handleCloseModal} highlevel={highlevel} handlesuccess={handlesuccess} />}
        {openUpdateModal && <UpdateModal onClose={handleCloseUpdateModal} />}
        {success && <ToastSuccess
            title="Success"
            message="Selected agency updated successfully!"
            onClose={handleCloseSuccess} />}
        {failed && <ToastFailed onClose={handleCloseFailed} />}
        {error && <ErrorPage onClose={handleCloseError} />}
    </div>

    const Connected = <button className="float-right border border-gray-200 shadow-lg bg-[#00FF00] hover:bg-green-400 rounded-full p-3">
        <HiCheck className='text-white font-bold' />
    </button>

    return (
        <div>
            {renderModals}
            <div className='flex flex-col sm:flex-row lg:flex-row p-2 gap-6 h-[100%]'>
                {data.map((item, i) => (
                    <div key={i} className="border border-gray-300 rounded-lg w-[100%] h-[100%] lg:w-1/3 md:w-1/2 lg:h-[100%] sm:w-[100%] sm:h-[400px] bg-white shadow-lg p-4">
                        {allow === true && Connected }
                        <div className='justify-center flex flex-col text-center my-[9%]'>
                            <img src={item.img} alt='level_Brand' className='w-[100px] h-[100px] mx-auto' />
                            <h1 className='text-gray-700 text-3xl my-2 font-semibold hover:text-blue-500'>{item.name}</h1>
                            <p className='text-gray-500 font-normal text-lg'>{`Set Up Your ${item.name} Integration`}</p>
                            <button onClick={() => handleButtonClick(item.name)} className='bg-blue-600 mt-7 text-sm text-white font-semibold w-[110px] rounded-lg px-1 py-3 mx-auto'>{allow === true ? "CONNECTED" : "CONNECT"}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Integrations
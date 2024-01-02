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
import { useDispatch } from 'react-redux';
import { resetFaqs, setFaqs } from '../Store/slice/FaqsSlice';


function Integrations() {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [error, setError] = useState(false);
    const [highlevel, setHighlevel] = useState([])
    const [openAI, setOpenAI] = useState([])
    const [openAIkey, setOpenAIKey] = useState([])

    const [allow, setAllow] = useState("");

    // useEffect(() => {
    //     setAllow(access)
    // }, [access])

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
            dispatch(resetFaqs())
        try {
            const resp = await axiosInstance.get("users/agency-integration/")
            setHighlevel(resp.message);
            setAllow(resp.message.id)
            if (resp.message) {
                dispatch(setFaqs(resp.message.id));
            }
        } catch (error) {
            console.log(error, "error of high level")
        }
    }

    const handleOpenAI = async () => {
        try {
            const Airesp = await axiosInstance.get("users/manage-open-ai/")
            setOpenAI(Airesp.details[0].id)
            setOpenAIKey(Airesp.details[0].open_ai_key)
        } catch (error) {
            console.log(error, "openAi")
        }
    }

    useEffect(() => {
        handleOpenAI();
        handlegethighlevel();
    }, [])

    const handlesuccess = () => {
        setSuccess(true)
    }

    const renderModals = <div>
        {openModal && <IntegrationModal onClose={handleCloseModal} highlevel={highlevel} handlesuccess={handlesuccess} />}
        {openUpdateModal && <UpdateModal onClose={handleCloseUpdateModal} openAIkey={openAIkey} />}
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

                <div className="border border-gray-300 rounded-lg w-[100%] h-[100%] lg:w-1/3 md:w-1/2 lg:h-[100%] sm:w-[100%] sm:h-[400px] bg-white shadow-lg p-4">
                    {allow && Connected}
                    <div className='justify-center flex flex-col text-center my-[9%]'>
                        <img src={heighlevel} alt='level_Brand' className='w-[100px] h-[100px] mx-auto' />
                        <h1 className='text-gray-700 text-3xl my-2 font-semibold hover:text-blue-500'>Highlevel</h1>
                        <p className='text-gray-500 font-normal text-lg'>{`Set Up Your  Integration`}</p>
                        <button onClick={() => setOpenModal(true)} className='bg-blue-600 mt-7 text-sm text-white font-semibold w-[110px] rounded-lg px-1 py-3 mx-auto'>{allow ? "CONNECTED" : "CONNECT"}</button>
                    </div>
                </div>

                <div className="border border-gray-300 rounded-lg w-[100%] h-[100%] lg:w-1/3 md:w-1/2 lg:h-[100%] sm:w-[100%] sm:h-[400px] bg-white shadow-lg p-4">
                    {openAI && Connected}
                    <div className='justify-center flex flex-col text-center my-[9%]'>
                        <img src={OpenAI} alt='level_Brand' className='w-[100px] h-[100px] mx-auto' />
                        <h1 className='text-gray-700 text-3xl my-2 font-semibold hover:text-blue-500'>OpenAI</h1>
                        <p className='text-gray-500 font-normal text-lg'>{`Set Up Your  Integration`}</p>
                        <button onClick={() => setOpenUpdateModal(true)} className='bg-blue-600 mt-7 text-sm text-white font-semibold w-[110px] rounded-lg px-1 py-3 mx-auto'>{openAI ? "CONNECTED" : "CONNECT"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Integrations
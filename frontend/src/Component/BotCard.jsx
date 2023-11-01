import { GoArrowRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

function BotCard() {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/dashboard/createBot');
    };


    return (
        <div className="xl:w-1/3 md:w-1/2 h-[200px] border-2 border-gray-300 rounded-lg bg-white shadow-md flex flex-col justify-between">
            <div className="p-4">
                <p className='text-xl font-medium text-blue-500 flex flex-start'>Get started</p>
                <p className='text-lg text-slate-500 font-normal flex flex-start'>Let&rsquo;s Create a bot</p>
            </div>
            <div className="py-5">
                <hr />
                    <div className="font-medium text-end flex justify-end items-center gap-2 px-5 mt-3 cursor-pointer" onClick={handleClick}>
                        Continue <GoArrowRight className="custom-bold" />
                    </div>
            </div>
        </div>
    )
}

export default BotCard
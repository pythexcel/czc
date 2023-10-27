import { HiCheck } from 'react-icons/hi';
import heighlevel from '../assets/HighLevel.png';
import OpenAI from '../assets/open.png';


function Integrations() {

    const data = [
        { img: heighlevel, brand: 'level_Brand', name: 'HighLevel' },
        { img: OpenAI, brand: 'OpenAI', name: 'OpenAI' }
    ]

    return (
        <div className='flex p-2 gap-6'>
            {data.map((item, i) => (
                <div key={i} className="border border-gray-300 rounded-lg w-[520px] h-[400px] bg-white shadow-lg p-4">
                    <button className="float-right border border-gray-200 shadow-lg bg-[#00FF00] hover:bg-green-400 rounded-full p-3">
                        <HiCheck className='text-white font-bold' />
                    </button>
                    <div className='justify-center flex flex-col my-auto text-center mt-[15%]'>
                        <img src={item.img} alt='level_Brand' className='w-[100px] h-[100px] mx-auto' />
                        <h1 className='text-gray-700 text-3xl my-2 font-semibold hover:text-blue-500'>{item.name}</h1>
                        <p className='text-gray-500 font-normal text-lg'>{`Set Up Your ${item.name} Integration`}</p>
                        <button className='bg-blue-600 mt-7 text-sm text-white font-semibold w-[110px] rounded-lg px-1 py-3 mx-auto'>CONNECTED</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Integrations
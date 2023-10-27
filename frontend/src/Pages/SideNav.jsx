import { useNavigate } from 'react-router-dom';

import brand from '../assets/logo.png';
import { CgMenuRight } from 'react-icons/cg';
import { TbTopologyRing2 } from 'react-icons/tb';
import { RiRobot2Line } from 'react-icons/ri';
import { FcFaq } from 'react-icons/fc';
import { FiRepeat } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { useState } from 'react';

function SideNav() {
    const navigate = useNavigate()
    const [selectedItem, setSelectedItem] = useState(null);

    const handleNavigate = (route) => {
        setSelectedItem(route);
        navigate(route)
    }

    const Navi = [
        {routename:'integrations', icon:<TbTopologyRing2 className='w-[25px] h-[25px]'/>, name:"Integrations"},
        {routename:'bots', icon:<RiRobot2Line className='w-[25px] h-[25px]'/>, name:"Bots"},
        {routename:'faqs', icon:<FcFaq className='w-[25px] h-[25px]'/>, name:"FAQs"},
        {routename:'auditlogs', icon:<FiRepeat className='w-[25px] h-[25px]'/>, name:"Audit Logs"},
        {routename:'mngusers', icon:<FaUsers className='w-[25px] h-[25px]'/>, name:"Manage Users"}
    ]

    return (
        <div className='flex flex-col h-[100vh] shadow-xl'>
            <div className='bg-slate-50 flex flex-row h-[60px]'>
                <div className='flex w-[50%] mx-auto gap-2 h-[60px]'>
                    <img src={brand} alt='brand' className='w-[30px] h-[35px] my-auto' />
                    <span className='text-[#5BC2FE] font-bold my-auto text-xl'>ZappyChat</span>
                </div>
                <div className='flex flex-col items-start ml-2'>
                    <CgMenuRight className='text-gray-500 my-auto h-[30px] w-[35px]' />
                </div>
            </div>
            <hr className='text-slate-950' />
            <nav className='p-3'>
                <ul className="relative m-0 list-none items-center justify-center text-center">
                {Navi.map((item, i) => (
                    <li key={i} onClick={() => handleNavigate(item.routename)}  className={`cursor-pointer relative flex items-center mx-auto px-2 gap-2 my-1 ${selectedItem === item.routename ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'} rounded-md py-2`}>
                      <span className=''>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}                  
                </ul>
            </nav>
        </div>
    )
}

export default SideNav
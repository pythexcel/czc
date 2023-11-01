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

    const [open, setOpen] = useState(true);
    const [hoverOpen, setHoverOpen] = useState(false);

    // const handleNavigate = (route) => {
    //     setSelectedItem(route);
    //     navigate(route)
    // }

    const handleNavigate = (route) => {
        setSelectedItem(route);
        navigate(`/dashboard/${route}`);
    }

    const Navi = [
        {
            routename: 'integrations',
            icon: <TbTopologyRing2 className='w-[25px] h-[25px]' />,
            name: "Integrations"
        },
        {
            routename: 'bots',
            icon: <RiRobot2Line className='w-[25px] h-[25px]' />,
            name: "Bots"
        },
        {
            routename: 'faqs',
            icon: <FcFaq className='w-[25px] h-[25px]' />,
            name: "FAQs"
        },
        {
            routename: 'auditlogs',
            icon: <FiRepeat className='w-[25px] h-[25px]' />,
            name: "Audit Logs"
        },
        {
            routename: 'manageuser',
            icon: <FaUsers className='w-[25px] h-[25px]' />,
            name: "Manage Users"
        }
    ]

    return (
        <div className={`flex flex-col h-[100vh] shadow-xl ${open ? 'w-[230px]' : 'w-20'} duration-300`}
        // onMouseEnter={() => setHoverOpen(true)}
        // onMouseLeave={() => setHoverOpen(false)}
        >
            <div className='bg-slate-50 flex flex-row h-[60px] justify-between items-center'>
                <div className='flex ml-5 gap-2 h-[60px] cursor-pointer'>
                    <img src={brand} alt='brand' className='w-[25px] h-[30px] my-auto' />
                    <span className='text-[#5BC2FE] font-bold my-auto text-xl'>{open && "ZappyChat"}</span>
                </div>
                <div className='flex-col items-start cursor-pointer sm:block hidden'>
                    <CgMenuRight onClick={() => setOpen(!open)} className='text-gray-500 my-auto h-[25px] w-[30px]' />
                </div>
            </div>
            <hr className='text-slate-950' />
            <nav className='p-3'>
                <ul className="relative m-0 list-none items-center justify-center text-center">
                    {Navi.map((item, i) => (
                        <li key={i} onClick={() => handleNavigate(item.routename)} className={`cursor-pointer relative flex items-center mx-auto gap-2 my-1 ${selectedItem === item.routename ? 'bg-blue-100 text-blue-500' : 'hover:bg-blue-100 hover:text-blue-500'} rounded-md py-2`}>
                            <span className='ml-3'>
                                {item.icon}
                            </span>
                            <span className={`font-medium ${!open && !hoverOpen && 'hidden'}`}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default SideNav
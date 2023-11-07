import React from 'react';
import { RiRobot2Line } from "react-icons/ri";
import { FcFaq } from "react-icons/fc";
import { FiRepeat } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

function Drawer() {

    const Navi = [
        {   routename: 'integrations', 
            icon: <TbTopologyRing2 className='w-[25px] h-[25px]' />, 
            name: "Integrations" 
        },
        {   routename: 'bots', 
            icon: <RiRobot2Line className='w-[25px] h-[25px]' />, 
            name: "Bots" 
        },
        {   routename: 'faqs', 
            icon: <FcFaq className='w-[25px] h-[25px]' />, 
            name: "FAQs" 
        },
        {   routename: 'auditlogs', 
            icon: <FiRepeat className='w-[25px] h-[25px]' />, 
            name: "Audit Logs" 
        },
        {   routename: 'mngusers', 
            icon: <FaUsers className='w-[25px] h-[25px]' />, 
            name: "Manage Users" 
        }
    ]

  return (
    {openSideDrawer &&
        <div className='w-full h-full z-20 fixed top-0 transition ease-in-out delay-150'>
            <div className='w-2/3 md:w-1/2 sm:w-1/3 xs:w-1/4 h-full bg-gray-800' onClick={() => setOpenSideDrawer(!openSideDrawer)}></div>
            <div className={'h-full w-1/3 md:w-1/2 sm:w-2/3 xs:w-3/4 bg-white fixed right-0 top-0 py-3 sm:px-4 px-6 lg:block hidden'} >
                <div className='border border-1 border-black absolute right-3 px-2.5 py-1 mt-1.5 rounded-full font-bold cursor-pointer' onClick={() => setOpenSideDrawer(!openSideDrawer)}>X</div>
                <div className='text-black absolute top-16 mt-1.5 w-full'>
                    <hr />
                    <ul className={`cursor-pointer sm:text-base text-xl text-black`}>
                        {navItems.map((nav, idx) => {
                            return (
                                <li className='my-4' key={idx} onClick={() => router.push(`${nav.path}`)}>{nav.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    }
  )
}

export default Drawer
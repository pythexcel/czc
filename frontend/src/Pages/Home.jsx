import SideNav from "./SideNav";
import brand from '../assets/logo.png';
import { TbOutbound, TbTopologyRing2 } from 'react-icons/tb';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { FcFaq } from "react-icons/fc";
import { FiRepeat } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Footer from './Footer';
import axiosInstance from "../utils/axios";

function Home() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [title, setTitle] = useState("")

    const HandleLogout = async () => {
        try {
          const response = await axiosInstance.post("api/logout/", {});
          localStorage.clear();
          console.log("logout successful:", response);
          navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

    useEffect(() => {
        const path = pathname.split('/');
        const lastIndex = path.length - 1;
        const title = path[lastIndex];

        if (title === 'MANAGEUSER') {
            setTitle('Manage User');
        } else if (title === 'termCondition'){
            setTitle("TERMS & CONDITIONS");
        } else if (title === 'manageuser'){
            setTitle('MANAGE USERS')
        } else {
            setTitle(title);
        }
    }, [pathname]);

    const toggleVisibility = () => {
        setOpenSideDrawer(openSideDrawer => !openSideDrawer);
    };

    const handleNavigate = (route) => {
        setSelectedItem(route);
        navigate(route)
        // toggleVisibility();
    }

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <div className="w-100 bg-slate-100 flex flex-row" style={{ maxHeight: "100%", height: "100vh" }}>
            <div className="bg-white">
                {isSmallScreen ? <div>
                    {openSideDrawer &&
                        <div className='w-[250px] h-full z-20 fixed top-0 transition ease-in-out delay-650 shadow-lg'>
                            <div className='h-full bg-white right-0 top-0 py-3 sm:px-4 px-2 lg:block'>
                                <div className='text-black absolute w-[90%]'>
                                    <div className='flex ml-5 gap-2 -mt-4 h-[60px] cursor-pointer'>
                                        <img src={brand} alt='brand' className='w-[25px] h-[30px] my-auto' />
                                        <span className='text-[#5BC2FE] font-bold my-auto text-xl'>{open && "ZappyChat"}</span>
                                    </div>
                                    <hr />
                                    <ul className="cursor-pointer text-xl text-black my-5 focus:bg-white">
                                        {Navi.map((item, i) => {
                                            return (
                                                <li key={i} onClick={() => handleNavigate(item.routename)} className={`cursor-pointer relative flex items-center mx-auto gap-2 my-1 ${selectedItem === item.routename ? 'bg-blue-100 text-blue-500' : ''} rounded-md py-2`}>
                                                    <span className='ml-5'>
                                                        {item.icon}
                                                    </span>
                                                    <span className="text-sm font-semibold">{item.name}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    } </div>
                    : <SideNav />
                }
            </div>
            <div className="w-full h-full content overflow-auto">
                <div className="bg-white h-[5%] w-full items-center flex justify-between px-7 shadow-lg">
                    {isSmallScreen ?
                        <div className='flex ml-1 gap-2 h-[60px] cursor-pointer'>
                            <img src={brand} alt='brand' className='w-[25px] h-[30px] my-auto' />
                            <span className='text-[#5BC2FE] font-bold my-auto text-xl'>ZappyChat</span>
                        </div> : <p className="text-gray-600 font-bold tracking-widest text-sm my-auto">{title?.toUpperCase()}</p>
                    }
                    <div className="flex gap-2">
                        <Link to="/">
                            <span className="text-slate-950 flex items-center gap-1">
                                <TbOutbound />
                                <p className="font-semibold cursor-pointer" onClick={HandleLogout}>
                                    Logout
                                </p>
                            </span>
                        </Link>
                        {isSmallScreen && <CgMenuRight onClick={toggleVisibility} className='text-gray-500 my-auto h-[25px] w-[30px]' />}
                    </div>
                </div>
                <div className="content h-[95%] flex flex-col justify-between">
                    <div className="px-6 py-6 "><Outlet /></div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

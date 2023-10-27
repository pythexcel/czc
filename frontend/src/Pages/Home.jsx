import SideNav from "./SideNav";
import { TbOutbound } from 'react-icons/tb';
import CreateBot from "./CreateBot";
import { Outlet, Route } from "react-router-dom";

function Home() {
    return (
        <div className="w-100 h-[100vh] bg-slate-100 flex flex-row">
            <div className="bg-white w-[12%] h-[100%]"><SideNav /></div>
            <div className="w-[90%]">
                <div className="bg-white h-[60px] w-full items-center flex justify-between px-7 shadow-lg">
                    <p className="text-gray-600 font-bold tracking-widest text-sm my-auto">BOTS</p>
                    <span className="text-slate-950 flex items-center gap-1">
                        <TbOutbound />
                        <p className="font-semibold">Logout</p>
                    </span>
                </div>
                <div className="content p-4">
                    <Outlet>
                        {/* Adjust the path */}
                        <Route path="/createBot" element={<CreateBot />} />
                    </Outlet>
                </div>
            </div>
        </div>
    )
}

export default Home;

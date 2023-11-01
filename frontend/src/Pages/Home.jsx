import SideNav from "./SideNav";
import { TbOutbound } from "react-icons/tb";
import CreateBot from "./CreateBot";
import { Outlet, Route, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

function Home() {
  const navigate = useNavigate();
  const HandleLogout = async () => {
    try {
      const response = await axiosInstance.post("logout/", {});
      localStorage.clear();
      console.log("logout successful:", response);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="w-100 h-[100vh] bg-slate-100 flex flex-row">
      <div className="bg-white h-[100%]">
        <SideNav />
      </div>
      <div className="w-[90%]">
        <div className="bg-white h-[60px] w-full items-center flex justify-between px-7 shadow-lg">
          <p className="text-gray-600 font-bold tracking-widest text-sm my-auto">
            BOTS
          </p>
          <span className="text-slate-950 flex items-center gap-1">
            <TbOutbound />
            <p className="font-semibold cursor-pointer" onClick={HandleLogout}>
              Logout
            </p>
          </span>
        </div>
        <div className="content p-4">
          <Outlet>
           <Route path="/createBot" element={<CreateBot />} /> 
          </Outlet>
        </div>
      </div>
    </div>
  );
}

export default Home;

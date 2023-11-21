import { MdCancel } from "react-icons/md";
import { FaFileExport, FaFileImport, FaSearch } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { BsCloudPlusFill } from "react-icons/bs";
import { useState } from "react";
import AddFaqs from "../Modal/AddFaqs";
import ScrapURL from "../Modal/ScrapUrl";
import ImportFAQs from "../Modal/ImportFaqs";

const WidgetDrawer = ({ iswidgetdrawer, setIsWidgetDrawer }) => {
  const [isaddfaqs, setIsAddFaqs] = useState(false);
  const [isscrapurl, setIsScrapUrl] = useState(false);
  const [isimportfaqs, setIsImportFaqs] = useState(false);
  const onClose = () => {
    setIsAddFaqs(false);
    setIsScrapUrl(false);
    setIsImportFaqs(false);
  };
  return (
    <div
      className={`fixed top-0 right-0 z-40 h-screen p-4 transition-all duration-900 ease-in-out ${
        iswidgetdrawer ? "translate-x-0" : "translate-x-full"
      } w-[45%] bg-[#F2F7FA] overflow-y-scroll`}
    >
      <div
        className=" cursor-pointer flex justify-end"
        onClick={() => setIsWidgetDrawer(false)}
      >
        <MdCancel className="text-gray-600 hover:bg-blue-500 font-semibold rounded-lg text-2xl" />
      </div>
      <div className=" flex justify-center mt-3">
        <div
          className="mr-[2%] cursor-pointer   p-6 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center border border-blue-500"
          onClick={() => setIsAddFaqs(true)}
        >
          <MdAddCard className="text-[#0F45F5] hover:text-green-500" />
          <span className="text-[#0F45F5] text-sm ml-1 hover:text-green-500">
            {" "}
            Add
          </span>
        </div>
        <div className="mr-[2%] cursor-pointer hover:bg-[#0F45F5]  p-6 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center border border-blue-500">
          <FaFileExport className="text-[#0F45F5]  hover:text-white" />
          <span className="text-[#0F45F5] text-sm ml-1  hover:text-white"> Export</span>
        </div>
        <div
          className="mr-[2%] text-[#8392AB] cursor-pointer  p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex items-center border border-blue-500"
          onClick={() => setIsImportFaqs(true)}
        >
          <FaFileImport className="text-[#0F45F5]" />
          <span className="text-[#0F45F5] text-sm ml-1"> Import</span>
        </div>
        <div className="mr-[2%] cursor-pointer  p-6 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center border border-blue-500">
          <FaSearch className="text-[#0F45F5]" />
          <span className="text-[#0F45F5] text-sm ml-1"> Search</span>
        </div>
        <div
          className="cursor-pointer  p-6 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center border border-blue-500"
          onClick={() => setIsScrapUrl(true)}
        >
          <BsCloudPlusFill className="text-[#0F45F5]" />
          <span className="text-[#0F45F5] text-sm ml-1"> Scrape URL</span>
        </div>
      </div>
      <div>
        <div className="bg-white p-6 mt-6 rounded-lg ">
          <p className="font-semibold text-[#999999]">
            Q: What does the program cost and how does it compare to living
            expenses?
          </p>
          <p className="text-[#999999]">
            A: The program costs £199 for 6 weeks. A lot of our members find
            that just by reallocating some expenses like daily coffee, lunch
            out, after-work drinks, and takeaway dinners, you can cover the cost
            of the program and save additional money.
          </p>
        </div>
        <div className="bg-white p-6 mt-4 rounded-lg ">
          <p className="font-semibold text-[#999999]">
            Q: What does the program cost and how does it compare to living
            expenses?
          </p>
          {/* <i><RiEditBoxFill/></i> */}
          <p className="text-[#999999]">
            A: The program costs £199 for 6 weeks. A lot of our members find
            that just by reallocating some expenses like daily coffee, lunch
            out, after-work drinks, and takeaway dinners, you can cover the cost
            of the program and save additional money.
          </p>
        </div>
        <div className="bg-white p-6 mt-4 rounded-lg ">
          <p className="font-semibold text-[#999999]">
            Q: What does the program cost and how does it compare to living
            expenses?
          </p>
          {/* <i><RiEditBoxFill/></i> */}
          <p className="text-[#999999]">
            A: The program costs £199 for 6 weeks. A lot of our members find
            that just by reallocating some expenses like daily coffee, lunch
            out, after-work drinks, and takeaway dinners, you can cover the cost
            of the program and save additional money.
          </p>
        </div>
      </div>
      <div className=" flex mt-4 ">
        <div className="mr-[1%] cursor-pointer  p-4 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center">
          <FaLessThan />
        </div>
        <div className="text-[#8392AB] cursor-pointer  p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex items-center">
          <FaGreaterThan />
        </div>
      </div>
      {isaddfaqs && <AddFaqs onClose={onClose} />}
      {isscrapurl && <ScrapURL onClose={onClose} />}
      {isimportfaqs && <ImportFAQs onClose={onClose} />}
    </div>
  );
};

export default WidgetDrawer;

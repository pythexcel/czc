import { FiRefreshCcw } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import FaqsModal from "../Modal/FaqsModal";
import WidgetDrawer from "../Component/WidgetDrawer";
import TextPage from './TextPage';
import { useSelector } from "react-redux";
import { selectFaqs } from "../Store/slice/FaqsSlice";
import LocationUpdate from "../Modal/LocationUpdate";
<<<<<<< Updated upstream
=======
import { RiArrowRightSLine } from "react-icons/ri";
import axiosInstance from "../utils/axios";
>>>>>>> Stashed changes

const FAQs = () => {
  const [isenableModal, setIsEnableModal] = useState(false);
  const [isdisableModal, setIsDisableModal] = useState(false);
  const [iswidgetdrawer, setIsWidgetDrawer] = useState(false);
  const [updatelocation, setUpdatelocation] = useState(false);
<<<<<<< Updated upstream
  // const [defaultPage, setDefaultPage] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
=======

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([])
  const [isChecked, setIsChecked] = useState(false);
  const [widgetsids, setWidgetsids] = useState("");

  console.log(data,"/////")

>>>>>>> Stashed changes
  const buttonsData = [
    { text: "Enable All Locations", onClick: () => setIsEnableModal(true) },
    { text: "Disable All Locations", onClick: () => setIsDisableModal(true) },
    { text: "Enable Locations", onClick: () => { } },
    { text: "Disable Location", onClick: () => { } },
    { text: "Import FAQS", onClick: () => { } },
  ];

<<<<<<< Updated upstream
  const faqsPermission = useSelector(selectFaqs);
  console.log(faqsPermission,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  
  // if(faqsPermission === "Allow"){
  //   setDefaultPage(true)
  // }  

  // const toggleIsOpen = () => {
  //   setIsOpen((prevIsOpen) => !prevIsOpen);
  // };
=======
  const itemPerPage = 10;

  const totalPages = Math.ceil(data?.length / itemPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const displayedItems = data?.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages || totalPages === 0;

  // const faqsPermission = useSelector(selectFaqs);
>>>>>>> Stashed changes

  const handleUpdateLocation = () => {
    setIsChecked(prev => !prev)
    setTimeout(() => {
      setUpdatelocation(true);
    }, 700);
  };
<<<<<<< Updated upstream
  
=======

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const getfaqs = async () => {
    try {
      const resp = await axiosInstance.get("locations/get/")
      setData(resp.data)
    } catch (error) {
      console.log(error, "this is eror")
    }
  }

  const handleWidgets = (id) => {
    setIsWidgetDrawer(true);
    setWidgetsids(id)
  }

  const heading = "py-2 font-normal text-[#8392AB] mx-3"

  const headingS = "py-2 font-normal text-[#8392AB] text-start"

  const sel = [
    "Training Bot",
    "Test",
    "test4",
    "Main Appointment Setting",
    "Test"
  ]

  const sty = "text-[#8392AB] w-4 h-4 Text"

  const iccons = "text-[#0F45F5] Text"

  const handleHeadCheck = () => {
    const updatedData = data.map(item => ({ ...item, isChecked: !selectAll }));
    setData(updatedData);
    setSelectAll(!selectAll);
  }

  const handleCheckedData = (id) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(updatedData);
    setSelectAll(updatedData.every(item => item.isChecked));
  }
>>>>>>> Stashed changes

  const getreferesh = () => {
    getfaqs();
  }

  useEffect(() => {
    getfaqs();
  }, [])

  return (
    <div>{(data === undefined || (Array.isArray(data) && data.length === 0))  ? <TextPage /> :
      <div className="relative">
        <div className="p-6">
          <div className="flex justify-between flex-wrap">
            <div>
              <h6 className="font-bold  text-[#344767] text-xl  break-all">
                Manage FAQs by Sub-Accounts
              </h6>
            </div>
            <form className="w-[10%]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-blue-600 rounded-l-md">
                  <HiSearch className="text-white w-[20px] h-[20px]" />
                </div>
                <input
                  type="search"
                  className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-semibold"
                  placeholder="Type and Press Enter"
                  required
                />
              </div>
            </form>
            <button
              className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg flex gap-2"
              onClick={() => { }}
            >
              <i className="text-slate-50 text-xl h-[20px]">
                <FiRefreshCcw />
              </i>
              <h4>Refresh Sub-Accounts</h4>
            </button>
          </div>
          <div className="flex justify-between mt-4 ">
            <p className=" text-[#8392AB] mt-[-1%] w-[27%] font-medium break-all mr-1">
              (Agency Reference: 110316990000)
            </p>
            {buttonsData.map((item, index) => (
              <button
                key={index}
                className="bg-[#0F45F5] text-white mr-2 font-semibold items-center p-2 rounded-lg "
                onClick={item.onClick}
              >
                {item.text}
              </button>
            ))}
          </div>

<<<<<<< Updated upstream
          <div className=" w-full mt-6   bg-slate-50 shadow-lg bg-opacity-17 rounded-lg overflow-x-scroll">
            <table className="w-full border-collapse rounded-lg  ">
=======
          <div className="w-full mt-6 bg-slate-50 shadow-lg bg-opacity-17 rounded-lg overflow-x-scroll">
            <table className="w-full border-collapse rounded-lg border border-slate-200 ">
>>>>>>> Stashed changes
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-xl px-4 text-[#8392AB] text-start">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-2 font-normal text-[#8392AB]">
                    SUB-ACCOUNTS NAME{" "}
                  </th>
                  <th className="py-2 font-normal text-[#8392AB] ">
                    NO OF FAQS
                  </th>
                  <th className="py-2 font-normal text-[#8392AB]">ENABLED</th>

                  <th className="py-2 font-normal text-[#8392AB]">
                    LAST UPDATED
                  </th>
                  <th className="py-2 font-normal text-[#8392AB]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
<<<<<<< Updated upstream
                <tr>
                  <td className="py-4 px-4  text-xl text-[#8392AB]">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4 bg-slate-50 text-sm text-center text-[#8392AB]">
                    180 Transformations
                  </td>
                  <td className="py-4 px-4 bg-slate-50 text-sm text-center text-[#8392AB]">
                    20
                  </td>
                  <td className="py-4 px-4 bg-slate-50 text-sm flex justify-center mt-[8%]  text-[#8392AB]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div onClick={handleUpdateLocation} className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </td>
                  <td className="py-4 px-4 bg-slate-50 text-sm text-center  mr-[100%] text-[#8392AB] ">
                    18/10/2022
                  </td>
                  <td className="py-4 px-4 text-sm text-right">
                    <div className=" flex justify-center ">
                      <div className="mr-[5%] cursor-pointer  p-4 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center">
                        <FaFileExport />
=======
                {displayedItems?.map((item, index) => (
                  <tr key={index} className="tableBox border-b border-solid border-slate-300 hover:bg-[#F3F5FE] bg-slate-50">
                    <td className="py-2 px-4 text-xl text-[#8392AB]">
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheckedData(item.id)}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500"
                      />
                    </td>
                    <td className="Text py-2 text-md text-start text-[#8392AB]">
                      {item.location_name}
                    </td>
                    <td className="Text py-2 px-4 text-md text-center text-[#8392AB]">
                      {item.faq.no_of_faqs}
                    </td>
                    <td className="py-2 px-4 text-sm flex justify-center mt-[8%]  text-[#8392AB]">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div onClick={handleUpdateLocation} className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#02E002]"></div>
                      </label>
                    </td>
                    <td className="Text py-2 px-4 text-md text-center  mr-[100%] text-[#8392AB] ">
                      {item.faq.last_updated}
                    </td>
                    <td className="py-2 px-4 text-sm text-right">
                      <div className=" flex justify-center">
                        <div className="cursor-pointer text-[#8392AB] p-2 shadow-lg bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center border border-slate-300">
                          <FaFileExport className={sty} />
                        </div>

                        <div className="cursor-pointer flex flex-row shadow-lg px-2 bg-opacity-17 bg-[#f8fafc] rounded-lg items-center ml-[2%] border border-slate-300">
                          <FaFileImport className={sty} />
                        </div>

                        <div
                          className="cursor-pointer flex flex-row shadow-lg px-2 bg-opacity-17 bg-[#f8fafc] rounded-lg items-center w-[130px] space-x-2 ml-[2%] border border-slate-300"
                          onClick={() => handleWidgets(item.id)}
                        >
                          <AiFillEye className={sty} />
                          <span className="text-[#8392AB] font-semibold Text">Widget</span>
                        </div>

                        <div className="cursor-pointer flex flex-row shadow-lg px-2 bg-opacity-17 bg-[#f8fafc] rounded-lg items-center w-[130px] space-x-2 ml-[2%] border border-slate-300">
                          <MdDelete className={sty} />
                          <span className="text-[#8392AB] font-semibold Text">Clear FAQs</span>
                        </div>

                        <div className="flex flex-row">
                          <select onClick={toggleIsOpen} className="rounded-lg appearance-none border border-[#0F45F5] focus:outline-none focus:ring-2 text-base mx-2 shadow-md w-[150px] py-2 px-3 text-[#0F45F5] font-semibold hover:bg-[#0F45F5] hover:text-slate-50">
                            {sel.map((item, index) => (
                              <option key={index} className="bg-slate-50 text-gray-400 hover:bg-[#F3F5FE] hover:text-[#0F8FE9]">    {item}
                              </option>
                            ))}
                          </select>
                          <span
                            className={`relative top-0 h-full text-center font-bold pointer-events-none flex items-center justify-center duration-300 hover:text-slate-50 -ml-[25%] ${isOpen ? "transform rotate-180" : ""
                              }`}
                          >
                            <HiOutlineChevronDown className={iccons} />
                          </span>
                        </div>
>>>>>>> Stashed changes
                      </div>
                      <div className="text-[#8392AB] cursor-pointer  p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex items-center">
                        <FaFileImport />
                      </div>

                      <div
                        className="flex cursor-pointer item-center ml-[5%]  mr-[3%] p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg"
                        onClick={() => setIsWidgetDrawer(true)}
                      >
                        <i className="text-[#8392AB] mr-[2%] mt-[6%]">
                          <AiFillEye />
                        </i>
                        <h6 className="text-[#8392AB]">Widget</h6>
                      </div>
                      <div className=" cursor-pointer flex ml-[2%] mr-[2%] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg items-center">
                        <i className="text-[#8392AB] mr-[2%] mt-[6%]">
                          <MdDelete />
                        </i>
                        <h6 className="text-[#8392AB] ">Clear </h6>
                      </div>
                      {/* <div className="flex justify-around relative">
                      <select
                        onClick={toggleIsOpen}
                        className="rounded-lg border border-blue-600 appearance-none py-2 text-base justify-between focus:shadow-lg pl-5 font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer"
                      >
                        <option className="hover:text-blue-600 bg-white hidden">
                          Select Location
                        </option>
                        {opt.map((item, i) => (
                          <option
                            className="hover:text-blue-400 bg-white text-gray-500 text-start p-5"
                            key={i}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                      <span
                        className={`absolute top-0 h-full ml-[180px] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      >
                        <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold" />
                      </span>
                    </div> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {updatelocation && (
<<<<<<< Updated upstream
          <LocationUpdate 
=======
          <LocationUpdate
>>>>>>> Stashed changes
            heading="Location Successfully updated!"
            onClose={() => setUpdatelocation(false)}
          />
        )}
        {isenableModal && (
          <FaqsModal
            heading="Are you Sure You want to Enable all location"
            onClose={() => setIsEnableModal(false)}
          />
        )}
        {isdisableModal && (
          <FaqsModal
            heading="Are you Sure You want to Disable all location"
            onClose={() => setIsDisableModal(false)}
          />
        )}
        {iswidgetdrawer && (
          <WidgetDrawer
            widgetsids={widgetsids}
            iswidgetdrawer={iswidgetdrawer}
            getreferesh={getreferesh}
            setIsWidgetDrawer={setIsWidgetDrawer}
          />
        )}
      </div>
    }
    </div>
  );
};

export default FAQs;

import { FiChevronLeft, FiRefreshCcw } from "react-icons/fi";
import { HiOutlineChevronDown, HiSearch } from "react-icons/hi";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import FaqsModal from "../Modal/FaqsModal";
import WidgetDrawer from "../Component/WidgetDrawer";
import TextPage from './TextPage';
import { useSelector } from "react-redux";
import { selectFaqs } from "../Store/slice/FaqsSlice";
import LocationUpdate from "../Modal/LocationUpdate";
import { RiArrowRightSLine } from "react-icons/ri";

const FAQs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isenableModal, setIsEnableModal] = useState(false);
  const [isdisableModal, setIsDisableModal] = useState(false);
  const [iswidgetdrawer, setIsWidgetDrawer] = useState(false);
  const [updatelocation, setUpdatelocation] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const buttonsData = [
    { text: "Enable All Locations", onClick: () => setIsEnableModal(true) },
    { text: "Disable All Locations", onClick: () => setIsDisableModal(true) },
    { text: "Enable Locations", onClick: () => { } },
    { text: "Disable Location", onClick: () => { } },
    { text: "Import FAQS", onClick: () => { } },
  ];

  const [data, setData] = useState([
    { id: 1, name: "180 Transformations", faqs: 1, lastUpdate: "23/01/2024" },
    { id: 2, name: "ZappayChat", faqs: 0, lastUpdate: "21/02/2024" },
    { id: 3, name: "Amrita", faqs: 2, lastUpdate: "20/01/2024" },
    { id: 4, name: "Anamika", faqs: 2, lastUpdate: "20/01/2024" },
    { id: 5, name: "Amrita", faqs: 0, lastUpdate: "20/04/2024" },
    { id: 6, name: "shivanya", faqs: 2, lastUpdate: "20/01/2024" },
    { id: 7, name: "XYZ Corp", faqs: 3, lastUpdate: "15/03/2024" },
    { id: 8, name: "Tech Solutions", faqs: 1, lastUpdate: "18/02/2024" },
    { id: 9, name: "Innovate Hub", faqs: 4, lastUpdate: "10/04/2024" },
    { id: 10, name: "Data Dynamics", faqs: 0, lastUpdate: "25/01/2024" },
    { id: 11, name: "Eco Ventures", faqs: 2, lastUpdate: "12/03/2024" },
    { id: 12, name: "Connectify", faqs: 1, lastUpdate: "05/02/2024" },
    { id: 13, name: "SynthCorp", faqs: 3, lastUpdate: "29/03/2024" },
    { id: 14, name: "Quantum Innovations", faqs: 0, lastUpdate: "14/02/2024" },
    { id: 15, name: "Pinnacle Systems", faqs: 2, lastUpdate: "08/04/2024" },
    { id: 16, name: "Digital Nexus", faqs: 1, lastUpdate: "20/03/2024" },
    { id: 17, name: "Future Connect", faqs: 4, lastUpdate: "22/02/2024" },
    { id: 18, name: "DataStreams Ltd", faqs: 0, lastUpdate: "17/01/2024" },
    { id: 19, name: "InnoTech Solutions", faqs: 2, lastUpdate: "30/03/2024" },
    { id: 20, name: "InfoDynamics", faqs: 1, lastUpdate: "03/04/2024" },
    { id: 21, name: "Eagle Eye Tech", faqs: 3, lastUpdate: "11/02/2024" },
    { id: 22, name: "Alpha Innovations", faqs: 0, lastUpdate: "19/01/2024" },
    { id: 23, name: "Omega Systems", faqs: 2, lastUpdate: "28/03/2024" },
    { id: 24, name: "Tech Fusion", faqs: 1, lastUpdate: "07/04/2024" },
    { id: 25, name: "Synergetic Solutions", faqs: 4, lastUpdate: "16/02/2024" }
  ])

  const itemPerPage = 10;

  const totalPages = Math.ceil(data.length / itemPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const displayedItems = data.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages || totalPages === 0;

  const faqsPermission = useSelector(selectFaqs);

  const handleUpdateLocation = () => {
    setTimeout(() => {
      setUpdatelocation(true);
    }, 700);
  };

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

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

  return (
    <div>{!faqsPermission ? <TextPage /> :
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
              <FiRefreshCcw className="text-slate-50 text-xl h-[20px]" />
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


          <div className="w-full mt-6 bg-slate-50 shadow-lg bg-opacity-17 rounded-lg overflow-x-scroll">
            <table className="w-full border-collapse rounded-lg border border-slate-200 ">
              <thead>
                <tr className="bg-[#F3F5FE] border-b border-solid border-slate-300 rounded-lg">
                  <th className="text-xl px-4 text-[#8392AB] text-start py-[12px]">
                    <input
                      type="checkbox"
                      className="border border-blue-500 h-5 w-5"
                      checked={selectAll}
                      onChange={handleHeadCheck}
                    />
                  </th>
                  <th className={headingS}>
                    SUB-ACCOUNTS NAME{" "}
                  </th>
                  <th className={heading}>
                    NO OF FAQS
                  </th>
                  <th className={heading}>ENABLED</th>
                  <th className={heading}>
                    LAST UPDATED
                  </th>
                  <th className={heading} style={{ width: "200px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {displayedItems.map((item, index) => (
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
                      {item.name}
                    </td>
                    <td className="Text py-2 px-4 text-md text-center text-[#8392AB]">
                      {item.faqs}
                    </td>
                    <td className="py-2 px-4 text-sm flex justify-center mt-[8%]  text-[#8392AB]">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div onClick={handleUpdateLocation} className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </td>
                    <td className="Text py-2 px-4 text-md text-center  mr-[100%] text-[#8392AB] ">
                      {item.lastUpdate}
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
                          onClick={() => setIsWidgetDrawer(true)}
                        >
                          <AiFillEye className={sty} />
                          <span className="text-[#8392AB] font-semibold Text">Widget</span>
                        </div>

                        <div className="cursor-pointer flex flex-row shadow-lg px-2 bg-opacity-17 bg-[#f8fafc] rounded-lg items-center w-[130px] space-x-2 ml-[2%] border border-slate-300">
                          <MdDelete className={sty} />
                          <span className="text-[#8392AB] font-semibold Text">Clear FAQs</span>
                        </div>

                        <div className="flex flex-row">
                          <select onClick={toggleIsOpen} className="rounded-lg  appearance-none border border-[#0F45F5] focus:outline-none focus:ring-2 text-base mx-2 shadow-md w-[150px] py-2 px-3 text-[#0F45F5] font-semibold hover:bg-[#0F45F5] hover:text-slate-50">
                            {sel.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                          </select>
                          <span
                            className={`relative top-0 h-full text-center font-bold pointer-events-none flex items-center justify-center duration-300 hover:text-slate-50 -ml-[25%] ${isOpen ? "transform rotate-180" : ""
                              }`}
                          >
                            <HiOutlineChevronDown className={iccons} />
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-4 space-x-2">
            <button
              disabled={isPrevButtonDisabled}
              onClick={() => handlePageChange(currentPage - 1)}
              className="cursor-pointer p-4 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center hover:bg-green-400 border border-slate-300">
              <FiChevronLeft />
            </button>
            <span className="bg-slate-50 border border-slate-300 rounded p-2">
              {`${currentPage} of ${totalPages}`}
            </span>
            <button
              disabled={isNextButtonDisabled}
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-[#8392AB] cursor-pointer p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex items-center hover:bg-green-400 border border-slate-300">
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
        {updatelocation && ( 
          <LocationUpdate
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
            iswidgetdrawer={iswidgetdrawer}
            setIsWidgetDrawer={setIsWidgetDrawer}
          />
        )}
      </div>
    }
    </div>
  );
};

export default FAQs;

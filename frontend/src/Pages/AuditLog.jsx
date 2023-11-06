import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineChevronDown, HiSearch } from "react-icons/hi";
import { useState } from "react";

const AuditLog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const opt = [
    "180 Transformations",
    '415 Media Group',
    "Aaron Burgess's Account",
    "Aaron Huey's Account",
    "Abdi Yassin's Account",
    "Abdul Qadir's Account",
    "Abraham O's Account",
    "Adonnis Howard's Account",
    "Adrian Hazzi's Account",
    "Advanced GPT Snapshot"
  ]

  const toggleIsOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between flex-grow">
        <p className="font-bold text-[#344767] text-2xl">Audit Logs</p>

        <form className="w-[15%] ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-blue-600 rounded-l-md">
              <HiSearch className="text-white w-[20px] h-[20px]" />
            </div>
            <input
              type="search"
              className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-semibold"
              placeholder="Search Contact ID"
              required
            />
          </div>
        </form>

        <button
          className="bg-[#0F45F5] text-white font-semibold items-center  rounded-lg flex px-2 py-2 "
          onClick={() => { }}
        >
          <i className="text-slate-50 text-lg mr-1">
            <FiRefreshCcw />
          </i>
          Refresh Logs
        </button>

        <div className="w-[200px] relative">
          <select onClick={toggleIsOpen} className="rounded-lg border border-blue-600 appearance-none py-2 text-base justify-between focus:shadow-lg pl-5 font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer">
            <option className="hover:text-blue-600 bg-white hidden">Select Location</option>
            {opt.map((item, i) => (
              <option className="hover:text-blue-400 bg-white text-gray-500 text-start p-5" key={i}>{item}</option>
            ))}
          </select>
          <span className={`absolute top-0 h-full ml-[180px] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
            <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold" />
          </span>
        </div>

      </div>
      <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17 rounded-lg">
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-blue-100 ">
              <th className="py-2 font-medium text-[#8392B3]">CONTACT ID</th>
              <th className="py-2 font-medium px-2 text-[#8392B3]">
                QUESTION
              </th>
              <th className="py-2 font-medium px-2 text-[#8392B3]">ANSWER</th>
              <th className="py-2 font-medium px-2 text-[#8392B3]">STATUS</th>
              <th className="py-2 font-medium px-2 text-[#8392B3]">
                TIMESTAMP
              </th>
              <th className="py-2 font-medium px-2 text-[#8392B3]">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="py-4 px-4 bg-slate-50 text-xl text-center"
                colSpan="6"
              >
                Select a location from the filter above to display logs for
                the location.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AuditLog;
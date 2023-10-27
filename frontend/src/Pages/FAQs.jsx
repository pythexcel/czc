import { FiRefreshCcw } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const FAQs = () => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="font-bold  text-[#344767] text-3xl">
            Manage FAQs by Sub-Accounts
          </h6>
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
            onClick={() => {}}
          >
            <i className="text-slate-50 text-xl h-[20px]">
              <FiRefreshCcw />
            </i>
              Refresh Sub-Accounts
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <h6 className="font-bold  text-[#344767] text-lg">
            (Agency Reference: 11031695495800)
          </h6>
          <button
            className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg"
            onClick={() => {}}
          >
              Enable All Locations
          </button>
          <button
          className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg"
            onClick={() => {}}
          >
              Disable All Locations
          </button>
          <button
          className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg"
            onClick={() => {}}
          >
              Enable Locations
          </button>
          <button
          className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg"
            onClick={() => {}}
          >
              Disable Location
          </button>
          <button
          className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg"
            onClick={() => {}}
          >
              Import FAQS
          </button>
        </div>
        <div className="w-full mt-6   bg-slate-50 shadow-lg bg-opacity-17 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 ">
                <th className="py-4 text-xl text-[#8392AB]">
                  SUB-ACCOUNTS NAME{" "}
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">NO OF FAQS</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">ENABLED</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">
                  LAST UPDATED
                </th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 bg-slate-50 text-2xl text-center text-[#8392AB]">
                  180 Transformations
                </td>
                <td className="py-4 px-4 bg-slate-50 text-2xl text-center text-[#8392AB]">
                  20
                </td>
                <td className="py-4 px-4 bg-slate-50 text-2xl flex justify-center mt-[5%]  text-[#8392AB]">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-4 px-4 bg-slate-50 text-2xl text-center text-[#8392AB]">
                  18/10/2022
                </td>
                <td className="py-4 px-4 text-3xl">
                  <div className=" flex justify-center ">
                    <div className="mr-[5%] text-center p-4 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center">
                      <FaFileExport />
                    </div>
                    <div className="text-[#8392AB] p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center">
                      <FaFileImport />
                    </div>
                    <div className="flex ml-[5%] mr-[3%] p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg">
                      <i className="text-[#8392AB] mr-[2%] mt-[4%]">
                        <AiFillEye />
                      </i>
                      <h6 className="text-[#8392AB]">Widget</h6>
                    </div>
                    <div className="flex ml-[2%]  shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg">
                      <i className="text-[#8392AB] mr-[2%] mt-[4%]">
                        <MdDelete />
                      </i>
                      <h6 className="text-[#8392AB]">Clear </h6>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FAQs;
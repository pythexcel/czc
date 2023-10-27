import { FiRefreshCcw } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";

const AuditLog = () => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <p className="font-bold text-[#344767] text-2xl">Audit Logs</p>
         
            <form className="w-[10%] mt-4">
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
          className="bg-[#0F45F5] text-white font-semibold items-center p-2 rounded-lg flex gap-2"
            onClick={() => {}}
          >
            <i className="text-slate-50 text-xl">
              <FiRefreshCcw />
            </i>
              Refresh Logs
          </button>
        </div>
        <div className="w-full mt-6 bg-slate-50 shadow-lg  bg-opacity-17">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-100 ">
                <th className="py-4 text-xl text-[#8392AB]">CONTACT ID</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">QUESTION</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">ANSWER</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">STATUS</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">TIMESTAMP</th>
                <th className="py-4 text-xl px-4 text-[#8392AB]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="py-4 px-4 bg-slate-50 text-2xl text-center"
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
    </>
  );
};
export default AuditLog;
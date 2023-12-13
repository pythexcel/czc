import { FiRefreshCcw } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";
import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { AiOutlineCalendar } from "react-icons/ai";
import CustomDropdown from "../Common-Component/CustomDropdown";
import { locationOptions } from "../utils";

const AuditLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dateRangePickerRef = useRef(null);

  useEffect(() => {
    const dateRangePicker = flatpickr(dateRangePickerRef.current, {
      mode: "range",
      dateFormat: "Y-m-d",
    });

    return () => {
      dateRangePicker.destroy();
    };
  }, []);

  const handleSelect = (item) => {
    setSelectedOption(item)
    setIsOpen(p => !p);
  };

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const thead = "py-2 font-normal text-[#8392AB]"

  const title = [
    "CONTACT ID",
    "QUESTION",
    "ANSWER",
    "STATUS",
    "TIMESTAMP",
    "ACTIONS"
  ]

  return (
    <div className="p-6">
      <div className="w-full flex justify-between flex-grow">
        <p className="font-bold text-[#344767] text-2xl w-[30%] ">Audit Logs</p>
        <div className="flex justify-around items-center">
          <form className="w-[20%]">
            <div className="relative mr-2">
              <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-blue-600 rounded-l-md">
                <HiSearch className="text-white w-[20px] h-[20px]" />
              </div>
              <input
                type="search"
                className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-bold"
                placeholder="Search Contact ID"
                required
              />
            </div>
          </form>
          <div className="relative ml-9 ">
            <input
              type="text"
              ref={dateRangePickerRef}
              placeholder="Select date range"
              className="flatpickr-input p-2 border rounded-lg w-[250px]"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <AiOutlineCalendar className="h-5 w-5 text-black" />
            </span>
          </div>
          <div>
            <button
              className="bg-[#0F45F5] text-white font-semibold items-center  rounded-lg flex px-6 py-2 "
              onClick={() => { }}
            >
              <i className="text-slate-50 text-lg mr-2">
                <FiRefreshCcw />
              </i>
              Refresh Logs
            </button>
          </div>
          <div className="relative">
            <CustomDropdown
              toggleIsOpen={toggleIsOpen}
              locationOptions={locationOptions}
              handleSelect={(item) => handleSelect(item)}
              selectedOption={selectedOption}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-6 bg-slate-50 shadow-lg bg-opacity-17">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F3F5FE] w-full">
              {title.map((item, index) => (
                <th key={index} className={thead}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="py-2 px-2 bg-slate-50 text-[#8392B3] text-lg text-center"
                colSpan="6"
              >
                Select a location from the filter above to display logs for the
                location.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AuditLog;

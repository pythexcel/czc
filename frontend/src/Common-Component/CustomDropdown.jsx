import { useEffect, useState } from 'react';
import InputField from '../Component/TextInput';
import { HiOutlineChevronDown } from 'react-icons/hi';
import axiosInstance from '../utils/axios';

const CustomDropdown = ({
    toggleIsOpen,
    handleSelect,
    selectedOption,
    isOpen
}) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [filterData, setFilterData] = useState([]);

    console.log(filterData,"?????????????????????")
    const [faqsPermission, setFaqsPermission] = useState("");
    const [locationOptions, setLocationOptions] = useState([]);

    console.log(locationOptions,"tjis is ")

    const handlegethighlevel = async () => {
        try {
            const resp = await axiosInstance.get("users/agency-integration/")
            if (resp.message) {
                setFaqsPermission(resp.message.id);
            }
        } catch (error) {
            console.log(error, "error of high level")
        }
    }

    useEffect(() => {
        handlegethighlevel();
    }, [])

    const handleSearchOption = (event) => {
        const dd = event.target.value;
        const filterOpt = locationOptions.filter((item) =>
            item.location_name.toLowerCase().includes(dd.toLowerCase())
        );
        setFilterData(filterOpt);
    }

    const handleFire = async() => {
        toggleIsOpen()
        try {
           const responce = await axiosInstance.get(`locations/get/${faqsPermission}/`);
           setLocationOptions(responce.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative">
            <div
                onClick={handleFire}
                className="rounded-lg border border-blue-600 appearance-none py-2 text-based focus:shadow-lg font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer px-4 justify-between w-[220px]"
            >
                {selectedOption ? selectedOption : 'Select Location'}
                <span
                    className={`absolute top-0 h-full ml-[170px] text-center font-bold pointer-events-none flex items-center justify-center duration-300 ${isOpen ? "transform rotate-180" : ""
                        }`}
                >
                    <HiOutlineChevronDown className="text-blue-500 hover:text-white font-bold" />
                </span>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-2 p-2 bg-white border border-blue-600 rounded-md shadow-lg overflow-y-scroll h-[300px]">
                    <InputField
                        type="text"
                        placeholder="Search Location"
                        onChange={handleSearchOption}
                    />
                    {filterData?.length > 0 ? (
                        filterData.map((item, id) => (
                            <div
                                className="text-start cursor-pointer hover:bg-blue-200 hover:text-blue-600"
                                key={id}
                                onClick={() => handleSelect(item)}
                            >
                                <p className='text-semibold my-1 text-sm text-gray-500'>{item.location_name}</p>
                            </div>
                        ))
                    ) : (
                        locationOptions.map((item, id) => (
                            <div
                                className="text-start cursor-pointer hover:bg-blue-200 hover:text-blue-600"
                                key={id}
                                onClick={() => handleSelect(item)}
                            >
                                <p className='text-semibold my-1 text-sm text-gray-500'>{item.location_name}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
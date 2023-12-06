import { MdCancel } from "react-icons/md";
import { FaFileExport, FaFileImport, FaPencilAlt, FaSearch } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { BsCloudPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import AddFaqs from "../Modal/AddFaqs";
import ScrapURL from "../Modal/ScrapUrl";
import ImportFAQs from "../Modal/ImportFaqs";
import axiosInstance from "../utils/axios";
import Widget from '../Common-Component/Widget';
import FileSaver from 'file-saver';
import Icons from "../Common-Component/Icons";
import { RiDeleteBin6Line } from "react-icons/ri";

const WidgetDrawer = ({ iswidgetdrawer, setIsWidgetDrawer }) => {
  const [Alldata, setAllData] = useState([])
  const [isaddfaqs, setIsAddFaqs] = useState(false);
  const [isscrapurl, setIsScrapUrl] = useState(false);
  const [isimportfaqs, setIsImportFaqs] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [ids, setIds] = useState("");

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Alldata.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayedItems = Alldata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages || totalPages === 0;

  const getQuery = async () => {
    try {
      const resp = await axiosInstance.get("frequently-asked-ques/");
      setAllData(resp.details)
    } catch (error) {
      console.log(error, "this is werror as well ")
    }
  }

  useEffect(() => {
    getQuery();
  }, [])

  const onClose = () => {
    setIds("")
    setIsAddFaqs(false);
    getQuery();
    setIsScrapUrl(false);
    setIsImportFaqs(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const heightIcon = "h-[20px] w-[20px]";

  const handleUdpate = (id) => {
    setIds(id);
    setIsAddFaqs(true)
  }

  const handleDelete = async (id) => {
    try {
      const result = await axiosInstance.delete(`frequently-asked-ques/${id}`);
      getQuery();
      console.log(result)
    } catch (error) {
      console.log(error, "delete faqs")
    }
  }

  const styleIcon = "h-[23px] w-[23px] text-gray-500";

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const body = data.map(obj => Object.values(obj).join(',')).join('\n');
    return `${header}\n${body}`;
  }

  const handleExport = async () => {
    try {
      const resp = await axiosInstance.get("download/faq/");
      const responseData = resp.data;

      const csvData = convertToCSV(responseData);

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      FileSaver.saveAs(blob, 'exported_data.csv');
      console.log(resp)
    } catch (error) {
      console.log(error, "error")
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 z-40 h-screen transition-all duration-900 shadow-lg ease-in-out ${iswidgetdrawer ? "translate-x-0" : "translate-x-full"
        } w-[50%] bg-[#F2F7FA] overflow-y-scroll`}
    >
      <div
        className="cursor-pointer flex justify-end mt-4 mr-4"
        onClick={() => setIsWidgetDrawer(false)}
      >
        <MdCancel className="text-gray-400 hover:text-[#0F45F5] font-semibold rounded-full w-[35px] h-[35px]" />
      </div>
      <div className="flex justify-center mt-3 space-x-2">
        <div
          className="cursor-pointer p-6 text-slate-50 shadow-lg px-4 py-2 bg-opacity-17 bg-[#0F45F5] rounded-lg flex justify-center items-center hover:bg-green-400"
          onClick={() => setIsAddFaqs(true)}
        >
          <MdAddCard className={heightIcon} />
          <span className="text-slate-50 text-md ml-1">
            {" "}
            Add
          </span>
        </div>

        <Widget onClick={handleExport}>
          <FaFileExport className={heightIcon} />
          <span> Export</span>
        </Widget>

        <Widget
          onClick={() => setIsImportFaqs(true)}
        >
          <FaFileImport className={heightIcon} />
          <span> Import</span>
        </Widget>

        <Widget>
          <FaSearch className={heightIcon} />
          <span> Search</span>
        </Widget>

        <Widget
          onClick={() => setIsScrapUrl(true)}
        >
          <BsCloudPlusFill className={heightIcon} />
          <span> Scrape URL</span>
        </Widget>
      </div>
      <div className="px-[130px]">
        <div>
          {!Alldata.length ? (
            <div className="bg-white px-6 py-8 mt-6 rounded-lg text-center items-center hover:text-[#0F45F5]">
              <p className="font-semibold text-xl text-[#999999] mx-auto">
                No FAQs Found
              </p>
            </div>
          ) : (
            displayedItems.map((item, index) => (
              <div key={index} className="FaqCard bg-white p-6 mt-6 rounded-lg flex flex-row justify-between shadow-md">
                <div className="mr-5">
                  <p className="font-semibold text-[#999999]">
                    Q : {item.question}
                  </p>
                  <p className="text-[#999999] break-words">
                    A :{
                      showMore === true ? (
                        <span>
                          {item.answer}
                        </span>
                      ) : (
                        <span>{item.answer.length > 174 ? `${item.answer.slice(0, 173)}...` : item.answer}</span>
                      )
                    }<br />
                    {item.answer.length > 174 && (
                      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleShowMore}>
                        {showMore ? ' Show less' : ' Show more'}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Icons
                    handleClick={() => handleUdpate(item.id)}
                    icon={<FaPencilAlt className={styleIcon} />}
                    text="EDIT"
                    textClassName="updatetext"
                    containerClassName="update"
                  />

                  <Icons
                    handleClick={() => handleDelete(item.id)}
                    icon={<RiDeleteBin6Line className={styleIcon} />}
                    text="DELETE"
                    textClassName="deletefaqtext"
                    containerClassName="deletefaq"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex mt-4 space-x-2">
          <button disabled={isPrevButtonDisabled} onClick={() => handlePageChange(currentPage - 1)} className="mr-[1%] cursor-pointer p-4 text-[#8392AB] shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex justify-center items-center hover:bg-green-400">
            <FaLessThan />
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={isNextButtonDisabled} onClick={() => handlePageChange(currentPage + 1)} className="text-[#8392AB] cursor-pointer p-4 shadow-lg px-2 py-2 bg-opacity-17 bg-[#f8fafc] rounded-lg flex items-center hover:bg-green-400">
            <FaGreaterThan />
          </button>
        </div>
      </div>
      {isaddfaqs && <AddFaqs ids={ids} onClose={onClose} />}
      {isscrapurl && <ScrapURL onClose={onClose} />}
      {isimportfaqs && <ImportFAQs onClose={onClose} />}
    </div>
  );
};

export default WidgetDrawer;
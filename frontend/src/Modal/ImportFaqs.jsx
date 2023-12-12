import { RxCross2 } from "react-icons/rx";
import { MdOutlineFileUpload } from "react-icons/md";

import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";
import { useRef, useState } from "react";
import axiosInstance from "../utils/axios";

function ImportFAQs({ onClose }) {
  const [allow, setAllow] = useState(false)
  const [csvHeaders, setCsvHeaders] = useState("");
  const [check, setCheck] = useState("No")
  const [selectedFileName, setSelectedFileName] = useState("");
  const [data, setData] = useState([]);
  console.log(data, ">>>>>>>>>>>>>>>>")

  const handleRadioChange = (event) => {
    setCsvHeaders(event.target.value);
  };
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData(selectedFile)
    console.log("Selected File:", selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const handlecheck = (event) => {
    setCheck(event.target.checked);
    setAllow(true)
  };

  const toggleValue = check ? "yes" : "no";

  const renderModal = (
    <div style={{ zIndex: "1000" }}>
      {allow && (<p>this i s nothing asd well</p>)}
    </div>
  )

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('file',data)
    formData.append('delete_exiting_faq',toggleValue)

    try {
      const resp = await axiosInstance.post(`frequently-asked-ques/import/`, formData)
      console.log(selectedFileName, "dskjbxdkjbv")
      console.log(resp,"i am responce of import ===>")
    } catch (error) {
      console.log(error, "i am error")
    }
  }

  return (
    <div>
      {renderModal}
      <ModalShadow onClose={onClose}>
        <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto  w-[400px] z-20">
          <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl ">
            <h3 className="text-xl font-bold text-white">Import FAQs</h3>
            <button
              type="button"
              className="bg-transparent text-white font-bold text-xl rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center "
              data-modal-hide="static-modal"
            >
              <RxCross2 onClick={onClose} />
            </button>
          </div>
          <div className="p-6 space-y-6 bg-white">
            <div>
              <p className="text-[#999999] font-semibold flex justify-center">
                Does Your CSV Contains Headers?
              </p>
              <div className="flex justify-center mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 cursor-pointer"
                    name="csvHeaders"
                    value="yes"
                    checked={csvHeaders === "yes"}
                    onChange={handleRadioChange}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600 cursor-pointer"
                    name="csvHeaders"
                    value="no"
                    checked={csvHeaders === "no"}
                    onChange={handleRadioChange}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {csvHeaders === "yes" && (
                <>
                  <div
                    className="p-6 flex justify-center border border-dotted border-black mt-4 cursor-pointer"
                    onClick={handleFileClick}
                  >
                    <div>
                      <MdOutlineFileUpload className="text-[#B5B5B5] mx-auto" />

                      {selectedFileName ? (
                        <p className="text-[#B5B5B5] font-semibold w-[150px] text-center">
                          {selectedFileName}
                        </p>
                      ) : (
                        <p className="text-[#B5B5B5] font-semibold w-[150px] text-center">
                          Choose a CSV file or drag it here
                        </p>
                      )}

                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>

                  </div>
                  <label className="mt-2 text-[#445573]">
                    <input type="checkbox" onChange={handlecheck} className="mr-2" />
                    Delete Existing Faqs
                  </label>
                </>
              )}

              {csvHeaders === "no" && (
                <div className="bg-[#F53A40] p-3 rounded-lg mt-4">
                  <p className="text-white">
                    All Uploads require a Header Row - Please Add a Header Row to
                    Your CSV
                  </p>
                </div>
              )}

              <div className="flex justify-center  p-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
                <CustomButton type="button" onClick={onClose} text="Close">
                  Close
                </CustomButton>
                <button
                  type="button"
                  className="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 text-white bg-blue-600"
                  onClick={handleSubmit}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalShadow>
    </div>
  );
}

export default ImportFAQs;

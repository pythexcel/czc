import { RxCross2 } from "react-icons/rx";
import ModalPara from "../Component/ModalPara";
import CustomButton from "../Common-Component/CustomButton";
import ModalShadow from "../Common-Component/ModalShadow";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import Spinner from '../Component/Spinner';

function AddFaqs({ onClose, ids, getQuery, setResSuccess, setResFailed }) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const widgetsids = localStorage.getItem('userId');

  const handleAddQuestion = async () => {
    setLoading(true)
    try {
      const resp = await axiosInstance.post("frequently-asked-ques/", {
        location: widgetsids,
        question: question,
        answer: answer,
      });
      setResSuccess(true)
      setTimeout(() => {
        setResSuccess(false)
      }, 4000)
      getQuery(widgetsids);
      onClose();
      console.log(resp);
    } catch (error) {
      setResFailed(true)
      setLoading(false)
      console.log(error);
    }
  };

  const handleUdpate = async () => {
    setLoading(true)
    try {
      const result = await axiosInstance.patch(`frequently-asked-ques/${widgetsids}/${ids}/`, {
        question: question,
        answer: answer
      })
      setUpdate(false)
      getQuery(widgetsids);
      onClose();
      console.log(result);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getUpdateData = async (ids) => {
    setUpdate(true)
    try {
      const resp = await axiosInstance.get(`frequently-asked-ques/${widgetsids}/${ids}/`)
      const forUpdate = resp.details[0]
      console.log(forUpdate)
      setAnswer(forUpdate.answer)
      setQuestion(forUpdate.question)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof ids === 'number') {
      getUpdateData(ids);
    }
  }, [ids])

  return (
    <ModalShadow onClose={onClose}>
      <div className="SlideModal relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto  w-[400px] z-50">
        <div className="flex items-start bg-[#0F45F5] justify-between p-4 rounded-t-xl ">
          <h3 className="text-xl font-bold text-white">
            {!update ? "Add FAQs" : "Update FAQs"}
          </h3>
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
            <ModalPara>Question</ModalPara>
            <textarea
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Question"
            />
          </div>
          <div>
            <ModalPara>Answer</ModalPara>
            <textarea
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Answer"
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-end p-6 space-x-2 rounded-b-lg dark:border-gray-600 bg-white">
          <CustomButton type="button" onClick={onClose} text="Close">
            Close
          </CustomButton>
          {update == true ? <button
            onClick={handleUdpate}
            type="button"
            className="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 text-white bg-[#0445F5]"
          >{loading ? <div className="flex">{`updating...`} <Spinner /></div> : "Update"}
          </button> : <button
            onClick={handleAddQuestion}
            type="button"
            className="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 text-white bg-[#0445F5]"
          >{loading ? <div className="flex">{`Adding...`} <Spinner /></div> : "Add"}
          </button>}
        </div>
      </div>
    </ModalShadow>
  );
}

export default AddFaqs;

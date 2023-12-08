import { useEffect } from "react";
import BotCard from "../Component/BotCard";
import BookingCard from "../Component/BookingCard";
import { useState } from "react";
import DetailsModal from "../Modal/DetailsModal";
import CloneBot from "../Modal/CloneBot";
import IsDelete from "../Modal/IsDelete";
import Deleted from "../Modal/Deleted";
import ToastSuccess from "../Modal/ToastSuccess";
import axiosInstance from "../utils/axios";
import ToastFailed from "../Modal/ToastFailed";
import SearchBar from "../Common-Component/SearchBar";
import SearchIcons from "../Common-Component/SearchIcons";
import { useNavigate } from "react-router-dom";
import { selectFlag } from "../Store/slice/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFlag } from "../Store/slice/flagSlice";

function Bots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flag = useSelector(selectFlag);

  const [deleteSuccess, setDeletedSuccess] = useState(false);
  const [successClone, setSuccessClone] = useState(false);
  const [toastFailed, setToastFailed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteBot, setDeleteBot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Clone, setClone] = useState(false);

  const [clonedBotName, setClonedBotName] = useState("");
  const [cnfDeleteBot, setCnfDeleteBot] = useState("");
  const [idforclone, setIdforclone] = useState("");
  const [botdetails, setBotdetails] = useState([]);
  const [bot, setBot] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllBots = async () => {
    dispatch(setFlag(false));
    try {
      const response = await axiosInstance.get("bot");
      setBot(response.details);
    } catch (error) {
      console.error("Error during get all data", error);
    }
  };

  useEffect(() => {
    getAllBots();
  }, []);

  if (flag === true) {
    getAllBots();
  }

  const handcloseModal = () => {
    setOpenModal(false);
  };

  const handleCopy = (id) => {
    const cloneforId = id;
    setClone(true);
    setIdforclone(cloneforId);
  };

  const handleCloseCloneBot = () => {   
    setClone(false);
  };

  const handleSuccess = async () => {
    setIsLoading(true);
    try {
      const Cloneresponce = await axiosInstance.post(`bot/clone/`, {
        bot_name: clonedBotName,
        id: idforclone,
      });
      console.log(Cloneresponce);
      setIsLoading(false);
      setClone(false);
      getAllBots();
      setSuccessClone(true);
    } catch (error) {
      setToastFailed(true);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/updatebot?id=${id}`);
  };

  const handleDeleted = () => {
    setDeleteBot(false);
    setDeletedSuccess(false);
  };

  const handleCloseFailed = () => {
    setToastFailed(false);
  };

  const handleCloseSuccess = () => {
    setSuccessClone(false);
  };

  setTimeout(() => {
    setSuccessClone(false);
  }, [2 * 10000]);

  const handleSuccessfullyDelete = () => {
    setDeletedSuccess(false);
    handleDeleted();
    getAllBots();
  };

  const handleDelete = (id) => {
    const botid = id;
    setCnfDeleteBot(botid);
    setDeleteBot(true);
  };

  const handleDeleteBot = async () => {
    try {
      await axiosInstance.delete(`bot/${cnfDeleteBot}`);
      setDeleteBot(true);
      setDeletedSuccess(true);
      getAllBots()
    } catch (error) {
      console.error("Error deleting bot:", error);
    }
  };

  const handleDetails = async (id) => {
    try {
      const resp = await axiosInstance.get(`bot/${id}`);
      setBotdetails(resp.details);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderModals = (
    <div>
      {openModal && (
        <DetailsModal onClose={handcloseModal} botdetails={botdetails} />
      )}
      {Clone && (
        <CloneBot
          onClose={handleCloseCloneBot}
          handleSuccess={handleSuccess}
          isLoading={isLoading}
          onInputChange={(value) => setClonedBotName(value)}
        />
      )}
      {deleteBot && (
        <IsDelete onClose={handleDeleted} handleDeleteBot={handleDeleteBot} />
      )}
      {deleteSuccess && <Deleted onClose={handleSuccessfullyDelete} />}
    </div>
  );

  const Alltoast = (
    <div>
      {successClone && (
        <ToastSuccess
          title="Success"
          message="Duplicated bot created"
          onClose={handleCloseSuccess}
        />
      )}
      {toastFailed && (
        <ToastFailed
          title="Error"
          message="An error occured"
          onClose={handleCloseFailed}
        />
      )}
    </div>
  );

  const handleSearchInputChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      {renderModals}
      <div className="relative text-center font-bold text-red-500">
        <section className="text-gray-600 body-font">
          <form className="w-[90%] sm:w-[30%] mt-4">
            <div className="relative">
              <SearchIcons />
              <SearchBar
                type="search"
                name="search"
                placeholder="Type and Press Enter"
                value={searchTerm}
                onChange={(e) => handleSearchInputChange(e.target.value)}
              />
            </div>
          </form>

          <div className="my-4 flex flex-wrap gap-4">
            <BotCard />
            {bot.map((item, index) => (
              <BookingCard
                key={index}
                handleCopy={(id) => handleCopy(id)}
                handleEdit={(id) => handleEdit(id)}
                handleDelete={(id) => handleDelete(id)}
                handleDetails={(id) => handleDetails(id)}
                userData={item}
              />
            ))}
          </div>
        </section>
        {Alltoast}
      </div>
    </div>
  );
}

export default Bots;

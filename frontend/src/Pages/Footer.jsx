import { useNavigate } from "react-router-dom"


function Footer() {
  const navigate = useNavigate()

  const handleOpenTandC = () => {
    navigate('/dashboard/termCondition')
  }


  return (
    <div className="w-full bg-[#F8F9FA] flex justify-between h-[60px] px-5 items-center">
        <p className="text-md text-gray-400">Copyright © 2023 ZappyChat</p>
        <p onClick={handleOpenTandC} className="text-md text-gray-400 cursor-pointer">Term and Conditions</p>
    </div>
  )
}

export default Footer
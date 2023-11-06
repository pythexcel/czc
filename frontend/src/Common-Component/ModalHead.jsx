
function ModalHead({ children }) {
  return (
    <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
      <div className="relative w-full max-w-2xl max-h-full m-auto">
        <div className="relative bg-white rounded-xl shadow-lg dark:bg-gray-700 mx-auto mt-[30%] w-[500px] z-50">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalHead

const CustomButton = ({ onClick, text, className }) => {
  return (
    <button 
      type="button" 
      className={`text-white bg-[#0f45f5] font-medium rounded-lg text-sm px-7 py-2 text-center hover:bg-red-700 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;

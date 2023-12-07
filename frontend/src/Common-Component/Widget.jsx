function Widget({ children, onClick, className }) {

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 text-[#0F45F5] shadow-lg px-5 py-3 bg-opacity-17 bg-slate-50 rounded-lg flex justify-center items-center border border-blue-500 hover:bg-[#0F45F5] hover:text-slate-50 space-x-2 font-medium ${className}`}>
      {children}
    </div>
  );
}

export default Widget;

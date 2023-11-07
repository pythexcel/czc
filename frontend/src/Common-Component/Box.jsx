
function Box({children}) {
  return (
    <div className="w-[530px] h-[200px] border-2 border-gray-300 rounded-lg bg-white shadow-md flex flex-col justify-between">{children}</div>
  )
}

export default Box;
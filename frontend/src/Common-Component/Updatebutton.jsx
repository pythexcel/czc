

function Updatebutton({type, onClick, isLoading}) {
  return (
    <button onClick={onClick} type={type} className="rounded-md bg-blue-600 text-white px-14 font-semibold py-2 text-md hover:bg-green-400">{isLoading=== true ? "Updating..." : "Update" }</button>
  )
}

export default Updatebutton
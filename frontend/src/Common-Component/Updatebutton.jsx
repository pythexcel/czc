

function Updatebutton({type, handleSubmitForUpdate}) {
  return (
    <button onClick={handleSubmitForUpdate} type={type} className="rounded-md bg-blue-600 text-white px-14 font-semibold py-2 text-md hover:bg-green-400">Update</button>
  )
}

export default Updatebutton
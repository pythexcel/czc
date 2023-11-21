

function TextBox({children}) {
  return (
    <div className="mx-auto flex">
      <div className="w-full bg-white rounded-lg px-6 pt-6 pb-20 flex flex-col md:ml-auto mt-10 md:mt-0 relative z-10 shadow-md break-words">{children}</div>
    </div>
  )
}

export default TextBox;
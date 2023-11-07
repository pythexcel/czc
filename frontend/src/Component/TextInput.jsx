


function TextInput({ type,name, placeholder, ...props }) {
  return (
        <input type={type} name={name}
        className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:shadow-lg w-full" 
        placeholder={placeholder}
        {...props}/>
  )
}

export default TextInput
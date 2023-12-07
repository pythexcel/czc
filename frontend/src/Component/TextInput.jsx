


function TextInput({ type,name,onChange, placeholder,value, ...props }) {
  return (
        <input type={type} name={name} onChange={onChange} value={value}
        className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:shadow-lg w-full" 
        placeholder={placeholder}
        {...props}/>
  )
}

export default TextInput;



function TextInput({ type,name,onChange,id, placeholder,value, ...props }) {
  return (
        <input type={type} id={id} name={name} onChange={onChange} value={value}
        className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:shadow-lg w-full" 
        placeholder={placeholder}
        {...props}/>
  )
}

export default TextInput;
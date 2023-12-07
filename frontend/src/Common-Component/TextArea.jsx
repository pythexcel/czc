

function TextArea({ type, name, value,placeholder, onChange, ...props }) {
    return (
        <textarea onChange={onChange} type={type} name={name} value={value} className=" bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-[100px] text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out w-full focus:shadow-lg" placeholder={placeholder} {...props}/>
        
    )
}

export default TextArea
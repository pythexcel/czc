

function DropDown({ children,value,name, id, ...props }) {
    return (
      <select 
        value={value}
        name={name}
        id={id}
        className="rounded-lg border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 focus:shadow-lg w-full"
        {...props}
      >
        {children}
      </select>
    );
  }
  
  export default DropDown;
  
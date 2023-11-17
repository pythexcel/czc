

function SearchBar({ type, name, placeholder, ...props }) {
    return (
        <input
            type={type}
            name={name}
            className="block w-full p-2 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder font-semibold focus:shadow-md"
            placeholder={placeholder}
            {...props} required
        />
    )
}

export default SearchBar;
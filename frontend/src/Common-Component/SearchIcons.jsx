import { HiSearch } from "react-icons/hi"


function SearchIcons() {
    return (
        <div className="absolute inset-y-0 left-0 flex items-center px-3 focus:shadow-md pointer-events-none bg-blue-600 rounded-l-md">
            <HiSearch className='text-white w-[20px] h-[20px]' />
        </div>
    )
}

export default SearchIcons


function Selector({children}) {
    return (
        <select className="rounded-lg border border-blue-600 appearance-none py-2 text-base justify-center focus:shadow-lg pl-5 pr-8 text-center font-semibold text-blue-600 focus:outline-none focus:border-blue-500 hover:bg-[#0F45F5] hover:text-white cursor-pointer">{children}</select>
    )
}

export default Selector
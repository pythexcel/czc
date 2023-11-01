

function ToggleSwitch() {
    return (
        <div className="flex w-[200px] items-center gap-2">
            <label className="text-gray-600 text-sm font-bold">Allow Overwrite</label>
            <input type="checkbox" className="relative w-[2.70rem] h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:shadow-lg ring-offset-white focus:outline-none appearance-none dark:bg-gray-200 dark:checked:bg-blue-600 focus:ring-offset-white
            before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:white dark:checked:before:bg-blue-200"/>
        </div>
    )
}

export default ToggleSwitch
import Spinner from "./Spinner"

function LoadingButton({type, isLoading }) {
    return (
        <button type={type} className="rounded-md bg-blue-600 text-white px-14 font-semibold py-2 text-md hover:bg-green-400">{isLoading ? (
            <p className="text-white flex font-bold items-center">Adding... <Spinner className="border-white" /></p>
        ) : (
            <span>Add</span>
        )}</button>
    )
}

export default LoadingButton
import Spinner from "../Component/Spinner"

function AddButton({ handleSuccess, isLoading }) {
    return (
        <button
            onClick={handleSuccess}
            type="button"
            className="focus:outline-none rounded-lg text-sm font-medium px-8 py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002]"
        >
        {isLoading ? 
            (<p className="text-white flex font-bold items-center">Updating... <Spinner className="border-white" /></p>
        ) : (
            <span>Add</span>
        )}
        </button>
    )
}

export default AddButton
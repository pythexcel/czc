
function AddButton({handleSuccess}) {
    return (
        <button
            onClick={handleSuccess}
            type="button"
            className="focus:outline-none rounded-lg text-sm font-medium w-[150px] py-2.5 text-white bg-[#2dce89] hover:bg-[#02E002]"
        >
            Add
        </button>
    )
}

export default AddButton
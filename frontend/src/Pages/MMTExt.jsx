

function MMTExt({onClose}) {
    return (
        <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full`}>
            <div className="relative w-full max-w-2xl max-h-full m-auto">
                <div className="relative h-screen">
                    <div className="absolute inset-0 delay-150 ease-in-out flex justify-center items-center">
                        <div className="bg-gray-200 p-4" style={{ height: 'calc(100% - 150px)' }}>
                            <p className="text-center">Modal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MMTExt
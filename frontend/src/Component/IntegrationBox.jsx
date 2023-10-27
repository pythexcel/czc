
function IntegrationBox({Boxes}) {
    
    return (
        <div className="lg:w-1/3 sm:w-1/2 p-4">
            <div className='border border-slate-500 rounded-lg w-full h-[180px] flex  flex-col justify-between'>
                {Boxes}
            </div>
        </div>
    )
}

export default IntegrationBox
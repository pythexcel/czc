import { children } from "react";


function ModalShadow({children, onClose, className}) {
    return (
        <div className={`fixed top-0 object-cover bg-black bg-opacity-50 left-0 right-0 z-10 ${onClose ? 'block' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full ${className}`}>
            <div className="relative w-full max-w-2xl max-h-full m-auto">
            {children}
            </div>
        </div>
    )
}

export default ModalShadow
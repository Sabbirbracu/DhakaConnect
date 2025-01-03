import React from 'react';
import '../styles/global.css';
// It is lucide icon for close icon
import { X } from 'lucide-react';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="subpixel-antialiased flex flex-col mt-5 gap-5">
                <button className='text-blue-500 bg-slate-50 rounded-tl-lg rounded-br-lg place-self-end -mr-9' onClick={onClose}>
                    <X size={30}/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

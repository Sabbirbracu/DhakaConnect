import React, {useState} from 'react';
import '../styles/global.css';
// It is lucide icon for close icon
import { X } from 'lucide-react';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col mt-5 gap-5">
                <button className='place-self-end' onClick={onClose}>
                    <X size={30}/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

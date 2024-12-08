import React, {useState} from 'react';
import '../styles/global.css';
// It is lucide icon for close icon
import { X } from 'lucide-react';


// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//                 <button
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </button>
//                 {children}
//             </div>
//         </div>
//     );
// };

function Modal() {

    return(
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
                Not have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                    Register here
                </a>
            </p>
        </div>
    )
}

export default Modal;

import React from 'react';
import '../styles/global.css';


const Button = ({ text, onClick, className = '' }) => {
    return (
        <button
            className={`btn-primary ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;

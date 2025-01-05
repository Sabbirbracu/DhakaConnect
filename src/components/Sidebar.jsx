import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-blue-800 text-white h-full p-4">
            <h2 className="text-xl font-bold mb-6">My Dashboard</h2>
            <ul>
                <li className="mb-4">
                    <Link to="/dashboard/profile" className="hover:text-gray-300">Profile</Link>
                </li>
                <li className="mb-4">
                    <Link to="/dashboard/settings" className="hover:text-gray-300">Settings</Link>
                </li>
                <li className="mb-4">
                    <Link to="/dashboard/reports" className="hover:text-gray-300">Reports</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

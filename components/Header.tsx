
import React from 'react';
import SynapseIcon from './icons/SynapseIcon';

const Header: React.FC = () => {
    return (
        <header className="flex-shrink-0 bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between shadow-lg z-10">
            <div className="flex items-center gap-4">
                <SynapseIcon />
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                    Synapse IDE
                </h1>
            </div>
            <div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-md text-sm transition-colors">
                    Publish
                </button>
            </div>
        </header>
    );
};

export default Header;


import React from 'react';

const Terminal: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg flex flex-col overflow-hidden ring-1 ring-gray-700/50">
            <div className="bg-black/20 p-2 flex-shrink-0 border-b border-gray-700">
                <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Terminal</h2>
            </div>
            <div className="w-full h-full p-2 font-mono text-xs text-gray-300 overflow-auto">
                <p>&gt; Node.js environment will run here...</p>
                <p>&gt; Ready for commands.</p>
            </div>
        </div>
    );
};

export default Terminal;

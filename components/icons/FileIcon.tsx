
import React from 'react';

interface FileIconProps {
  active?: boolean;
}

const FileIcon: React.FC<FileIconProps> = ({ active = false }) => (
    <svg className={`w-4 h-4 ${active ? 'text-indigo-300' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path>
    </svg>
);

export default FileIcon;

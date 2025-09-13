import React, { useState, useMemo } from 'react';
import { GitStatus } from '../types';
import GitIcon from './icons/GitIcon';
import DiffEditor from './DiffEditor';
import { getOriginalFileContent, getModifiedFileContent } from '../utils/git';

interface GitPanelProps {
  status: GitStatus;
}

const GitPanel: React.FC<GitPanelProps> = ({ status }) => {
    const allFiles = useMemo(() => [...status.staged, ...status.unstaged, ...status.untracked], [status]);
    const [selectedFile, setSelectedFile] = useState<string | null>(allFiles[0] || null);

    const getLanguage = (filePath: string) => {
        const extension = filePath.split('.').pop();
        switch (extension) {
            case 'js':
            case 'jsx':
                return 'javascript';
            case 'ts':
            case 'tsx':
                return 'typescript';
            case 'css':
                return 'css';
            case 'json':
                return 'json';
            default:
                return 'plaintext';
        }
    };

    const renderFileList = (files: string[], title: string) => (
        <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2 px-1">{title} ({files.length})</h3>
            <ul className="space-y-1">
                {files.map(file => (
                    <li key={file} 
                        onClick={() => setSelectedFile(file)}
                        className={`text-sm p-1 rounded cursor-pointer truncate ${selectedFile === file ? 'bg-indigo-900/50 text-indigo-300' : 'hover:bg-gray-700/50 text-gray-300'}`}>
                        {file}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="bg-gray-800 rounded-lg flex flex-col ring-1 ring-gray-700/50 h-full overflow-hidden">
            <div className="p-3 flex-shrink-0 border-b border-gray-700 flex items-center gap-2">
                <GitIcon />
                <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Version Control</h2>
            </div>
            <div className="flex-grow p-2 flex flex-col gap-4 overflow-hidden">
                <div className="flex-shrink-0 space-y-4 overflow-y-auto p-1 max-h-[40%]">
                    {status.staged.length > 0 && renderFileList(status.staged, 'Staged Changes')}
                    {status.unstaged.length > 0 && renderFileList(status.unstaged, 'Changes')}
                    {status.untracked.length > 0 && renderFileList(status.untracked, 'Untracked Files')}
                </div>
                <div className="flex-grow bg-gray-900/50 rounded min-h-0">
                    {selectedFile ? (
                        <DiffEditor 
                            original={getOriginalFileContent(selectedFile)}
                            modified={getModifiedFileContent(selectedFile)}
                            language={getLanguage(selectedFile)}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            Select a file to see changes
                        </div>
                    )}
                </div>
            </div>
             <div className="p-3 border-t border-gray-700 flex-shrink-0">
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                  disabled={status.staged.length === 0}
                >
                    Commit {status.staged.length} file(s)
                </button>
            </div>
        </div>
    );
};

export default GitPanel;
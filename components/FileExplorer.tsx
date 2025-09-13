
import React from 'react';
import { type FileSystemNode } from '../types';
import FolderIcon from './icons/FolderIcon';
import FileIcon from './icons/FileIcon';

interface FileExplorerProps {
  nodes: FileSystemNode[];
  activePath: string;
  onFileSelect: (path: string) => void;
}

const FileNode: React.FC<{ node: FileSystemNode; level: number; activePath: string; onFileSelect: (path: string) => void }> = ({ node, level, activePath, onFileSelect }) => {
    const isActive = node.path === activePath;
    const paddingLeft = `${level * 1.5}rem`; // 24px per level

    if (node.type === 'directory') {
        return (
            <li>
                <span style={{ paddingLeft }} className="flex items-center gap-2 font-semibold text-gray-300">
                    <FolderIcon />
                    {node.name}
                </span>
                <ul className="mt-1 space-y-1 border-l border-gray-700">
                    {node.children.map(child => (
                        <FileNode key={child.path} node={child} level={level + 1} activePath={activePath} onFileSelect={onFileSelect} />
                    ))}
                </ul>
            </li>
        );
    }
    
    // It's a file
    const fileClasses = `flex items-center gap-2 cursor-pointer rounded -ml-1 p-1 ${isActive ? 'bg-indigo-900/50' : 'hover:bg-gray-700/50'}`;
    const textClasses = `truncate ${isActive ? 'font-bold text-indigo-300' : 'text-gray-300'}`;

    return (
        <li style={{ paddingLeft }} className={fileClasses} onClick={() => onFileSelect(node.path)}>
            <FileIcon active={isActive} />
            <span className={textClasses}>{node.name}</span>
        </li>
    );
}

const FileExplorer: React.FC<FileExplorerProps> = ({ nodes, activePath, onFileSelect }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-3 flex flex-col ring-1 ring-gray-700/50 overflow-auto">
            <h2 className="text-xs font-bold mb-3 text-gray-400 tracking-wider uppercase flex-shrink-0">
                Project Files
            </h2>
            <ul className="space-y-2 text-sm">
                 {nodes.map(node => (
                    <FileNode key={node.path} node={node} level={0} activePath={activePath} onFileSelect={onFileSelect} />
                ))}
            </ul>
        </div>
    );
};

export default FileExplorer;

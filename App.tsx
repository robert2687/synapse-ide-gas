// Fix: Provide content for App.tsx to create a functional main component and resolve module errors.
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import Preview from './components/Preview';
import AIAssistant from './components/AIAssistant';
import GitPanel from './components/GitPanel';
import { INITIAL_FILESYSTEM } from './constants';
import { findFile, updateFileContent as updateFileInFS } from './utils/fileSystem';
import { FileSystemNode, GitStatus } from './types';
import { getGitStatus } from './utils/git';

function App() {
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>(INITIAL_FILESYSTEM);
  const [activeFilePath, setActiveFilePath] = useState('src/App.tsx');
  const [gitStatus] = useState<GitStatus>(getGitStatus());

  const activeFile = useMemo(() => findFile(fileSystem, activeFilePath), [fileSystem, activeFilePath]);

  const handleFileSelect = (path: string) => {
    const node = findFile(fileSystem, path);
    if(node && node.type === 'file') {
      setActiveFilePath(path);
    }
  };

  const handleFileChange = (newContent: string) => {
    if (activeFile) {
      setFileSystem(updateFileInFS(fileSystem, activeFile.path, newContent));
    }
  };

  const cssFile = findFile(fileSystem, 'src/index.css');
  const jsFile = findFile(fileSystem, 'src/App.tsx');

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow p-4 grid grid-cols-12 gap-4 overflow-hidden">
        
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <FileExplorer nodes={fileSystem} activePath={activeFilePath} onFileSelect={handleFileSelect} />
          <GitPanel status={gitStatus} />
        </div>

        {/* Middle Column */}
        <div className="col-span-5 flex flex-col gap-4">
            <Editor 
              filePath={activeFile?.path || ''}
              value={activeFile?.content || 'Select a file to begin.'}
              onChange={handleFileChange}
            />
        </div>

        {/* Right Column */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="h-1/2">
            <AIAssistant />
          </div>
          <div className="h-1/2">
            <Preview 
              cssContent={cssFile?.content || ''}
              jsContent={jsFile?.content || ''}
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;

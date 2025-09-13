import { GitStatus } from '../types';
import { INITIAL_FILESYSTEM } from '../constants';

// For this simulation, we'll hardcode the "original" state.
// In a real app, this would come from the last commit.
const originalContent: Record<string, string> = {
    'src/App.tsx': `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, Synapse!</h1>
      <p className="mt-2">You clicked {count} times</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Click me
      </button>
    </div>
  );
}

export default App;
`,
    'src/index.css': `/* Welcome to Synapse IDE! */
/* You can style your preview here. */
body {
  font-family: sans-serif;
  background-color: #f0f2f5;
}
`,
};

// We will consider the current state in the VFS as the "modified" content.
// This is a simplified example; a real implementation would be more complex.
const modifiedContent: Record<string, string> = {
    'src/App.tsx': `import React, { useState } from 'react';

// A new comment to show a change
function App() {
  const [count, setCount] = useState(5); // Start count at 5

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-indigo-500">Welcome to Synapse!</h1>
      <p className="mt-4 text-lg">You have clicked the button {count} times</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
      >
        Increment Counter
      </button>
    </div>
  );
}

export default App;
`,
    'src/index.css': `/* Welcome to Synapse IDE! */
/* You can style your preview here. */
body {
  font-family: sans-serif;
  background-color: #111827; /* Darker background */
  color: #e5e7eb; /* Lighter text for dark mode */
}
`,
};

export function getGitStatus(): GitStatus {
    // Mock status for demonstration
    return {
        staged: ['src/App.tsx'],
        unstaged: ['src/index.css'],
        untracked: [],
    };
}

export function getOriginalFileContent(filePath: string): string {
    return originalContent[filePath] || '';
}

export function getModifiedFileContent(filePath: string): string {
    // In a real app, you'd get this from the live file system state.
    // Here we use our mock 'modified' object.
    const file = INITIAL_FILESYSTEM.find(f => f.path === filePath) || 
                 INITIAL_FILESYSTEM.flatMap(d => (d.type === 'directory' ? d.children : [])).find(f => f.path === filePath);

    if (file && file.type === 'file') {
        // For the sake of demo, we'll return the hardcoded modified content for changed files.
        return modifiedContent[filePath] || file.content;
    }
    return '';
}
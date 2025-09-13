
import { type FileSystemNode } from './types';

const sampleReactCode = `import React, { useState } from 'react';

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
`;

const sampleCssCode = `/* Welcome to Synapse IDE! */
/* You can style your preview here. */
body {
  font-family: sans-serif;
  background-color: #f0f2f5;
}
`;

const samplePackageJson = `{
  "name": "synapse-project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
`;

const sampleTailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

export const INITIAL_FILESYSTEM: FileSystemNode[] = [
  {
    type: 'directory',
    name: 'src',
    path: 'src',
    children: [
      {
        type: 'directory',
        name: 'components',
        path: 'src/components',
        children: []
      },
      {
        type: 'file',
        name: 'App.tsx',
        path: 'src/App.tsx',
        content: sampleReactCode
      },
      {
        type: 'file',
        name: 'index.css',
        path: 'src/index.css',
        content: sampleCssCode
      }
    ]
  },
  {
    type: 'file',
    name: 'package.json',
    path: 'package.json',
    content: samplePackageJson
  },
  {
    type: 'file',
    name: 'tailwind.config.js',
    path: 'tailwind.config.js',
    content: sampleTailwindConfig
  }
];

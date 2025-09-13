
import React, { useMemo } from 'react';

interface PreviewProps {
  cssContent: string;
  jsContent: string;
}

const Preview: React.FC<PreviewProps> = ({ cssContent, jsContent }) => {

  const srcDoc = useMemo(() => {
    // This is a very simplified bundler. It uses Babel standalone to transpile JSX.
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Preview</title>
          <style>
            body { margin: 0; }
            ${cssContent}
          </style>
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              // Polyfill for process.env which might be used in some libraries
              var process = { env: { NODE_ENV: 'development' } };
              
              // We need to simulate module imports for the App component
              const exports = {};
              const module = { exports };

              (function(module, exports, React, ReactDOM) {
                ${jsContent.replace(/export default/, 'module.exports =')}
              })(module, exports, React, ReactDOM);

              const App = module.exports;

              const container = document.getElementById('root');
              const root = ReactDOM.createRoot(container);
              root.render(<App />);

            } catch (err) {
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color: red; padding: 1rem;"><h3>Runtime Error</h3><pre>' + err.message + '</pre></div>';
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
  }, [cssContent, jsContent]);

  return (
    <div className="bg-gray-800 rounded-lg flex-grow flex flex-col overflow-hidden ring-1 ring-gray-700/50">
        <div className="bg-black/20 p-2 flex-shrink-0 border-b border-gray-700">
            <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Live Preview</h2>
        </div>
        <div className="flex-grow p-2">
            <iframe 
              srcDoc={srcDoc} 
              className="w-full h-full bg-white rounded-md" 
              title="Live Preview"
              sandbox="allow-scripts"
            ></iframe>
        </div>
    </div>
  );
};

export default Preview;

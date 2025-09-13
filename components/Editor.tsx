
import React, { useRef, useEffect } from 'react';

// Define window properties to avoid TS errors for globally loaded scripts
declare global {
  interface Window {
    require: any;
    monaco: any;
  }
}

interface EditorProps {
  filePath: string;
  value: string;
  onChange: (newValue: string) => void;
}

const Editor: React.FC<EditorProps> = ({ filePath, value, onChange }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (editorContainerRef.current && !editorRef.current) {
      window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' }});
      window.require(['vs/editor/editor.main'], () => {
        const editor = window.monaco.editor.create(editorContainerRef.current!, {
          value: value,
          language: 'javascript', // Initial language, will be updated by another effect
          theme: 'vs-dark',
          automaticLayout: true,
          fontSize: 14,
          minimap: { enabled: true },
          wordWrap: 'on',
          padding: { top: 16 }
        });
        editorRef.current = editor;
        
        subscriptionRef.current = editor.onDidChangeModelContent(() => {
          const currentValue = editor.getValue();
          // To prevent infinite loops, check if content is actually different
          if (currentValue !== value) {
              onChange(currentValue);
          }
        });
      });
    }

    return () => {
      if (editorRef.current) {
        subscriptionRef.current?.dispose();
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to update editor content when the active file changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
        editorRef.current.setValue(value);
    }
  }, [value]);

  // Effect to update editor language based on file path
  useEffect(() => {
    if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (!model) return;
        
        let language = 'plaintext';
        const extension = filePath.split('.').pop();

        switch (extension) {
            case 'js':
            case 'jsx':
                language = 'javascript';
                break;
            case 'ts':
            case 'tsx':
                language = 'typescript';
                break;
            case 'css':
                language = 'css';
                break;
            case 'json':
                language = 'json';
                break;
            case 'html':
                language = 'html';
                break;
        }
        
        window.monaco.editor.setModelLanguage(model, language);
    }
  }, [filePath]);

  return (
    <div className="col-span-12 md:col-span-9 lg:col-span-6 bg-gray-800 rounded-lg overflow-hidden flex flex-col ring-1 ring-gray-700/50">
        <div className="bg-black/20 p-2 flex-shrink-0 border-b border-gray-700">
            <span className="bg-gray-700 text-gray-200 text-sm py-1 px-3 rounded-md">{filePath}</span>
        </div>
        <div ref={editorContainerRef} className="flex-grow w-full h-full"></div>
    </div>
  );
};

export default Editor;

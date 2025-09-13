import React, { useRef, useEffect } from 'react';

declare global {
  interface Window {
    require: any;
    monaco: any;
  }
}

interface DiffEditorProps {
  original: string;
  modified: string;
  language: string;
}

const DiffEditor: React.FC<DiffEditorProps> = ({ original, modified, language }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorContainerRef.current && !editorRef.current) {
      const createEditor = () => {
        const originalModel = window.monaco.editor.createModel(original, language);
        const modifiedModel = window.monaco.editor.createModel(modified, language);
        
        const editor = window.monaco.editor.createDiffEditor(editorContainerRef.current!, {
          theme: 'vs-dark',
          readOnly: true,
          automaticLayout: true,
          fontSize: 12,
          renderSideBySide: true,
          minimap: { enabled: false },
        });

        editor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });

        editorRef.current = editor;
      };

      if (typeof window.monaco === 'undefined' || typeof window.monaco.editor === 'undefined') {
        window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' }});
        window.require(['vs/editor/editor.main'], createEditor);
      } else {
        createEditor();
      }
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model?.original && model.original.getValue() !== original) {
        model.original.setValue(original);
      }
      if (model?.modified && model.modified.getValue() !== modified) {
        model.modified.setValue(modified);
      }
      if (model?.original) {
        window.monaco.editor.setModelLanguage(model.original, language);
      }
       if (model?.modified) {
        window.monaco.editor.setModelLanguage(model.modified, language);
      }
    }
  }, [original, modified, language]);

  return <div ref={editorContainerRef} className="w-full h-full border-t border-gray-700"></div>;
};

export default DiffEditor;
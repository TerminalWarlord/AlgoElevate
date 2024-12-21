"use client";

import Editor from '@monaco-editor/react';

const CodeEditor: React.FC<{ onChange: (userCode: string) => void }> = ({ onChange }) => {


    return (
        <div className="w-full h-[80vh] overflow-hidden rounded-lg border border-gray-300">
            <Editor
                height="100%" // Make the editor fill the wrapper
                defaultLanguage="javascript"
                defaultValue="// Write your code here!"
                onChange={(value, event) => onChange(value)}
                theme="vs-dark"
                options={{
                    fontSize: 16, // Adjust font size here
                }}
            />
        </div>
    );
};

export default CodeEditor;

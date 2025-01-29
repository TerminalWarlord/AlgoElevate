"use client";

import Editor from '@monaco-editor/react';

const languageMap = {
    python: {
        editorLang: "python",
        comment: "#Write your code here!"
    },
    cpp: {
        editorLang: "cpp",
        comment: `#include<bits/stdio.h>
using namespace std;

int main(){
    cout<<"Hello world"<<endl;
    // Write your code here!

}`
    }
}

const CodeEditor: React.FC<{ onChange: (userCode: string) => void, language:string }> = ({ onChange, language }) => {
    const lang = language as keyof typeof languageMap;
    console.log(lang);
    return (
        <div className="w-full h-[80vh] overflow-hidden rounded-lg border border-gray-900">
            <Editor
                height="100%" // Make the editor fill the wrapper
                defaultLanguage={languageMap[lang].editorLang}
                defaultValue={languageMap[lang].comment}
                value={languageMap[lang].comment}
                onChange={(value, event) => {
                    if(typeof value !== "string"){
                        return;
                    }
                    onChange(value)
                }}
                theme="vs-dark"
                options={{
                    fontSize: 16, // Adjust font size here
                }}
            />
        </div>
    );
};

export default CodeEditor;

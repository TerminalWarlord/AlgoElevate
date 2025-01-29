"use client";

import ActionButtons from "@/components/ide/action-buttons"
import CodeEditor from "@/components/ide/code-editor"
import STDio from "@/components/ide/stdio"
import { useRouter } from "next/navigation";
import { useState } from "react"

interface CodeData {
    code: string;
    stdin: string;
    stdout: string;
    language: string;
    userId: number
}

const IdePage = () => {
    const router = useRouter();
    const [codeData, setCodeData] = useState<CodeData>({
        code: "",
        stdin: "",
        stdout: "",
        language: "python",
        userId: 2

    });


    function handleCode(userCode: string) {
        setCodeData(prevState => {
            return {
                ...prevState,
                code: userCode
            }
        });
    }

    function handleStdin(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setCodeData(prevState => {
            return {
                ...prevState,
                stdin: event.target.value as unknown as string
            }
        });
    }


    function handleStdout(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setCodeData(prevState => {
            return {
                ...prevState,
                stdout: event.target.value as unknown as string
            }
        });
    }
    

    async function submitData() {
        console.log(codeData)
        try {
            const res = await fetch('http://localhost:3000/api/v1/ide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(codeData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error:", res.status, errorData);
                return;
            }

            const responseData = await res.json();
            router.push('/' + responseData.id);

            console.log("Data submitted successfully:", responseData);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async function executeCode(){
        try {
            const res = await fetch(`http://localhost:3002/execute/${codeData.language}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(codeData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error:", res.status, errorData);
                return;
            }

            const responseData = await res.json();
            setCodeData(prevCodeData => {
                return {
                    ...prevCodeData,
                    stdout: responseData.output
                }
            })
            console.log("Data submitted successfully:", responseData);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    function onLanguageSelection(lang:string){
        setCodeData(prevCodeData=>{
            return {
                ...prevCodeData,
                language: lang
            }
        })
    }


    function handleSave() {
        submitData();

    }

    return (
        <div className="px-4 md:px-12 lg:px-24 xl:px-[150px] flex gap-x-5 mt-8 flex-col md:flex-row">
            <div className="rounded-xl min-h-[400px] w-full md:w-3/4 flex flex-col gap-y-4">
                <ActionButtons onRun={executeCode} onSave={handleSave} onLanguageSelection={onLanguageSelection} />
                <CodeEditor onChange={handleCode} language={codeData.language}/>
            </div>
            <div className="flex-1 rounded-xl">
                <STDio onStdinChange={handleStdin} onStdoutChange={handleStdout} {...codeData} />
            </div>
        </div >
    )
}

export default IdePage

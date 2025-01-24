"use client";

import ActionButtons from "@/components/ide/ActionButtons"
import CodeEditor from "@/components/ide/CodeEditor"
import STDio from "@/components/ide/STDio"
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
        language: "c++",
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
    function handleRun() {

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


    function handleSave() {
        submitData();

    }

    return (
        <div className="px-[100px] flex gap-x-5 mt-8">
            <div className="rounded-xl min-h-[400px] w-3/4 flex flex-col gap-y-4">
                <ActionButtons onRun={handleRun} onSave={handleSave} />
                <CodeEditor onChange={handleCode} />
            </div>
            <div className="flex-1 rounded-xl">
                <STDio onStdinChange={handleStdin} onStdoutChange={handleStdout} {...codeData} />
            </div>
        </div >
    )
}

export default IdePage

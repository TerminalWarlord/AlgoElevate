"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";
import { prisma } from "@repo/db/client"
import { Input } from "@/components/ui/input";
import SelectCompanies from "@/components/add-problems/select-companies";
import SelectTopics from "@/components/add-problems/select-topics";
import MultiSelectDropdown from "@/components/add-problems/multi-select-dropdown";
import { useRef, useState } from "react";
import { DIFFICULTY } from "@/constants/types";


export default function AdminPage() {
    const [companies, setCompanies] = useState<string[]>();
    const [topics, setTopics] = useState<string[]>();
    const problemTitleRef = useRef<HTMLTextAreaElement>(null);
    const problemLinkRef = useRef<HTMLInputElement>(null);
    const [problemDifficulty,setProblemDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);

    function handleCompanySelection(company:any){
        setCompanies(company.map((c:any)=>{
            return c.title;
        }));
    }

    function handleTopicSelection(topic:any){
        setTopics(topic.map((t:any)=>{
            return t.title;
        }));
    }

    async function handleSubmission(){

        try{
            const body = {
                companies,
                topics,
                problemLink: problemLinkRef.current?.value,
                problemTitle: problemTitleRef.current?.value,
                problemDifficulty: problemDifficulty,
            }
            const res = await fetch('/api/v1/submit-problem', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if(!res.ok){
                const resData = await res.json();
                console.log(resData);
                return;
            }
            setCompanies([]);
            setTopics([]);
            setProblemDifficulty(DIFFICULTY.EASY);
            if (problemTitleRef.current) {
                problemTitleRef.current.value = '';
            }
            if (problemLinkRef.current) {
                problemLinkRef.current.value = '';
            }
        }catch(err){
            console.log(err);
        }
        // console.log(problemDifficulty);
        // console.log(problemLinkRef.current?.value);
        // console.log(problemTitleRef.current?.value);
        // console.log(companies);
        // console.log(topics);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-xl">Add a Problem</h1>
            <form className="w-3/6 space-y-2">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="problem_title" className="font-medium">Problem</Label>
                    <Textarea placeholder="Problem Title" name="problem_title" id="problem_title" className="py-1 my-0" required ref={problemTitleRef}/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="problem_link" className="font-medium">Problem URL</Label>
                    <Input placeholder="Problem URL" name="problem_link" id="problem_link" className="py-1 my-0" required ref={problemLinkRef}/>
                </div>
                <div className="flex flex-col space-y-2 my-2">
                    <Select name="problem_difficulty" onValueChange={(value: DIFFICULTY)=>{
                        setProblemDifficulty(value);
                    }} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Difficulty</SelectLabel>
                                <SelectItem value="EASY">Easy</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HARD">Hard</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <MultiSelectDropdown
                    apiEndpoint="/api/v1/get-companies"
                    name="Companies"
                    onSelectionChange={handleCompanySelection}
                    placeholder="Add Companies"
                />
                <MultiSelectDropdown
                    apiEndpoint="/api/v1/get-topics"
                    name="Topics"
                    onSelectionChange={handleTopicSelection}
                    placeholder="Add Topics"
                />
                <Button type="button" onClick={handleSubmission}>Create</Button>
            </form>
        </div>
    );
}

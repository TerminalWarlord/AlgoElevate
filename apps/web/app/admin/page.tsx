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
import { useState } from "react";

async function handleSubmit(formData: FormData) {
    // "use server";
    // const problemTitle = formData.get("problem_title") as string;
    // const problemDifficulty = formData.get("problem_difficulty") as "EASY" | "MEDIUM" | "HARD";
    // const problemLink = formData.get("problem_link") as string;
    // if (!problemDifficulty || !problemTitle || !problemLink) {
    //     return;
    // }

    // console.log(problemTitle, problemDifficulty);
    // const problem = await prisma.problem.create({
    //     data: {
    //         title: problemTitle,
    //         slug: problemTitle.toLowerCase().replace(/\s+/g, '-'), // Added slug property
    //         difficulty: problemDifficulty, // ✅ Fixed missing comma
    //         link: problemLink, // ✅ Fixed missing comma
    //         companies: { create: [] },
    //         topics: { create: [] },
    //     },
    // });
    // console.log(problem);
}

export default function AdminPage() {
    const [companies, setCompanies] = useState<string[]>();
    const [topics, setTopics] = useState<string[]>();


    function handleCompanySelection(company:any){
        console.log("companies",companies);
        setCompanies(company.map((c:any)=>{
            return c.slug;
        }));
    }

    function handleTopicSelection(topic:any){
        console.log("topics",topics);
        setTopics(topic.map((t:any)=>{
            return t.slug;
        }));
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-xl">Add a Problem</h1>
            <form action={handleSubmit} className="w-3/6 space-y-2">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="problem_title" className="font-medium">Problem</Label>
                    <Textarea placeholder="Problem Title" name="problem_title" id="problem_title" className="py-1 my-0" required />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="problem_link" className="font-medium">Problem URL</Label>
                    <Input placeholder="Problem URL" name="problem_link" id="problem_link" className="py-1 my-0" required />
                </div>
                <div className="flex flex-col space-y-2 my-2">
                    <Select name="problem_difficulty" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
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
                <Button type="submit">Create</Button>
            </form>
        </div>
    );
}

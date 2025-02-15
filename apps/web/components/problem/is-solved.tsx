import { useSession } from "next-auth/react";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const IsSolvedCheckbox: React.FC<{ problemId: number, isSolved: boolean }> = ({ problemId, isSolved }) => {
    const { data: session } = useSession();
    const [solved, setSolved] = useState(isSolved);
    async function handleProblemStateChange() {
        try {
            setSolved(preState => !preState);
            const res = await fetch('/api/v1/problem-state', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    problemId,
                    solved: !solved
                })
            });
            if (!res.ok) {
                console.log("error")
                return;
            }
        }
        catch (err) {
            console.error("FAILED", err)
        }
    }

    return (
        <Checkbox
            checked={solved}
            onCheckedChange={handleProblemStateChange} />
    )
}

export default IsSolvedCheckbox;
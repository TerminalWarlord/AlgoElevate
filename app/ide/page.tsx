import ActionButtons from "@/components/ide/ActionButtons"
import CodeEditor from "@/components/ide/CodeEditor"

const page = () => {
    return (
        <div className="px-[100px] flex gap-x-5">
            <div className="bg-gray-50 rounded-xl min-h-[400px] w-3/4">
                <ActionButtons />
                <CodeEditor />
            </div>
            <div className="bg-green flex-1 rounded-xl">
                OUTPUT
            </div>
        </div>
    )
}

export default page

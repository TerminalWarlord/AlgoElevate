import CustomButton from "../ui/CustomButton"


interface ActionButtonsTypes {
    onRun: () => void;
    onSave: () => void;
    onLanguageSelection: (lang:string) => void
}

const ActionButtons: React.FC<ActionButtonsTypes> = ({ onRun, onSave, onLanguageSelection }) => {
    return (
        <div className="flex justify-between">
            <select name="language" id="langauge" className="bg-gray-900 border-2 border-gray-900 px-2 py-1 rounded-md min-w-72 text-white" onChange={(e)=>{
                onLanguageSelection(e.target.value);
            }}>
                <option value="cpp">C++</option>
                <option value="python" selected>Python</option>
            </select>
            <div className="flex gap-x-3">
                <CustomButton text="Run" icon="/ide/run.svg" style={'bg-easy text-white hover:bg-easy hover:bg-opacity-80 dark:invert invert-0'} onClick={onRun} />
                <CustomButton text="Save" icon="/ide/save.svg" style={'bg-dark_orange text-white hover:bg-dark_orange hover:bg-opacity-80 dark:invert invert-0'} onClick={onSave} />
            </div>
        </div>
    )
}

export default ActionButtons;

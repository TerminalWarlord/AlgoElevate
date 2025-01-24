import CustomButton from "../ui/CustomButton"


interface ActionButtonsTypes {
    onRun: () => void;
    onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsTypes> = ({ onRun, onSave }) => {
    return (
        <div className="flex justify-between">
            <select name="language" id="langauge" className="bg-gray-900 border-2 border-gray-900 px-2 py-1 rounded-md min-w-72 text-white">
                <option value="c++">C++</option>
            </select>
            <div className="text-white flex gap-x-3">
                <CustomButton text="Run" icon="/ide/run.svg" style={'bg-easy text-black hover:bg-easy hover:bg-opacity-80'} onClick={onRun} />
                <CustomButton text="Save" icon="/ide/save.svg" style={'bg-dark_orange text-black hover:bg-dark_orange hover:bg-opacity-80'} onClick={onSave} />
            </div>
        </div>
    )
}

export default ActionButtons;

import CustomButton from "../ui/CustomButton"

const ActionButtons = () => {
    return (
        <div className="flex justify-between">
            <select name="language" id="langauge" className="border-2 border-b-gray-200 px-2 py-1 rounded-md min-w-72">
                <option value="c++">C++</option>
            </select>
            <div className="text-white">
                <CustomButton text="Run" icon="/ide/run.svg" style={'bg-easy text-white'} />
                <CustomButton text="Save" icon="/ide/save.svg" style={'bg-dark_orange text-white'} />
            </div>
        </div>
    )
}

export default ActionButtons;

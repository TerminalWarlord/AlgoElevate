import STD from "./std";

const shadow = { boxShadow: "0 0 14.8px -2px rgba(0, 0, 0, 0.25)" };

interface STDioType {
    stdin: string,
    stdout: string,
    onStdinChange: (text: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onStdoutChange: (text: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const STDio: React.FC<STDioType> = ({ stdin, stdout, onStdinChange, onStdoutChange }) => {
    return (
        <div className="flex flex-col gap-y-5 h-full my-8 md:my-0">
            <div className="flex flex-col h-2/3  rounded-xl" style={shadow}>
                <STD label={"Output"} content={stdout} onChange={onStdoutChange} disabled={true} />
            </div>
            <div className="flex-1  flex flex-col rounded-xl" style={shadow}>
                <STD label={"Input"} content={stdin} disabled={false} onChange={onStdinChange} />
            </div>

        </div>
    )
}

export default STDio

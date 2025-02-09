

interface STDType {
    label: string,
    content: string,
    disabled?: boolean,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const STD: React.FC<STDType> = ({ label, content, onChange, disabled }) => {
    return (
        <>
            <div>
                <h3 className="uppercase text-center my-1" style={{ fontFamily: 'var(--font-public-sans)' }}>{label}</h3>
            </div>
            <textarea className="bg-gray-50 dark:bg-gray-900 dark:bg-opacity-45 bg-opacity-45 flex-1 mx-2 mb-2 rounded-lg px-1 py-1 font-mono min-h-64" disabled={disabled} defaultValue={content} onChange={onChange} />
        </>
    )
}

export default STD

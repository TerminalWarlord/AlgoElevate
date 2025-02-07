"use client";

import MultiSelectDropdown from "./multi-select-dropdown";


export default function SelectTopics() {
    return <MultiSelectDropdown
        apiEndpoint="/api/v1/get-companies"
        name="Companies"
        onSelectionChange={() => { }}
        placeholder="Companies"
    />
}
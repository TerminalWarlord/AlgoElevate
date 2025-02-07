"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";

interface Item {
    id: number;
    slug: string;
    title: string;
}

interface MultiSelectDropdownProps {
    name: string;
    placeholder?: string;
    apiEndpoint: string;
    onSelectionChange: (selectedItems: Item[]) => void;
}

export default function MultiSelectDropdown({
    name,
    placeholder = "Select...",
    apiEndpoint,
    onSelectionChange,
}: MultiSelectDropdownProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [matchedItems, setMatchedItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle input and debounce API calls
    async function handleInput() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(async () => {
            if (!inputRef.current?.value) {
                setShowDropdown(false);
                return;
            }

            const res = await fetch(apiEndpoint);
            if (!res.ok) {
                return;
            }
            const resData = await res.json();
            setMatchedItems(resData.items);
            setShowDropdown(true);
        }, 500);
    }

    // Handle selection
    function handleSelectItem(item: Item) {
        if (!selectedItems.find((c) => c.id === item.id)) {
            const updatedItems = [...selectedItems, item];
            setSelectedItems(updatedItems);
            onSelectionChange(updatedItems); // Notify parent
        }
        setShowDropdown(false);
        if (inputRef.current) inputRef.current.value = "";
    }

    // Handle removal
    function handleRemoveItem(id: number) {
        const updatedItems = selectedItems.filter((item) => item.id !== id);
        setSelectedItems(updatedItems);
        onSelectionChange(updatedItems); // Notify parent
    }

    return (
        <div ref={dropdownRef} className="relative">
            <Input
                name={name}
                placeholder={placeholder}
                ref={inputRef}
                onChange={handleInput}
                onFocus={() => setShowDropdown(true)}
            />
            {selectedItems.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
                        >
                            {item.title}
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {showDropdown && (
                <div className="absolute rounded-md w-full shadow-md z-20 bg-white dark:bg-gray-800 text-sm mt-1">
                    {inputRef?.current && inputRef.current.value && (
                        <div
                            className="border px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
                            onClick={() =>
                                handleSelectItem({
                                    id: Date.now(),
                                    slug: inputRef.current?.value as string,
                                    title: inputRef.current?.value as string,
                                })
                            }
                        >
                            Create <strong>{inputRef.current.value}</strong>
                        </div>
                    )}
                    {Array.isArray(matchedItems) && matchedItems.map((item) => (
                        <div
                            key={item.id}
                            className="border border-t-0 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
                            onClick={() => handleSelectItem(item)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
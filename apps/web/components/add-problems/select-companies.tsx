"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";

// let timer: NodeJS.Timeout | null = null;
interface CompanyDetails {
	id: number;
	slug: string;
	title: string;
}

export default function SelectCompanies() {
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const companiesRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [matchedCompanies, setMatchedCompanies] = useState<CompanyDetails[]>([]);
	const [selectedCompanies, setSelectedCompanies] = useState<CompanyDetails[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				companiesRef.current &&
				!companiesRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	async function handleInput() {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
	
		timerRef.current = setTimeout(async () => {
			if (!companiesRef.current?.value) {
				setShowDropdown(false);
				return;
			}

			const res = await fetch("/api/v1/get-companies");
			if (!res.ok) {
				return;
			}
			const resData = await res.json();
			setMatchedCompanies(resData.companies);
			setShowDropdown(true);
		}, 500);
	}

	function handleSelectCompany(company: CompanyDetails) {
		if (!selectedCompanies.find((c) => c.id === company.id)) {
			setSelectedCompanies([...selectedCompanies, company]);
		}
		setShowDropdown(false);
		if (companiesRef.current) companiesRef.current.value = "";
	}

	function handleRemoveCompany(id: number) {
		setSelectedCompanies(selectedCompanies.filter((company) => company.id !== id));
	}

	return (
		<div ref={dropdownRef} className="relative">
			<Input
				name="companies"
				placeholder="Companies"
				ref={companiesRef}
				onChange={handleInput}
				onFocus={() => setShowDropdown(true)}
			/>
			{selectedCompanies.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{selectedCompanies.map((company) => (
						<div
							key={company.id}
							className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
						>
							{company.title}
							<button
								onClick={() => handleRemoveCompany(company.id)}
								className="text-red-500 hover:text-red-700"
							>
								✕
							</button>
						</div>
					))}
				</div>
			)}
			{showDropdown && (
				<div className="absolute rounded-md w-full shadow-md z-20 blur-0 bg-white dark:bg-gray-800 text-sm mt-1">
					{companiesRef?.current && companiesRef.current.value && (
						<div
							className="border px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
							onClick={() =>
								handleSelectCompany({
									id: Date.now(),
									slug: companiesRef.current?.value as string,
									title: companiesRef.current?.value as string,
								})
							}
						>
							Create <strong>{companiesRef.current.value}</strong>
						</div>
					)}
					{matchedCompanies.map((company) => (
						<div
							key={company.id}
							className="border border-t-0 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
							onClick={() => handleSelectCompany(company)}
						>
							{company.title}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
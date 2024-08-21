"use client"

import { useMemo } from "react"
import { SingleValue } from "react-select"
import CreateTableSelect from "react-select/creatable"

type Props = {
    onChange: (value: string) => void;
    onCreate?: (name: string) => void;
    options?: { label: string; value: string }[];
    value?: string | null | undefined;
    placeholder?: string;
    disabled?: boolean;
}

export const Select = ({ 
    onChange, 
    onCreate, 
    options = [], 
    value, 
    placeholder, 
    disabled 
}: Props) => {
    const handleChange = (option: SingleValue<{ label: string; value: string }>) => {
        if (option?.value !== undefined) {
            onChange(option.value);
        }
    };


    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);

    return (
        <CreateTableSelect
            className="text-sm h-10"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover": {
                        borderColor: "#e2e8f0",
                    },
                })
            }}
            options={options}
            value={selectedOption}
            onChange={handleChange}
            onCreateOption={onCreate}
            isDisabled={disabled}
            placeholder={placeholder}
        />
    );
};
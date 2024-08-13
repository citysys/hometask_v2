import React from "react";
import { UseFormRegister } from "react-hook-form";
import { NewUser } from "../../../model";

export interface SelectProps {
    inputId: string; 
    options: string[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    register?: UseFormRegister<any>;
    required?: boolean;
    dependency?: {
        label: string;
        condition: boolean;
    };
}

const Select: React.FC<SelectProps> = ({
    inputId,
    options,
    onChange,
    placeholder,
    dependency,
    required = true,
    register,
}) => {
    return (
        <select
            id={inputId as string} // Type assertion to ensure compatibility
            required={required}
            {...(register ? register(inputId) : {})}
            onChange={onChange} 
        >
            {!dependency?.condition && <option value="">{placeholder}</option>}
            {dependency?.condition && <option value="">{dependency.label}</option>}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;

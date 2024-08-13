import React, { forwardRef, ForwardedRef } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { SelectAddress } from '../SelectAddress';

interface InputProps<T extends FieldValues> {
    inputId: keyof T;
    label: string;
    inputType: string;
    type: string;
    required: boolean;
    register: UseFormRegister<T>;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps<any>>(
    (
        { inputId, label, inputType, register, required, error }: InputProps<any>,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const renderInputField = () => {
            switch (inputType) {
                case "select":
                    return (
                        <SelectAddress
                            register={register}
                            required={required}
                            inputId={inputId as string}
                            label={label}
                        />
                    );
                case "checkbox":
                    return (
                        <input
                            id={inputId as string}
                            type="checkbox"
                            {...register(inputId as string, { required })}
                            ref={ref}
                        />
                    );


                default:
                    
                    return (
                        <input
                            id={inputId as string}
                            type={inputType}
                            {...register(inputId as string, { required })}
                            ref={ref}
                        />
                    );
            }
        }

        return (
            <div className={`input-wrapper ${inputId as string}`}>
                <label htmlFor={inputId as string} className='input-label'>
                    {label}
                    {required && <span className='asterisk'>*</span>}
                </label>
                {renderInputField()}
                {error && <span className='error'>{error}</span>}
            </div>
        );
    }
);

export default Input;

import React, { forwardRef, ForwardedRef } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { SelectAddress } from '../SelectAddress';

interface InputProps<T extends FieldValues> {
    inputId: keyof T;
    label: string;
    inputType: string;
    type?: string;
    required: boolean;
    register: UseFormRegister<T>;
    error?: string;
}

const Input = (({ inputId, label, inputType, register, required, error }: InputProps<any>,) => {
    return (
        <div className={`input-wrapper ${inputId as string}`}>
            <label htmlFor={inputId as string} className='input-label'>
                {label}
                {required && <span className='asterisk'>*</span>}
            </label>
            {
                inputType == "select" ?
                    <SelectAddress
                        register={register}
                        required={required}
                        inputId={inputId as string}
                        label={label} /> :
                    <input
                        id={inputId as string}
                        type={inputType}
                        {...register(inputId as string, { required })}

                    />
            }
            {error && <span className='user-error visible'>{error}</span>}
        </div>
    );
}
);

export default Input;

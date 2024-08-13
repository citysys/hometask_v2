import React from 'react'

export interface SubmitButtonProps {
    className: string
    buttonText: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ className, buttonText }) => {
    return (
        <button type='submit' className={className}>
            {buttonText}
        </button>
    )
}
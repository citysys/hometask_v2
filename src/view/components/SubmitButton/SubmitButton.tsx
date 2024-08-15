import React from 'react'

export interface SubmitButtonProps {
    className: string
    buttonText: string
    disabled: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, buttonText, disabled }) => {
    return (
        <button type='submit' className={className} disabled={disabled}>
            {buttonText}
        </button>
    )
}

export default SubmitButton

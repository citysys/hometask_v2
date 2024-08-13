import React from 'react'

export interface SubmitButtonProps {
    className: string
    buttonText: string
    disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, buttonText , disabled = false }) => {
    return (
        <button type='submit' disabled={disabled} className={className}>
            {buttonText}
        </button>
    )
}

export default SubmitButton

import React from 'react'

export interface SubmitButtonProps {
    disabled: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled }) => {

    return (
        <button
            type="submit"
            disabled={disabled}
            className="submit-btn"
        >
            שלח
        </button>
    )
}
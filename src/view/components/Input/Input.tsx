import { Field } from "formik"
import { SelectInput } from "./SelectInput"

interface InputProps {
    inputId: string
    isRequired: boolean
    label: string
    inputType: string
}

const Input: React.FC<InputProps> = ({ inputId, isRequired, label, inputType }) => {

    return (
        <div className={`input-wrapper ${inputId}`}>
            <label className='input-label'>
                {isRequired && <span className='asterisk'>* </span>}
                {label}
                {(inputType !== 'checkbox') && ':'}
            </label>

            {inputType !== 'select' ?
                    <Field
                        type={inputType}
                        id={inputId}
                        name={inputId}
                        required={isRequired}
                    />
                    :
                    <SelectInput
                        id={inputId}
                        name={inputId}
                        isRequired={isRequired}
                    />
                }

        </div>
    )
}

export default Input
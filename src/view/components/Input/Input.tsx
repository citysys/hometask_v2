import React, { useState, forwardRef, ForwardedRef, useEffect } from 'react'
import { NewUser, NewUserSchema } from '../../../model'
import { UseFormRegister } from 'react-hook-form'
import { fetchCities } from '../../../model/services/api.service'

interface iInputProps {
    inputId: string
    label: string
    inputType: string
    streets: string[] | null
    register: UseFormRegister<NewUser>
    countValidInputs: (inputId: string) => void
    onCityChange?: ((city: string) => void) | null
}

const Input = forwardRef(
    ({ streets, onCityChange, inputId, label, inputType, register, countValidInputs }: iInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const [errorMsg, setErrorMsg] = useState<boolean>(false)
        const [cities, setCities] = useState<[]>([])

        useEffect(() => {
            loadCities('')
        }, [])

        async function loadCities(selectedCity: string) {
            if (inputId === 'city') {
                const citiesFromApi = await fetchCities(selectedCity)
                setCities(citiesFromApi)
            }
        }

        async function onchange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
            const inputValue: string = event.target.value
            const inputId: string = event.target.id
            const fieldValidator = NewUserSchema.pick({ [inputId]: true })
            const fieldValidationResult = await fieldValidator.safeParseAsync({ [inputId]: inputValue })

            if (inputId === 'city' && onCityChange) {
                onCityChange(inputValue)
            }
            if (fieldValidationResult.success) {
                setErrorMsg(false)
                countValidInputs(inputId)
                event.target.style.borderColor = 'lightGreen'
            } else {
                const error = fieldValidationResult.error.flatten()
                setErrorMsg(true)
                event.target.style.borderColor = 'red'
            }
        }

        return (
            <div className={`input-wrapper ${inputId}`}>
                <label className='input-label'>
                    {inputId !== 'agreeEmail' && inputId !== 'agreeTerms' && <span className='asterisk'>*</span>}
                    {label}
                    {inputId !== 'agreeEmail' && inputId !== 'agreeTerms' && ':'}
                </label>
                {inputId !== 'city' && inputId !== 'street' && (
                    <input
                        autoComplete='whatever'
                        {...register(inputId as keyof NewUser)}
                        type={inputType}
                        id={inputId}
                        onChange={onchange}
                        ref={ref}
                        required
                    />
                )}
                {inputId === 'city' && (
                    <select id={inputId} {...register(inputId as keyof NewUser)} onChange={onchange} required>
                        <option>אנא בחר עיר</option>
                        {cities.map((city, index) => {
                            return (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            )
                        })}
                    </select>
                )}
                {inputId === 'street' && (
                    <select id={inputId} {...register(inputId as keyof NewUser)} onChange={onchange} required>
                        {!streets?.length && <option>נא לבחור עיר</option>}
                        {streets?.map((street, index) => {
                            return (
                                <option key={index} value={street}>
                                    {street}
                                </option>
                            )
                        })}
                    </select>
                )}
                {inputId !== 'agreeEmail' && inputId !== 'agreeTerms' && (
                    <span className={`user-error ${errorMsg ? 'visible' : ''}`}>{`האם אתה בטוח שהשדה תקין ?`}</span>
                )}
            </div>
        )
    }
)

export default Input

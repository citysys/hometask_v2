import React, { useEffect, useState } from 'react'
import { NewUserSchema, FormValues } from '../../model/NewUser.model'
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik'
import { inputFields, sectionTitles } from '../constants/input.const'
import { Input } from '../components/Input'
import { SubmitButton } from '../components/SubmitButton'
import { storageService } from '../../model/services/async-storage.service'

export const Signup: React.FC = () => {
    const [initialValues, setInitialValues] = useState<FormValues>({} as FormValues)

    const groupedFields = [inputFields.slice(0, 3), inputFields.slice(3, 5), inputFields.slice(5, 8), inputFields.slice(8)]

    const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        console.log('submitting', values)
        saveFormData(values)
    }

    const getInitialValues = () => {
        inputFields.reduce((acc, field) => {
            acc[field.inputId] = field.initialValue
            return acc
        }, {} as FormValues)
    }

    const loadFormData = () => {
        const storedData = storageService.query('formData')
        return (storedData || getInitialValues())
    }

    const saveFormData = (values: FormValues): void => {
        storageService.post('formData', values)
    }

    useEffect(() => {
        const fetchFormData = async () => {
            const data = await loadFormData() 
            console.log('data: ', data)
            setInitialValues(data)
        }

        fetchFormData()
       
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={NewUserSchema}
                enableReinitialize={true}

            >
                {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
                    saveFormData(values as FormValues)
                    return (
                        <Form className='signup-form'>
                            <div className="form-container">
                                <header className='form-header'>
                                    <span className='header-title'>הרשמה :</span>
                                    <span className='header-explanation'>*שדות המסומנים בכוכבית הם שדות חובה</span>
                                </header>

                                <div className="inputs-container">
                                    {groupedFields.map((fields, index) => (
                                        <div className="inputs-section" key={index}>
                                            {sectionTitles[index] && (
                                                <h2 className={'section-title'}>
                                                    {sectionTitles[index]}
                                                    {<span className='section-seperator'></span>}
                                                </h2>
                                            )}

                                            <div className={`inputs-row`}>
                                                {fields.map(({ inputId, label, isRequired, inputType }) => (
                                                    <React.Fragment key={inputId}>
                                                        <Input
                                                            inputId={inputId}
                                                            label={label}
                                                            isRequired={isRequired}
                                                            inputType={inputType}
                                                        />

                                                        <ErrorMessage name={inputId} component="div" className="error" />
                                                    </React.Fragment>

                                                ))}
                                            </div>

                                        </div>

                                    ))}

                                </div>
                                <div className='btn-container'>
                                    <SubmitButton className={`submit-btn`} buttonText={'שלח'} disabled={!isValid || !dirty} />
                                    {(!isValid || !dirty) && <span>יש למלא את כל השדות כדי לבצע הרשמה</span>}
                                </div>
                            </div>

                        </Form>
                    )
                }}

            </Formik>
        </>
    )

}

import React from 'react'
import * as yup from 'yup'
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik'
import { inputFields, sectionTitles } from '../constants/input.const'
import { Input } from '../components/Input'

export const Signup: React.FC = () => {

    const groupedFields = [inputFields.slice(0, 3), inputFields.slice(3, 5), inputFields.slice(5, 8), inputFields.slice(8)]

    const YupUserSchema = yup.object({
        fullName: yup.string().defined()
    })

    const onSubmit = () => {
        console.log('submitting')
    }

    const initialValues = inputFields.reduce((acc, field) => {
        acc[field.inputId] = field.initialValue
        return acc
    }, {} as Record<string, string | boolean>)

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={YupUserSchema}
                enableReinitialize={true}

            >
                {({ errors, touched, dirty, setFieldValue }) => (

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
                        </div>

                    </Form>
                )}

            </Formik>
        </>
    )

}

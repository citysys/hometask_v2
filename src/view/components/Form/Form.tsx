import { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../Input';
import { GroupTitle } from '../GroupTitle';
import { NewUserSchema } from '../../../model/NewUser.model';
import { HeaderForm } from '../HeaderForm';

interface FormProps<T extends FieldValues> {
    inputGroupArray: {
        groupTitle: string;
        type: string;
        groupInputs: {
            inputId: keyof T;
            label: string;
            inputType: string;
            required: boolean;
        }[];
    }[];
    submitFormHandler: SubmitHandler<T>;
    title?: string;
    userAlert?: boolean;
    localStorageKey: string;
    schema: z.ZodSchema<T>;
}

const Form = <T extends FieldValues>({
    title,
    submitFormHandler,
    inputGroupArray,
    userAlert,
    localStorageKey,
    schema,
}: FormProps<T>) => {
    const { handleSubmit, register, watch, formState: { errors } } = useForm<T>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: JSON.parse(localStorage.getItem(localStorageKey) || "{}")
    });


    const formValues = watch();

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(formValues));
    }, [formValues]);


    return (
        <form onSubmit={handleSubmit(submitFormHandler)} className='signup-form'>
            <div className='form-container'>
                <HeaderForm title={title} />
                <div className='inputs-container'>
                    {inputGroupArray.map((group, index) => (
                        <div className='inputs-section' key={index}>
                            {group.groupTitle && <GroupTitle title={group.groupTitle} />}
                            <div className={`inputs-row ${group.type === 'checkbox' ? 'check-boxes-row' : ''}`}>
                                {group.groupInputs.map(field => (
                                    <Input
                                        type={group.type}
                                        key={field.inputId as string}
                                        inputId={field.inputId}
                                        label={field.label}
                                        inputType={field.inputType}
                                        required={field.required}
                                        register={register}
                                        error={errors[field.inputId]?.message as string}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='btn-container'>
                    <SubmitButton disabled={Object.keys(errors).length > 0 || Object.values(formValues).join() == ""} className='submit-btn' buttonText='שלח' />
                    {userAlert && <span>יש למלא את כל השדות כדי לבצע הרשמה</span>}
                </div>
            </div>
        </form>
    );
};

export default Form;

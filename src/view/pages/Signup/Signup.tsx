import React, { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { NewUserSchema, NewUser } from '../../../model/NewUser.model';
import { createUser } from '../../../controller/entities/user.actions';
import inputFieldsArray from './inputFields.json';
import { Form } from '../../components/Form';

const Signup: React.FC = () => {
    const [userAlert, setUserAlert] = useState<boolean>(false);
    const validInputsCountRef = useRef<number>(0);
    const validInputsListRef = useRef<string[]>([]);

    const formSubmitHandler: SubmitHandler<NewUser> = async (data: NewUser) => {
        if (validInputsCountRef.current < inputFieldsArray.length - 2) {
            setUserAlert(true);
            return;
        }
        try {

            const newUserResult = await NewUserSchema.parseAsync(data);
            createUser(newUserResult);
            setUserAlert(false);
            validInputsCountRef.current = 0;
            validInputsListRef.current = [];
        } catch (error) {
            console.error('Form validation failed:', error);
        }
    };

    return (
        <main className='main-container'>
            <Form<NewUser>
                localStorageKey='signupForm'
                inputGroupArray={inputFieldsArray as InputField<NewUser>[]} // Ensure correct type
                submitFormHandler={formSubmitHandler}
                title="הרשמה"
                userAlert={userAlert}
                schema={NewUserSchema} // Pass the Zod schema here
            />
        </main>
    );
};

export default Signup;

import React, { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { NewUserSchema, NewUser } from '../../../model/NewUser.model';
import { createUser } from '../../../controller/entities/user.actions';
import inputFieldsArray from './inputFields.json';
import { Form } from '../../components/Form';

const Signup: React.FC = () => {
    const [userAlert, setUserAlert] = useState<boolean>(false);
    const formSubmitHandler: SubmitHandler<NewUser> = async (data: NewUser) => {
        try {
            const newUserResult = await NewUserSchema.parseAsync(data);
            createUser(newUserResult);
            setUserAlert(false);

        } catch (error) {
            setUserAlert(true);
            console.error('Form validation failed:', error);
        }
    };

    return (
        <main className='main-container'>
            <Form<NewUser>
                localStorageKey='signupForm'
                inputGroupArray={inputFieldsArray as InputField<NewUser>[]} 
                submitFormHandler={formSubmitHandler}
                title="הרשמה"
                userAlert={userAlert}
                schema={NewUserSchema}
            />
        </main>
    );
};

export default Signup;

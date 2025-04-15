import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

interface RegisterFormValues {
    name : string;
    email : string;
    password : string;
    repeat_pass: string;
    phone : string;
    gender : string;
    avatar: string;
}

const RegisterSchema = Yup.object({
    name : Yup.string().required('Name is required'),
    email : Yup.string().email('Invalid email').required('Email is required'),
    password : Yup.string().min(6, ' Minimum 6 character').required('Password is required'),
    repeat_pass : Yup.string().oneOf([Yup.ref('password')], 'password must match').required('Please confirm your password'),
    phone : Yup.string().required('Phone is required'),
    gender: Yup.string().required('Gender is required'),
    avatar : Yup.string().nullable()
});

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    

    const initialValues : RegisterFormValues = {
        name : '',
        email : '',
        password : '',
        repeat_pass: '',
        phone : '',
        gender: '',
        avatar: ''
    };

    const handleSubmit = async (values : RegisterFormValues) => {
        try {

            if (!values.avatar) {
                if (values.gender === 'male') {
                   values.avatar = '/image/Avatar-Male.PNG' ;
                } else {
                    values.avatar =  '/image/Avatar-Female.PNG';
                }
            }
            

            const response = await axios.post('http://localhost:3000/api/auth/register', values);
            console.log(response.data);
            navigate('/login');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
              setError(err.response.data.message || 'Registration failed');
            } else {
              setError('An unexpected error occurred.');}
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit} >

            {({ isSubmitting }) => (
                <Form>
                    <InputField label="Name" name="name" type="text" placeholder="Enter your name" />
                    <InputField label="Email" name="email" type="email" placeholder="Enter your email"/>
                    <InputField label="Gender" name = "gender" option={[
                        {label: "Male", value: "male"} ,{label: "Female", value: "female"}
                    ]}/>
                    <InputField label="Phone" name="phone" type="text" placeholder="Enter your phone" />
                    <InputField label="Password" name="password" type="password" placeholder="Enter your password with minimum 6 character"/>
                    <InputField label = "Repeat Password" name="repeat_pass" type="password" placeholder="Repeat Password" />
                    
                
                <button type = "submit" disabled = {isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </Form>
            )}

        </Formik>

        <p className='text-sm text-center mt-4'>
            Already have an account?
            <a href = "/login" className='text-blue-500'>Login</a>
        </p>
    </div>
    );
}

export default Register
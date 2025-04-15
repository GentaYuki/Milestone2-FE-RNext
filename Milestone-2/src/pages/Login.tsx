import React, {useState} from 'react';
import {Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField';
import * as Yup from 'yup';

interface LoginForm {
    email : string;
    password : string;
}

const LoginSchema = Yup.object ({
    email : Yup.string().email('Invalid email').required('Email is required'),
    password : Yup.string().min(6, ' Minimum 6 character').required('Password is required'),
});

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const initialValues : LoginForm = {
        email : '',
        password: ''
    }



    const handleSubmit = async (values : LoginForm) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', values);
            console.log ('login Success:', response.data);
            navigate('/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response ){
                setError(err.response.data.message || ' Login failed');
            } else {
                setError('An unexpected error occurred.');
            }
        
    }
};
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
            <Form>
                <InputField label='email' name='email' type='text' placeholder='Enter your email' />
                <InputField label='password' name='password' type='text' placeholder='Enter your password' />

                <button type='submit' disabled={isSubmitting} className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2'>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


            </Form>
        )}

    </Formik>


    <p className="text-sm text-center mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </p>
    </div>
  );
};


export default Login;
        
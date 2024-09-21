
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import { updateLocalStorage } from '../services/updateLocalStorage';
import { useDispatch } from 'react-redux';
import { setUserType, initUserType } from '../redux/userTypeSlice';
import { loginApi } from '../services/server-api/loginApi';
import { toast } from 'react-toastify';


const emailRegexValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: undefined, password: undefined });
    const dispatch = useDispatch();

    const validatePassword = (value) => {
        const newErrors = errors;

        if (!value || value === "")
            newErrors.password = 'Password is required';
        else if (value.length < 6)
            newErrors.password = 'Password must be at least 6 characters';
        else
            newErrors.password = undefined;

        setErrors(newErrors);
    }

    const validateEmail = (value) => {
        const newErrors = errors;

        if (!value || value === "")
            newErrors.email = 'Email is required';

        else if (!emailRegexValidate.test(value))
            newErrors.email = 'Email is invalid';
        else
            newErrors.email = undefined;

        setErrors(newErrors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userToken = await loginApi(email, password);
            updateLocalStorage('tokenEmail', userToken.email);
            updateLocalStorage('token', {userToken});

            dispatch(setUserType('Admin'));
            toast.success("The login was successful!");

        } catch (error) {
            toast.failed("Login failed. Please try again");
            updateLocalStorage('tokenEmail');
            updateLocalStorage('token');
            dispatch(initUserType());
        }
    };

    const isSubmitDisabled = () => {
        return !email || !password || !!errors.email || !!errors.password
    }

    return (
        <div className="login-wrapper">
            <div className="login-form-container">
                <h2 className="login-title">Login</h2>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                            isInvalid={!!errors.email}
                        />

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button disabled={isSubmitDisabled()} variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}


export default Login;
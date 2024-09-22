
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateLocalStorage } from '../../services/updateLocalStorage';
import { useDispatch } from 'react-redux';
import { setUserType, initUserType } from '../../redux/userTypeSlice';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/server-api/identity-hendle';
import UserTypeSelect from './UserTypeSelect';
import './Login.css'


const emailRegexValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('')
    const [errors, setErrors] = useState({ email: undefined, password: undefined });
    const dispatch = useDispatch();

    const validatePassword = (value) => {
        const newErrors = errors;

        if (!value || value === "")
            newErrors.password = 'Password is required';
        else if (value.length < 5)
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
            const userToken = await postLogin(email, password, type);

            if (userToken) {
                updateLocalStorage('token', { userToken });
                updateLocalStorage('tokenEmail', email);
                dispatch(setUserType(type));
                toast.success("The login was successful!");
            }
            else {
                toast.error("Login failed. Please try again");
            }
        } catch (error) {
            toast.failed("Login failed. Please try again");
            updateLocalStorage('token');
            updateLocalStorage('tokenEmail');
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

                    <UserTypeSelect value={type} onChange={value => setType(value)} />

                    <Button disabled={isSubmitDisabled()} variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}


export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/index';
import './index.css';

function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [signUp, setSignUp] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        address: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUp({
            ...signUp,
            [name]: value,
        });
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post('http://localhost:9000/api/user/add', {
                firstName: signUp.firstName,
                lastName: signUp.lastName,
                phone: signUp.phone,
                country: signUp.country,
                address: signUp.address,
                email: signUp.email,
                password: signUp.password,
            })
            .then((response) => {
                console.log("resss", response)

                const user_token = response.headers.authorization.split(' ')[1];
                localStorage.setItem('user-auth', user_token);

                // Add the user_token to Axios headers
                axios.defaults.headers.common['Authorization'] = `Bearer ${user_token}`;
                setIsLoading(false);
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    };

    return (
        <div className='signup-cointainer'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='form-container'>
                    <form className="form-main" onSubmit={handleSignUp}>
                        <p className="heading">signUp</p>
                        <div className="inputContainer">
                            <input
                                type="text"
                                className="inputField"
                                id="firstName"
                                name="firstName"
                                placeholder="firstName"
                                autoComplete="firstName"
                                value={signUp.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="inputField"
                                id="lastName"
                                name="lastName"
                                placeholder="lastName"
                                autoComplete="lastName"
                                value={signUp.lastName}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                className="inputField"
                                id="phone"
                                name="phone"
                                placeholder="phone"
                                autoComplete="phone"
                                value={signUp.phone}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="inputField"
                                id="country"
                                name="country"
                                placeholder="country"
                                autoComplete="country"
                                value={signUp.country}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="inputField"
                                id="address"
                                name="address"
                                placeholder="address"
                                autoComplete="address"
                                value={signUp.address}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                className="inputField"
                                id="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                                value={signUp.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                className="inputField"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={signUp.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='section2'>
                            <button id="button" type="submit" >Submit</button>
                            <Link to="/login">Sign In</Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignUp;

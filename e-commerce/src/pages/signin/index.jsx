import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/index';
import './index.css';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

function SignIN() {
    const signIn = useSignIn()
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value,
        });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post('http://localhost:9000/api/user/login', {
                email: login.email,
                password: login.password,
            })
            .then((response) => {
                if (res.status === 200) {
                    if (signIn(
                        {
                            token: res.data.token,
                            expiresIn: res.data.expiresIn,
                            tokenType: "Bearer",
                            authState: res.data.authUserState,
                            refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                            refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                        }
                    )) { // Only if you are using refreshToken feature
                        // Redirect or do-something
                    } else {
                        //Throw error
                    }
                }
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
        <div className='signin-cointainer'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='form-container'>
                    <form className="form-main" onSubmit={handleSignIn}>
                        <p className="heading">Login</p>
                        <div className="inputContainer">
                            <input
                                type="email"
                                className="inputField"
                                id="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                                value={login.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                className="inputField"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={login.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='section2'>
                            <button id="button" type="submit" >Submit</button>
                            <Link to="/signup">Sign up</Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignIN;

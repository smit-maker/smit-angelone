import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { storeToken } from '../utils/auth';

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/users/token',
                `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            storeToken(response.data.access_token);
            onLoginSuccess();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group pb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control-lg"
                    />
                </div>
                <div className="form-group pb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control-lg"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </form>
        </div>
    );
};

export default Login;

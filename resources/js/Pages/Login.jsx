import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/login', { email, password }, {
            onError: (err) => {
                console.error('Login error:', err);
                setErrors(err);
            },
            onSuccess: (page) => {
                console.log('Login success:', page);
                // Log the entire page object to see its structure
                console.log('Page object:', page);
                const userRole = page.props.auth?.user?.role;
                if (userRole) {
                    switch (userRole) {
                        case 'admin':
                            Inertia.visit('/admin/dashboard');
                            break;
                        case 'manager':
                            Inertia.visit('/manager/dashboard');
                            break;
                        case 'customer':
                            Inertia.visit('/customer/dashboard');
                            break;
                        default:
                            Inertia.visit('/login');
                            break;
                    }
                } else {
                    Inertia.visit('/login');
                }
            },
        });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

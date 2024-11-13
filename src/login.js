import React, { useState, useEffect } from 'react';

const Login = ({ setActiveUser, setShowSection, showSection }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState(''); // New email state
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Initialize users from localStorage
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(savedUsers);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Find the user based on the entered username and password
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Successful login
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('activeUser', JSON.stringify(user)); // Save active user in localStorage
            setActiveUser(user); // Update the active user state
            setErrorMessage(''); // Clear error message
        } else {
            // Invalid credentials
            setErrorMessage('Invalid username or password.');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // Check if the username already exists
        if (users.some(u => u.username === newUsername)) {
            setErrorMessage('Username already exists. Please choose another.');
            return;
        }

        // Check if the email already exists
        if (users.some(u => u.email === newEmail)) {
            setErrorMessage('Email already exists. Please use another.');
            return;
        }

        // Add new user to the list and save to localStorage
        const updatedUsers = [...users, { username: newUsername, password: newPassword, email: newEmail }];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        alert("Sign-up successful! You can now log in.");
        setShowSection('login');
    };

    return (
        <div style={loginContainerStyle}>
            <div style={formContainerStyle}>
                <h1 style={headingStyle}>{showSection === 'signUp' ? "Sign Up" : "Login"} to Wings Cafe Inventory System</h1>
                {showSection === 'signUp' ? (
                    <form onSubmit={handleSignUp} style={formStyle}>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New Username"
                            required
                            style={inputStyle}
                        />
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Email"
                            required
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            style={inputStyle}
                        />
                        <button type="submit" style={buttonStyle}>
                            Sign Up
                        </button>
                        {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleLogin} style={formStyle}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            style={inputStyle}
                        />
                        <button type="submit" style={buttonStyle}>
                            Login
                        </button>
                        {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
                    </form>
                )}
                <button onClick={() => setShowSection(showSection === 'login' ? 'signUp' : 'login')} style={toggleButtonStyle}>
                    {showSection === 'signUp' ? "Already a user? Log in here" : "New user? Sign Up here"}
                </button>
            </div>
        </div>
    );
};

const loginContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
    fontSize: '1.5em',
    marginBottom: '10px',
    textAlign: 'center',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
};

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
};

const buttonStyle = {
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const errorMessageStyle = {
    color: 'red',
    marginTop: '10px',
    fontSize: '0.9em',
};

const toggleButtonStyle = {
    marginTop: '20px',
    padding: '8px',
    fontSize: '1em',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default Login;

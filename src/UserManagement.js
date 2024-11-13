import React, { useState, useEffect } from 'react';

function UserManagement({ users, setUsers }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        // Make sure users are loaded from localStorage when the component mounts
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, [setUsers]);

    const handleAddOrUpdateUser = () => {
        const newUser = { username, password, email };
        
        if (editingIndex !== null) {
            // Update existing user
            const updatedUsers = [...users];
            updatedUsers[editingIndex] = newUser;
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        } else {
            // Add new user
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        
        resetForm();
    };

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setEditingIndex(null);
    };

    const editUser = index => {
        setUsername(users[index].username);
        setPassword(users[index].password);
        setEmail(users[index].email);
        setEditingIndex(index);
    };

    const deleteUser = index => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    // Inline styles
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '800px',
        margin: 'auto',
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '8px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px',
    };

    const userCardStyle = {
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
    };

    const listStyle = {
        listStyleType: 'none',
        paddingLeft: '0',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px', // Adds space between buttons
        marginTop: '10px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>User Management</h2>

            {/* User Form */}
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                style={inputStyle}
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                style={inputStyle}
            />
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                style={inputStyle}
            />
            <button onClick={handleAddOrUpdateUser} style={buttonStyle}>
                {editingIndex !== null ? 'Update' : 'Add'} User
            </button>

            <h3 style={headingStyle}>User List</h3>
            {users.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No users available.</p>
            ) : (
                <ul style={listStyle}>
                    {users.map((user, index) => (
                        <li key={index} style={userCardStyle}>
                            <h4>{user.username}</h4>
                            <p>Email: {user.email}</p>
                            {/* Align Edit and Delete buttons */}
                            <div style={buttonContainerStyle}>
                                <button
                                    onClick={() => editUser(index)}
                                    style={{ ...buttonStyle, backgroundColor: '#007bff', width: 'auto' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteUser(index)}
                                    style={{ ...buttonStyle, backgroundColor: '#e74c3c', width: 'auto' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserManagement;

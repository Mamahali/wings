import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './login';
import ProductManagement from './ProductManagement';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';

function App() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [showSection, setShowSection] = useState('login');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages

    const navigate = useNavigate();

    // Helper function to fetch data from the backend with improved error handling
    const fetchData = async (endpoint, setState) => {
        try {
            setLoading(true);
            const response = await fetch(endpoint);

            // Check if the response is ok (status 200)
            if (!response.ok) {
                throw new Error(`Failed to fetch ${endpoint}. Status: ${response.status}`);
            }

            // Check if the response contains JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setState(data);
            } else {
                // If response is not JSON, log the HTML content for debugging
                const text = await response.text();
                setErrorMessage(`Expected JSON but got HTML content: ${text.substring(0, 200)}`);
                console.error('Received HTML content:', text); // Log HTML content for debugging
            }
        } catch (error) {
            // If any error occurs, log the error and set the error message
            console.error(`Error fetching ${endpoint}:`, error);
            setErrorMessage(`Error fetching data from ${endpoint}: ${error.message}`);
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    // Fetch users and products on initial load
    useEffect(() => {
        fetchData('/api/users', setUsers);
        fetchData('/api/product', setProducts);
    }, []);

    // Persist active user to localStorage and sync with backend
    useEffect(() => {
        if (activeUser) {
            localStorage.setItem('activeUser', JSON.stringify(activeUser));
        } else {
            localStorage.removeItem('activeUser');
        }
    }, [activeUser]);

    // Logout function
    const logout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/logout', { method: 'POST' });
            
            // Check for success status
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Logout failed: ${errorText || response.statusText}`);
            }
    
            setActiveUser(null);
            localStorage.removeItem('activeUser');
            alert('You have been logged out.');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            setErrorMessage(`Error logging out: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="App">
            {/* Display error message if any */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Navigation bar visible only when user is logged in */}
            {activeUser && (
                <nav style={navStyle}>
                    <button onClick={() => navigate('/dashboard')} style={buttonStyle}>Dashboard</button>
                    <button onClick={() => navigate('/productManagement')} style={buttonStyle}>Product Management</button>
                    <button onClick={() => navigate('/userManagement')} style={buttonStyle}>User Management</button>
                    <button onClick={logout} style={logoutButtonStyle}>Logout</button>
                </nav>
            )}

            {/* Display loading indicator */}
            {loading && <p>Loading...</p>}

            <Routes>
                <Route
                    path="/"
                    element={
                        activeUser ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Login 
                                setActiveUser={setActiveUser} 
                                users={users} 
                                setShowSection={setShowSection} 
                                showSection={showSection} 
                            />
                        )
                    }
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={activeUser ? <Dashboard products={products} /> : <Navigate to="/" />}
                />
                <Route
                    path="/productManagement"
                    element={
                        activeUser ? (
                            <ProductManagement setProducts={setProducts} products={products} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/userManagement"
                    element={
                        activeUser ? (
                            <UserManagement users={users} setUsers={setUsers} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

// Inline styles for navigation
const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
    backgroundColor: '#f4f4f4',
    padding: '10px 0',
};

const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

const logoutButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

export default App;

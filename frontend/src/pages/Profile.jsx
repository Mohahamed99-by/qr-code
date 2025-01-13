import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/get-started'); // Redirect to login page after logout
    };

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('https://qr-code-db.onrender.com/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Assuming data.user is the fetched user object
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            handleLogout();
        } finally {
            setLoading(false); // Stop loading once the data is fetched
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        } else {
            handleLogout();
        }
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center">
                    <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-blue-500 text-white border-4 border-blue-500">
                        {user.profile_image ? (
                            <img
                                src={user.profile_image}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-3xl font-bold">
                                {user.first_name.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <span className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
                    </div>

                </div>
                <h1 className="text-center text-2xl font-bold mt-4">
                    {user.first_name} {user.last_name}
                </h1>
                <p className="text-center text-gray-500">{user.email}</p>
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-700">Member Since:</span>
                        <span className="text-gray-600">{new Date(user.join_date).toDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-700">Phone:</span>
                        <span className="text-gray-600">{user.phone || 'N/A'}</span>
                    </div>
                    {/* Add more user details here */}
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Profile;

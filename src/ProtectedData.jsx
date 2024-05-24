import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:80/protected', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Failed to fetch protected data');
            }
        };

        fetchProtectedData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Protected Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ProtectedData;

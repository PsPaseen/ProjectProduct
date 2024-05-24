import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const showLoginAlert = () => {
        MySwal.fire({
            title: 'Login',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Username">
                <input id="swal-input2" type="password" class="swal2-input" placeholder="Password">
            `,
            showCancelButton: true,
            confirmButtonText: 'Login',
            preConfirm: () => {
                const username = document.getElementById('swal-input1').value;
                const password = document.getElementById('swal-input2').value;
                if (!username || !password) {
                    Swal.showValidationMessage('Please enter both username and password');
                    return false;
                }
                return { username, password };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { username, password } = result.value;
                handleLogin(username, password);
            }
        });
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:80/login', { username, password });
            const token = response.data.token;

            // Store the token in localStorage
            localStorage.setItem('token', token);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You are now logged in!',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response ? error.response.data.message : 'Login failed. Please try again.',
            });
        }
    };

    useEffect(() => {
        showLoginAlert();
    }, []); // Empty dependency array ensures this effect runs only once, on component mount

    return null; // Since the SweetAlert dialog will be displayed immediately, no need to render anything in the component
}

export default Login;

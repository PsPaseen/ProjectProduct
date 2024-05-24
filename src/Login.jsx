import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const onUpdateField = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        // Display the SweetAlert dialog when the component mounts
        showLoginAlert();
    }, []); // Empty dependency array ensures this effect runs only once, on component mount

    const showLoginAlert = () => {
        // Display SweetAlert dialog with inputs for username and password
        Swal.fire({
            title: 'Login',
            html: `
                <form id="loginForm">
                    <input type="text" name="username" class="swal2-input" placeholder="Username" value="${form.username}">
                    <input type="password" name="password" class="swal2-input" placeholder="Password" value="${form.password}">
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Login',
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('[name=username]').value;
                const password = Swal.getPopup().querySelector('[name=password]').value;
                // Here you can add your login logic, for example, make an API call to authenticate the user
                // For demonstration, let's just display the entered credentials
                Swal.fire({
                    title: 'Entered Credentials',
                    html: `
                        <p><strong>Username:</strong> ${username}</p>
                        <p><strong>Password:</strong> ${password}</p>
                    `,
                 
                });
            }
        });
    };

    return null; // Since the SweetAlert dialog will be displayed immediately, no need to render anything in the component
}

export default Login;

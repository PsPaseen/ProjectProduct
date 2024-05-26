import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from './api';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const onUpdateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      const response = await api.post('/register', {
        Username: form.username,
        Password: form.password,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data : 'Registration failed.',
      });
    }
  };

  return (
    <div>
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={handleRegister}>
      <div className='Registermenu'>
        <div>
          <label>Username:</label>
          <input className='Username'
            type="text"
            name="username"
            value={form.username}
            onChange={onUpdateField}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input className='Password'
            type="password"
            name="password"
            value={form.password}
            onChange={onUpdateField}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input className='CPassword'
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onUpdateField}
            required
          />
        </div>
        <button type="submit" className='Registerbtn'>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

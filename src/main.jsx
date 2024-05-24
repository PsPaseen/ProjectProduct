import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from './AddProduct';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <App />
    <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
    </BrowserRouter>
);

import Navbar1 from './Navbar2';
import React, { useState, useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultimage from './assets/ROV.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddProduct.css';
import api from './api';


const AddProduct = () => {
    const navigate = useNavigate();
    // const { auth } = useContext(AuthContext);

    const goBack = () => {
        navigate('/');
    };
    const [formData, setFormData] = useState({
                Productname: '',
                Productprice: '',
                Stock: '',
                Productdetail: '',
                Pathpic: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData({ ...formData, picture: file });
        } else {
            console.log('Please select an image file.');
            e.target.value = null;
        }
    };



    const handleRemovePhoto = () => {
        setFormData({ ...formData, picture: null });
        document.querySelector('input[type="file"]').value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            await api.post('/uploadproduct', formDataToSend);
            console.log('Product added successfully!');

            // Show success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully!',
            });

            // Clear form fields
            setFormData({
                Productname: '',
                Productprice: '',
                Stock: '',
                Productdetail: '',
                Pathpic: '',
            });

            // Reset file input value
            document.querySelector('input[type="file"]').value = null;
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add product. Please try again later.',
            });
        }
    };

    return (
        <div>
            <Navbar1 />
            {
                
                <div className="add-product-container">
                    <div className="backtohomepage" >
                        <button type="button" onClick={goBack}>Back</button>
                    </div>
                    <h2>Add Product</h2>
                    <div className='sub-add-product-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='add-product-img'>
                                <label className='Chooseimg'>
                                    Picture:
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="Pathpic"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </label>
                                <div className='img-container'>
                                    <img src={formData.picture ? URL.createObjectURL(formData.picture) : defaultimage} alt="Product Preview" />
                                    {formData.picture && (<button type="button" className='remove-photo-button' onClick={handleRemovePhoto}>Remove Photo</button>)}
                                </div>
                            </div>


                            <div className='add-product-form'>
                                <label>
                                    Productname:
                                    <input
                                        type="text"
                                        name="Productname"
                                        value={formData.Productname}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                Productprice:
                                    <input
                                        type="number"
                                        name="Productprice"
                                        value={formData.Productprice}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Stock:
                                    <input
                                        type="number"
                                        name="Stock"
                                        value={formData.Stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div >
                            <div className='add-product-form2'>
                                <label>
                                Productdetail:
                                    <textarea
                                        name="Productdetail"
                                        value={formData.Productdetail}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </label>

                                {isSubmitting ? 
                                (
                                    <button type="submit" disabled={true}>ประมวลผล</button>
                                ) : 
                                (
                                    <button type="submit">Submit</button>
                                )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddProduct;
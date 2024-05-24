// src/App.js
import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import './card.css';
import Card1 from './cardtest'; // Adjust the path if needed
import Navbar1 from './Navbar2'; // Adjust the path if needed
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({}); // Initialize state as an empty array
  const [productImages, setProductImages] = useState({}); // Initialize state as an empty string for a single image URL

  const showSwalDetail = () => {
    Swal.fire({
      title: "อะไรวะ",
      text: "อะไรวะ",
      icon: "question"
    });
  }

  const showSwalDownloading = () => {
    Swal.fire({
      title: "Downloading Data...",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  useEffect(() => {
    showSwalDownloading();
    axios.get('http://localhost:80/product')
      .then(res => {
        setProduct(res.data);
        res.data.forEach(productItem => {
          // console.log(productItem);
          if (productItem.Pathpic) {
            const fileName = productItem.Pathpic.split("\\").pop();
            axios.get(`http://localhost:80/image/${fileName}`)
              .then((res) => {
                setProductImages(prevImages => ({
                  ...prevImages,
                  [productItem.ProductID]: res.data // Store the fetched image data
                }));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
        Swal.close();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.close();
      });
  }, []);

  return (

    <>
      <Navbar1 />
      <Container style={{ paddingTop: '80px' }}>
        <Row>
          {product.length > 0 ? (
            product.map((productItem, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="Cardtem" onClick={showSwalDetail}>
                  {productImages[productItem.ProductID] && (
                    <Card.Img variant="top" src={`${productImages[productItem.ProductID]}`} style={{ width: '100px', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
                  )}
                  <Card.Body>
                    <Card.Title><p>{productItem.Productname}</p></Card.Title>
                    <Card.Text>
                      ราคา {productItem.Productprice} บาท
                    </Card.Text>
                    <Button variant="primary">รายละเอียดเพิ่มเติม</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No product data found</p>
          )}
        </Row>
      </Container>
    </>

  );
}


export default App;

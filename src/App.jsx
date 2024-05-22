// src/App.js
import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import Card1 from './cardtest'; // Adjust the path if needed
import Navbar1 from './Navbar2'; // Adjust the path if needed
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState({}); // Initialize state as an empty array
  const [img, setImg] = useState(''); // Initialize state as an empty string for a single image URL


  useEffect(() => {
    axios.get('http://localhost:80/test')
      .then(res => {
        setPersons(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:80/image')
      .then(res => {
        setImg(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {persons.length > 0 && persons[0] ? (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={img} style={{ width: '100px', height: 'auto' }} />
          <Card.Body>
            <Card.Title><p>มหาเทพรำสัง {persons[1].Username}</p></Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>No user data found</p>
      )}
    </>
  );
}


export default App;

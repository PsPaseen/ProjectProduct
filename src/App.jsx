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
  const [persons, setPersons] = useState({}); // Initialize state as an empty array
  const [img, setImg] = useState(''); // Initialize state as an empty string for a single image URL

  const showSwal = () => {
    Swal.fire({
      title: "อะไรวะ",
      text: "อะไรวะ",
      icon: "question"
    });
  }


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
    // <>
    // <Navbar1 />
    //   {persons.length > 0 && persons[0]  ? (
    //     <Card className="Cardtem" style={{ width: '18rem' } } onClick={showSwal}>
    //       <Card.Img variant="top" src={img} style={{ width: '100px', height: 'auto' }} />
    //       <Card.Body>
    //         <Card.Title><p>มหาเทพรำสัง {persons[1].Username}</p></Card.Title>
    //         <Card.Text>
    //           Some quick example text to build on the card title and make up the
    //           bulk of the card's content.
    //         </Card.Text>
    //         <Button variant="primary">Go somewhere</Button>
    //       </Card.Body>
    //     </Card>
    //   ) : (
    //     <p>No user data found</p>
    //   )}
    // </>

    <>
      <Navbar1 />
      <Container style={{ paddingTop: '80px' }}>
        <Row>
          {persons.length > 0 ? persons.map((person, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="Cardtem" onClick={showSwal}>
                <Card.Img variant="top" src={img} style={{ width: '100px', height: 'auto' , marginLeft: 'auto', marginRight: 'auto'}} />
                <Card.Body>
                  <Card.Title><p>{person.Username}</p></Card.Title>
                  <Card.Text style={{}}> 
                    ราคา 55 บาท
                  </Card.Text>
                  <Button variant="primary">รายละเอียดเพิ่มเติม</Button>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <p>No user data found</p>
          )}
        </Row>
      </Container>
    </>

  );
}


export default App;

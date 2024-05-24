import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card1() {

  const showSwal = () => {
    Swal.fire({
      title: "อะไรวะ",
      text: "อะไรวะ",
      icon: "question"
    });
  }
  return (
    <Card className="Cardtem" style={{ width: '18rem' }} onClick={showSwal}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      
    </Card>
    
  );
}

export default Card1;
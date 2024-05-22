import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css';

import Swal from 'sweetalert2'

function Card1() {

  const showSwal = () => {
    Swal.fire({
      title: "อะไรวะ",
      text: "อะไรวะ",
      icon: "question"
    });
  }
  return (
    <Card className="Cardtem ms-auto" style={{ width: '18rem' }} onClick={showSwal}>
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
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar1() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top">
      <Container>
        <Navbar.Brand href="#home">CS36(7)9 ขายของ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">หน้าหลัก</Nav.Link>
            <NavDropdown title="รายชื่อสมาชิก" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Punna</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Kantapon</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Paseen</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">ส่งรายวิชา CS369</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="additem ms-auto">
            <Nav.Link href="#home">เพิ่มข้อมูลสินค้า</Nav.Link>
          </Nav>
          <Nav className="login ms-auto">
            <Nav.Link href="#home">เข้าสู่ระบบ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;

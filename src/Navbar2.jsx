import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom';
import Login from './Login'; // Import your Login component
import Register from './Register'; // Import your Register component
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

const handleLoginClick = () => {
    const loginContainer = document.createElement('div');
    ReactDOM.render(<Login />, loginContainer);

    MySwal.fire({
        title: 'Login',
        html: loginContainer,
        showCancelButton: true,
        showConfirmButton: false,
    });
};

const handleRegisterClick = () => {
    const registerContainer = document.createElement('div');
    ReactDOM.render(<Register />, registerContainer);

    MySwal.fire({
        title: 'Register',
        html: registerContainer,
        showCancelButton: true,
        showConfirmButton: false,
    });
};

const Navbar1 = () => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top">
            <Container>
                <Navbar.Brand href="/">CS36(7)9 ขายของ</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">หน้าหลัก</Nav.Link>
                        <NavDropdown title="รายชื่อสมาชิก" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Punna</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Kantapon</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Paseen</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">ส่งรายวิชา CS369</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="additem ms-auto">
                        <Nav.Link href="/AddProduct">เพิ่มข้อมูลสินค้า</Nav.Link>
                    </Nav>
                    <Nav className="login ms-auto">
                        <Nav.Link onClick={handleLoginClick}>
                            เข้าสู่ระบบ
                        </Nav.Link>
                    </Nav>
                    <Nav className="register ms-auto">
                        <Nav.Link onClick={handleRegisterClick}>
                            สมัครสมาชิก
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar1;

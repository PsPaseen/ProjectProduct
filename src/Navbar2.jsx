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
import Button from 'react-bootstrap/Button';
import api from './api';
import './App';
import { useNavigate } from 'react-router-dom';


const MySwal = withReactContent(Swal);


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
    const navigate = useNavigate();
    const handleAddproduct = () => {
        navigate('/Addproduct');
    };
    
    const handleLoginClick = () => {
        // navigate('/login');
        const loginContainer = document.createElement('div');
        ReactDOM.render(<Login />, loginContainer);
    
        MySwal.fire({
            title: 'Login',
            html: loginContainer,
            showCancelButton: true,
            showConfirmButton: false,
    
        });
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'You are now logout',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                navigate('/App');
            }
        });
    };
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

                    <Nav.Link href="/">ยาวววววววววววววววววววววววววววววววววววววววววววววววววววววว</Nav.Link>

                    <Nav className="register ms-auto">
                        {localStorage.getItem('userID') == undefined ?
                            <Nav.Link onClick={handleRegisterClick}>
                                สมัครสมาชิก
                            </Nav.Link>
                            :
                            <Nav.Link onClick={() => handleAddproduct()}>เพิ่มข้อมูลสินค้า</Nav.Link>
                        }
                    </Nav>
                    <Nav className="login ms-auto">
                        {localStorage.getItem('userID') == undefined ?
                            <Button type="submit" onClick={handleLoginClick}>
                                เข้าสู่ระบบ
                            </Button> :
                            <>
                                <Nav.Link>ยินดีต้อนรับ, {localStorage.getItem('userName')}</Nav.Link>
                                <Button type="submit" onClick={handleLogoutClick}> ออกจากระบบ </Button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar1;
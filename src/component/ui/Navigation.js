import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../LOGO.svg'

const Navigation = () => {
    //Hook Area
    const navigate = useNavigate();



    //Function defination
    let userLogout = ()=>{
        window.localStorage.removeItem('JWT__Token')
        navigate('/login')
    }

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={Logo}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
                        <Link to="/" className='btn btn-link'>Home</Link>
                        {
                            window.localStorage.getItem("JWT__Token") === null &&
                            <>
                                <Link to="/login" className='btn btn-link'>Login</Link>
                                <Link to="/register" className='btn btn-link'>Register</Link>
                            </>
                        }
                        {
                            window.localStorage.getItem("JWT__Token") !== null &&
                            <>
                                <Nav.Link onClick={()=>{userLogout()}} className='btn btn-link'>Logout</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default Navigation

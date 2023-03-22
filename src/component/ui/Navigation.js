import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BrowserRouter, Link, useNavigate } from 'react-router-dom'
import URL from '../../helper/Url';

const Navigation = (props) => {
    //Hook Area
    const navigate = useNavigate();
    const [logo , setLogo] = useState('');

    useEffect(()=>{
        fetch(`${URL}/api/weblogo?populate=*`,{})
        .then(res=>res.json())
        .then((data)=>{
            console.log("LOGO=========>> ",data.data.attributes.logo.data.attributes.url);
            setLogo(data.data.attributes.logo.data.attributes.url);
        })
        .catch(err=>err)
    },[])



    //Function defination
    let userLogout = ()=>{
        window.localStorage.clear();
        navigate("/login");
    }

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                    src={`${URL}${logo}`}
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
                            window.localStorage.getItem("jwt_token") === null &&
                            <>
                                <Link to="/login" className='btn btn-link'>Login</Link>
                                <Link to="/register" className='btn btn-link'>Register</Link>
                            </>
                        }
                        {
                            window.localStorage.getItem("jwt_token") !== null &&
                            <>
                                <Nav.Link onClick={()=>{userLogout()}} className='btn btn-link'>Logout</Nav.Link>
                                <Link to="/bussiness_register" className='btn btn-link'>Register Business</Link>
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

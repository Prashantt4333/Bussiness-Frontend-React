import React from 'react'
import { Button, Form } from 'react-bootstrap'

const BussinessRegister = () => {
  return (
    <div className='p-5'>
        <Form >
            <h3>Bussiness Register</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bussiness Category</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Select Bussiness Category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Select City</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bussiness Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Bussiness Name" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={()=>{}}>
                Bussiness Register
            </Button>
        </Form>
    </div>
  )
}

export default BussinessRegister

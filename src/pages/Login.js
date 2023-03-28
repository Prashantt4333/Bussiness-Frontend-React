//import are
import React, { useEffect } from 'react'
import { Form , Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {URL} from '../helper/Helper';

//Function Defination Area
const Login = (props) => {
  //2.1 Hook
    const navigate = useNavigate();
    //Hooks Area

    //2.2
    const handleLogin = () => {
        //API Call
        //alert('OK');
        let payload = {
            "identifier": document.querySelector('input[type=email]').value,
            "password": document.querySelector('input[type=password]').value
          }
          console.log(payload);
          fetch(`${URL}/api/auth/local`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify(payload)
          })
          .then(res=>res.json())
          .then((data)=>{
            console.log("token -----> ", data['jwt'])
            if(data["jwt"] !== undefined){
              //Login Success
                
                
                //Store the token in local storage
                window.localStorage.clear();
                window.localStorage.setItem('jwt_token',data["jwt"]);
                setTimeout(() => {
                    navigate('/');
                }, 500);
                
            }else{
        
            }
            console.log(data);
          })
        .catch(err=>err)
      
    };
   

//Return Area
  return (
    <div className='p-5'>
      <Form>
        <h3>Log In </h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={()=>{handleLogin()}}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
//export Area
export default Login

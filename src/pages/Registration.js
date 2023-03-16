//Import area
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';


//Defination Area
const Registration = () => {
  //Hooks Area
  const [payload,setPayload] = useState();

      
  //function Area
  let reisterUser = ()=>{
    // alert("ohkkkk")
    let user = document.querySelector("input[name=username]").value;
    let email = document.querySelector("input[name=email").value;;
    let pass = document.querySelector("input[name=password]").value;;
    console.log(user);
    console.log(email);
    console.log(pass);
    
    console.log(payload);
    fetch(`http://localhost:1337/api/auth/local/register`,{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify(
        {
          "username": user,
          "email": email,
          "password": pass
        }
      )
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.data === null){
        swal("Bhohot Badhiya!", `${data.error.message}`, "error");
      }
      else{
        swal("Good job!", "User Created Succefully", "success");
      }
    })
    .catch(err=>err)
  }

  //return method
  return (
    <div className='p-5'>
      <Form>
        <h3>Register Now</h3>
        <Form.Group className="mb-3" >
          <Form.Label>User Name</Form.Label>
          <Form.Control name="username" type="text" placeholder="User Name" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={ ()=>{reisterUser()} }>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Registration

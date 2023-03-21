// import area
import React, { useEffect, useState } from 'react'
import URL from '../helper/Url'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';


// function defination
const BussinessRegister = ({user}) => {
    
    const [countries,setCountries] = useState([])
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])
    const [bussinessCategory,setBussinessCategory] = useState([])
    
    // hooks area

    // function defination area
    
    useEffect(()=>{
        // Call The country Api
        fetch(`${URL}/api/countries`,{})
        .then(res=>res.json())
        .then((countriesata)=>{
            console.log("CountriesData ----->",countriesata.data);
            setCountries(countriesata.data)
        })
        .catch((err)=>{
            return err
        })
     
        /*
        // Call The state Api
        fetch(`${URL}/api/states`,{})
        .then(res=>res.json())
        .then((stateData)=>{
            console.log("State Data ----->",stateData.data);
            setStates(stateData.data)
        })
        .catch((err)=>{
            return err
        })
        */ 
        /*
        // Call The city Api
        fetch(`${URL}/api/cities`,{})
        .then(res=>res.json())
        .then((cityData)=>{
            console.log("City Data ----->",cityData.data);
            setCities(cityData.data)
        })
        .catch((err)=>{
            return err
        })
        */

        // call the Bussiness Category Api
        fetch(`${URL}/api/bussiness-categories`,{})
        .then((res)=>{
            return res.json();
        })
        .then((bcData)=>{
            console.log("BC ----->",bcData.data);
            setBussinessCategory(bcData.data)
        })
        .catch((err)=>{
            return err
        })
    },[])
    let busRegister = (e) =>{
        
        e.preventDefault();
        // alert("okkkk");
        let payload = {
                        "data": {
                        "name": document.querySelector('input[name="bussiness_name"]').value,
                        "bussiness_category":document.querySelector('select[name="buss_cat_id"]').value,
                        "cities": [
                            document.querySelector('select[name="city_id"]').value
                        ]
                    }
                }
                // Call the api 
                // Get the token from localstorage
        let token = window.localStorage.getItem('jwt_token')
        console.log(token);

        fetch(`${URL}/api/bussinesses`,{ 
            method:"POST",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${token} `//concatination
            },
            body: JSON.stringify(payload)
        })
        .then((res)=>{
           return res.json();
        })
        .then((data)=>{
            console.log("button --->",data);
            if(data["data"] === null){
               swal("Bad Request",(`${data.error.message}`) , "error");
            }else{
               swal("Good job!","Register SuccessFully", "success");

            }
        })
        .catch((err)=>{
            return err
        })
    }

    let getStates = (e)=>{
        // alert("123456")
        console.log(e.target.value);
        let country_id = e.target.value ; 
        
        // Get the states from country id 
        fetch(`${URL}/api/states?filters[country][id][$eq]=${country_id}&populate=*`,{})
        .then((res)=>{
            return res.json();
        })
        .then((stateData)=>{
            console.log("=======> stateData ",stateData.data);
            setStates(stateData.data)
        })
        .catch((err)=>{
            return err
        })
    }

    let getCities =(e)=>{
        console.log(e.target.value);
        let state_id = e.target.value ; 
        
        // Get the states from country id 
        fetch(`${URL}/api/cities?filters[state][id][$eq]=${state_id}&populate=*`,{})
        .then((res)=>{
            return res.json();
        })
        .then((cityData)=>{
            console.log("=======> CityData ",cityData.data);
            setCities(cityData.data)
        })
        .catch((err)=>{
            return err
        })
    }

    // return method
    if (!user) {
        return <Navigate to="/login" replace />;
    }
  return (
    <div className='p-5'>
        <Form >
            <h3>Bussiness Register</h3>
            {console.log("set City ------=> ", cities)}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Country</Form.Label>
                <Form.Select name="country_id" aria-label="Default select example" onChange={(e)=>{getStates(e)}}>
                   {
                        countries.map((cv,idx,arr)=>{
                            return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                        })
                   }
                    
                    
                </Form.Select>
            </Form.Group>
            {
                states.length !== 0 &&
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Select name="state_id" aria-label="Default select example" onChange={(e)=>{getCities(e)}}>
                    {
                            states.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                    }
                    </Form.Select>
                </Form.Group>
            }
            {
                cities.length !== 0 &&
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Select name="city_id" aria-label="Default select example">
                    {
                            cities.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                    }
                    </Form.Select>
                </Form.Group>
            }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bussiness Category</Form.Label>
                <Form.Select name='buss_cat_id' aria-label="Default select example">
                {
                        bussinessCategory.map((cv,idx,arr)=>{
                            return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                        })
                   }
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bussiness Name</Form.Label>
                <Form.Control type="text" name="bussiness_name" placeholder="Enter Bussiness Name" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>{ busRegister(e)}}>
                Bussiness Register
            </Button>
        </Form>
    </div>
  )
}

export default BussinessRegister

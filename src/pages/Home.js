import React, { useEffect, useState } from "react"
import { Button, Card, Carousel, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { GOOGLE_MAP_KEY, URL } from "../helper/Helper";


const Home = () => {
    //Hooks area 
    const [bussinessCategory,setBussinessCategory] = useState([]);
    const [address,setAddress] = useState("");
    const [logo , setLogo] = useState("");



    //Function Defination
    useEffect(() => {
       fetch(`${URL}/api/bussiness-categories?populate=*`)
       .then((res)=>{
           return res.json();
       })
       .then((data)=>{
            console.log(data);
            setBussinessCategory(data.data);
       })
       .catch((err=>err))
   
   
        setAddress(window.localStorage.getItem("address"));
       // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(GOOGLE_MAP_KEY);

        // set response language. Defaults to english.
        Geocode.setLanguage("en");

        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("es");

        // set location_type filter . Its optional.
        // google geocoder returns more that one address for given lat/lng.
        // In some case we need one address as response for which google itself provides a location_type filter.
        // So we can easily parse the result for fetching address components
        // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
        // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();

        //var latlng = new window.google.maps.LatLng(24.45558, 74.8857875);
        //console.log("latlng------>",latlng);

        fetch(`${URL}/api/weblogo?populate=*`)
        .then(res=>res.json())
        .then(data=>{
            console.log("Logo ------->",data.data.attributes.logo.data.attributes.url);
            setLogo(data.data.attributes.logo.data.attributes.url);
        })
        .catch(err=>err);
    },[]);
    
    //2.2 function defination area
    let myLogout=()=>{
        window.localStorage.removeItem("jwt_token")
        window.location.href = "/login";
    }
   

    let detectLocation = ()=>{ //Fat Arrow function
        //alert("JIJIJIJIJ");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            
        } else {
           
        }
    }
    let showPosition=(position)=>{
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        window.localStorage.setItem("lat",position.coords.latitude);
        window.localStorage.setItem("long",position.coords.longitude);

         // Get address from latitude & longitude.
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude ).then(res=>res.json()).then(
            (response) => {
                console.log("response--------->",response);
                if(response.results.length >0){
                    var adrr = response.results[0].formatted_address;
                    setAddress(adrr)
                    window.localStorage.setItem("address",adrr);
                    console.log(adrr);
                }else{

                    var addr = response.plus_code.compound_code;
                    setAddress(addr)
                    window.localStorage.setItem("address",addr);
                    console.log(addr);
                }
            },
            (error) => {
                
                console.error("errror -------->",JSON.stringify(error));
            }
        ).catch(err=>{
            console.error("errror -------->",JSON.stringify(err));
        });
        
        //x.innerHTML = "Latitude: " + position.coords.latitude +
       //"<br>Longitude: " + position.coords.longitude;
    }
  return (
    <>
        <Navbar bg="" expand="lg" className="ms-5 mb-3 ">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        readOnly
                        placeholder="Get location"
                        className="me-2"
                        aria-label="Search"
                        id="location_search"
                        />
                    </Form>
                    <Button type="button btn btn-success" onClick={()=>{detectLocation()}}>search</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Carousel className="w-50 ms-4 rounded " indicators={false}>
            <Carousel.Item>
                <img
                className=" w-100"
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_packersmovers.png?v=1.1"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="w-100"
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners.png"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className=" w-100"
                src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners.png"
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
        <ul className="nav">
            {
                bussinessCategory && bussinessCategory.map((cv,idx,arr)=>{

                    return  <>
                                 <li key={idx} className="ms-4 text-center"style={{}}>
                                    <Link className=" text-dark " style={{textDecoration:"none",}} to={"/search?cat_name="+cv.attributes.name}>
                                        <div className="my_img ">
                                            <img className="mt-3 p-3 rounded " style={{width:"70px", border:"1px solid grey"}} src={"http://localhost:1337"+cv.attributes.image.data[0].attributes.url}/>
                                            <br/>
                                            <span >{cv.attributes.name}</span>                                        
                                        </div>
                                    </Link>
                                </li>
                            </>
                })
            }
        </ul>
        <Row className="mt-5 ms-3 me-3 ">
            <Col sm={6}>
                <Card className="p-3 ">
                    <Card.Title>Weddiong Requesites</Card.Title>
                    <Row className="text-center">
                        <Col  >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_banquethall.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_bridalrequisites.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_caterers.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col sm={6}>
            <Card className="p-3 ">
                    <Card.Title>Weddiong Requesites</Card.Title>
                    <Row className="text-center">
                        <Col  >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_banquethall.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_bridalrequisites.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_caterers.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row className="mt-5 ms-3 me-3">
            <Col sm={6}>
                <Card className="p-3 ">
                    <Card.Title>Weddiong Requesites</Card.Title>
                    <Row className="text-center">
                        <Col  >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_banquethall.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_bridalrequisites.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_caterers.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col sm={6}>
            <Card className="p-3 ">
                    <Card.Title>Weddiong Requesites</Card.Title>
                    <Row className="text-center">
                        <Col  >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_banquethall.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_bridalrequisites.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                        <Col >
                            <img className=" rounded w-100 mb-3" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/hkim_caterers.png?w=256&q=75"/>
                            <span className="">Banquet Halls</span>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Home

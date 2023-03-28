import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faStar } from "@fortawesome/fontawesome-free-solid"
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { URL } from "../helper/Helper"
import { useState } from "react"

const SearchFilter = () => {

    //2.1 Hooks Area
    const [bussinesses,setBussinesses] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

        useEffect(()=>{
            console.log("cat_name______>",searchParams.get("cat_name"));
             fetch(`${URL}/api/bussinesses?populate=*&filters[bussiness_categories][name][$containsi]=${searchParams.get("cat_name")}`)
            //  fetch(`${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get("cat_name")}`)
            .then(res=> res.json())
            .then(data=>{
                console.log("data.data -------->",data.data);
                setBussinesses(data.data)
            })
            .catch((err)=>err);
            // http://localhost:1337/api/bussinesses?populate=*&filters[bussiness_category][name][$containsi]=

        }, [])
    // 2.2



    // 2.3


    return (
        <>
            <Row className="p-4 ">
                <Col sm={9}>
                    {
                        bussinesses && bussinesses.map((cv,idx,arr)=>{
                            return <Card key={idx} className="" style={{cursor:"pointer"}} onClick={()=>{navigate("/detail?hotel_id="+cv.id)}} >
                                        <Row className="p-2" >
                                            <Col sm={3} >
                                                <Card.Img className="img-fluid h-75 " variant="top" src={URL+cv.attributes.photo.data[0].attributes.url}/>
                                            </Col>
                                            <Col  sm={9}>
                                                <Card.Body>
                                                    <Card.Title>{cv.attributes.name}</Card.Title>
                                                    <Card.Text className="">{cv.attributes.address}</Card.Text>
                                                    <Badge bg="success" className="fs-6 p-2 me-1">3.2</Badge>
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                    <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                                    <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                                    <span className="ms-1 ">5,599</span>
                                                   
                                                    <Card.Text>
                                                        <span style={{color:"green" ,marginRight:"5px"}}>Open</span>
                                                        <span>util 12:00am .31 Years In Business</span> 
                                                    </Card.Text>
                                                    <Badge bg="light" className="me-2 " text="dark">makkhan dasi</Badge>
                                                    <Badge bg="light" className="me-2 " text="dark">Fine Dining</Badge>
                                                    <Badge bg="light" className="me-2 " text="dark">Dhaba</Badge>
                                                    <Badge bg="light" className="me-2 " text="dark">Pure Vegetairian</Badge>
                                                    <Badge bg="light" className="me-2 " text="dark">Jain</Badge>
                                                    <br />
                                                    <Card.Text className="mt-2">{cv.attributes.desc}</Card.Text>
                                                    <a href={"tel:"+cv.attributes.phone}  className="btn btn-success " onClick={(e)=>{e.stopPropagation()}}>
                                                        <FontAwesomeIcon style={{transform: "rotate(90deg)" ,marginRight:"10px"}} icon={faPhone}/>
                                                        {cv.attributes.phone}
                                                    </a>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card> 
                                       
                        })
                    }
                    
                </Col>
                <Col sm={3} className="">
                    <Card className="h-100 ">
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SearchFilter

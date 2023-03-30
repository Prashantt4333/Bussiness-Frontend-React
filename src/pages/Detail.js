import {
  faCheck,
  faPhone,
  faStar,

} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Badge, Button, Card, Carousel, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { URL } from "../helper/Helper";

const Detail = () => {
  // Hooks Area
  const [searchParams, setSearchParams] = useSearchParams();
  const [busDetails, setBusDetails] = useState([]);
  const [reviewPayload, setReviewPayload] = useState({
                                                        "data": {
                                                          "ratescale":4,
                                                          "Description": "Ek no..",
                                                          "users_permissions_users": [
                                                          8
                                                          ],
                                                          "bussinesses": [
                                                            49
                                                          ]
                                                        }
                                                      })
  const [busPhotos, setBusPhotos] = useState([]);
  const [busName, setBusName] = useState("");

  useEffect(() => {
    console.log("business-------->>", searchParams.get("business"));
    let bussiness = searchParams.get("business");
    fetch(`${URL}/api/bussinesses?populate=*&filters[id][$eq]=`+bussiness)
      .then((res) => res.json())
      .then((data) => {
        console.log("detail -------->", data);
        if (data.data.length > 0) {
          setBusDetails(data.data);
          //  busDetails[0].attributes.photo.data
          setBusPhotos(data.data[0].attributes.photo.data);
          setBusName(data.data[0].attributes.name);
        }
       
      })
      .catch((err) => err);
  }, []);

  let star = (e) => {
    console.log("eeeeeeee",e.target);
    console.log("classList",e.target.classList);
    let elem = e.target;
    let revie_desc = document.querySelector(".revie_desc").value;
    console.log("revie_desc",revie_desc);
    console.log("--",elem.getAttribute("data-rateno"))
    setReviewPayload({
      ...reviewPayload,
      ratescale:elem.getAttribute("data-rateno"),

      data:{
        ...reviewPayload.data,
        ratescale:parseInt(elem.getAttribute("data-rateno")),
        Description:revie_desc

      }
    })
    
    elem.classList.replace("text-secondary","text-warning");

  }
  let submitReview = (e)=>{


    console.log(reviewPayload);
    let elem = e.target;
    let revie_desc = document.querySelector(".revie_desc").value;
    console.log("revie_desc",revie_desc);
    console.log("--",elem.getAttribute("data-rateno"))
    setReviewPayload({
      ...reviewPayload,
      ratescale:elem.getAttribute("data-rateno"),

      data:{
        ...reviewPayload.data,
        ratescale:parseInt(elem.getAttribute("data-rateno")),
        Description:revie_desc

      }
    })
  }

  return (
    <>
      <Row className="p-4">
        <Col>
          <Card>
            <Row>
              <Col sm={4}>
                <Carousel className="d-block w-100 p-2 " indicators={false}>
                  {busPhotos &&
                    busPhotos.map((cv, idx, arr) => {
                      console.log("====cv", cv);
                      return (
                        <Carousel.Item key={idx}>
                          <img
                            style={{ height: "200px" }}
                            className="d-block w-100 rounded"
                            src={URL + cv.attributes.url}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      );
                    })}
                </Carousel>
              </Col>
              <Col className="p-2">
                {busDetails &&
                  busDetails.map((cv, idx, arr) => {
                    return (
                      <Row key={idx} className="p-2">
                        <Col>
                          <Card.Title>{cv.attributes.name}</Card.Title>

                          <Badge bg="success" className="fs-6 p-2 me-1">
                            3.2
                          </Badge>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-secondary"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-secondary"
                          />
                          <span className="ms-1 ">5,599</span>
                          <Card.Text className="">
                            {cv.attributes.address}
                          </Card.Text>
                          <Card.Text>
                            <span
                              style={{ color: "green", marginRight: "5px" }}
                            >
                              Open
                            </span>
                            <span>util 12:00am .31 Years In Business</span>
                          </Card.Text>
                          {/* <Card.Text className="mt-2">{cv.attributes.desc}</Card.Text> */}
                          <Link
                            to={"tel:" + cv.attributes.phone}
                            className="btn btn-success "
                           
                          >
                            <FontAwesomeIcon
                              style={{
                                transform: "rotate(90deg)",
                                marginRight: "10px",
                              }}
                              icon={faPhone}
                            />
                            {cv.attributes.phone}
                          </Link>
                        </Col>
                      </Row>
                    );
                  })}
              </Col>
            </Row>
          </Card>
          <Row className=" mt-3 mb-3">
            <Col sm={8}>
              <Card className="">
                <Card.Header className="bg-white">
                  <Card.Title className="mb-3 ">Timing </Card.Title>
                    <Card.Text>
                      <span className="me-3 ">mon-sat</span>
                      <span>6:00 am - 12:00 am</span>
                    </Card.Text>
                    <Card.Text>
                      <span className="me-3">Sun</span>
                      <span>Closed - Closed</span>
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Services</Card.Title>
                  <Table className="" >
                      <tr>
                      <td>
                        <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                        <span className="fs-5">Cardio Equipment</span >
                      </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Strength Training Equipment</span >
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Sational Support</span >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faCheck} className="bg-success text-white rounded-circle" style={{fontSize:"10px"}} />
                          <span className="fs-5">Nutritional Support</span >
                        </td>
                      </tr>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} >
              <Card className=" p-2">d</Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="p-4">
        <Col >
          <Card className="">
            <Row className="">
              <Col>
              </Col>
              <Col className="p-3">
                <Form>
                  <Form.Group className="mb-3 "  >
                      <FontAwesomeIcon icon={faStar} className="text-secondary me-1 fs-5 anil1" data-rateno="1" onMouseEnter={(e)=>{ star(e) }} />
                      <FontAwesomeIcon icon={faStar} className="text-secondary me-1 fs-5 anil2" data-rateno="2" onMouseEnter={(e)=>{ star(e) }} />
                      <FontAwesomeIcon icon={faStar} className="text-secondary me-1 fs-5 anil3" data-rateno="3" onMouseEnter={(e)=>{ star(e) }} />
                      <FontAwesomeIcon icon={faStar} className="text-secondary me-1 fs-5 anil4" data-rateno="4" onMouseEnter={(e)=>{ star(e) }} />
                      <FontAwesomeIcon icon={faStar} className="text-secondary me-1 fs-5 anil5" data-rateno="5" onMouseEnter={(e)=>{ star(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Tell Us Your Exp..</Form.Label>
                      <Form.Control className="revie_desc" as="textarea" rows={3} />
                    </Form.Group>
                  <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
    </>
  );
};

export default Detail;

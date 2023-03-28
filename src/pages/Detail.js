import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { URL } from '../helper/Helper';

const Detail = () => {
  // Hooks Area
  const [searchParams, setSearchParams] = useSearchParams();
  const [busDetails,setBusDetails] = useState([]);
  const [busPhotos,setBusPhotos] = useState([]);
  const [busName,setBusName] = useState("")


  useEffect(()=>{
    console.log("hotel_id-------->>",searchParams.get("hotel_id"));
    let hotelid = searchParams.get("hotel_id");
    fetch(`${URL}/api/bussinesses?populate=*&filters[id][$eq]=`+hotelid)
            .then(res=> res.json())
            .then(data=>{
                console.log("detail -------->",data);
              if(data.data.length > 0){
                 setBusDetails(data.data)
                //  busDetails[0].attributes.photo.data
                setBusPhotos(data.data[0].attributes.photo.data)
                setBusName(data.data[0].attributes.name)
              }                
                
            })
            .catch((err)=>err);
  },[]);

  return (
    <>
      <Row className='p-4'>
        <Col >
            <Card>
              <Row>
                <Col>
                  <Carousel className="d-block w-100 p-2 " indicators={false}>
                    {
                        busPhotos.map((cv,idx,arr)=>{
                          console.log("====cv",cv);
                            return  <Carousel.Item key={idx}>
                                        <img style={{height:"320px",}}
                                          className="d-block w-100 rounded"
                                          src={URL+cv.attributes.url}
                                          alt="First slide"
                                        />
                                      </Carousel.Item>

                        }) 
                    }
                  </Carousel>
                </Col>
                <Col className='p-2'>
                    <Card.Title>{busName}</Card.Title>
                </Col>
              </Row>
            </Card>
        </Col>
      </Row>
        
     
    </>
  )
}

export default Detail

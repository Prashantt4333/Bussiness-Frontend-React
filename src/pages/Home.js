import React, { useEffect, useState } from 'react'
import URL from '../helper/Url';
 

const Home = () => {
    //Hooks area 
    const [bussinessCategory,setBussinessCategory] = useState([]);



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
       .catch(()=>{
       
       })
    }, []);

  return (
    <>
        <h1>Home Page</h1>
        <ul className='nav'>
            {
                bussinessCategory.map((cv,idx,arr)=>{
                    return  <li key={idx} className='me-3'>
                                <a href='#'>
                                    <img className=' ms-4 ' src={'http://localhost:1337'+cv.attributes.image.data.attributes.url}/>
                                    <br/>
                                    <span className='ms-3 '>{cv.attributes.name}</span>
                                </a>
                            </li>
                })
            }
        </ul>
    </>
  )
}

export default Home

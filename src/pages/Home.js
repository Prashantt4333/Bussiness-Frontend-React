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
                                    <div style={{ }}>
                                        <img className=' ms-4 p-3 rounded' style={{width:"70px", border:"1px solid grey",}} src={'http://localhost:1337'+cv.attributes.image.data.attributes.url}/>
                                        <br/>
                                        <span className='' style={{marginLeft:"20px" ,width:"100%"}}>{cv.attributes.name}</span>                                        
                                    </div>
                                </a>
                            </li>
                })
            }
        </ul>
    </>
  )
}

export default Home

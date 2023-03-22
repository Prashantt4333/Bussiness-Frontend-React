import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    //2.1
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkToken()
    }, []);
    //2.2
    let checkToken = ()=>{
        //alert('Inside protected route');
        let token = window.localStorage.getItem('jwt_token');
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }else{
            setIsLoggedIn(true);
        }
    }

    //2.3
    return (
        <>
            { isLoggedIn === true?props.children:null}
        </>
    )
}

export default ProtectedRoute;

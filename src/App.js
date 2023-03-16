//Import Area
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './component/ui/Layout';
import BussinessRegister from './pages/BussinessRegister';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';


//Defination Area
const App = () => {
    //Hoks Area

    //Function Defination Area


    //Return Area
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='detail' element={<Detail />}></Route>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='register' element={<Registration />}></Route>
                    {
                        window.localStorage.getItem("JWT__Token") !== null &&
                        <Route path='bussiness_register' element={<BussinessRegister />}></Route>
                        
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

//Export Area
export default App;

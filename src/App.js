//Import Area
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './component/ui/Layout';
import ProtectedRoute from './component/ui/ProtectedRoute';
import BussinessRegister from './pages/BussinessRegister';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import SearchFilter from './pages/SearchFilter';



//Defination Area
const App = () => {
    //Return Area
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='register' element={<Registration />}></Route>

                    <Route path="detail" element={ <ProtectedRoute><Detail /></ProtectedRoute>} />
                    <Route path="bussiness_register" element={ <ProtectedRoute><BussinessRegister /></ProtectedRoute>} />
                    <Route path="search" element={ <ProtectedRoute><SearchFilter /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

//Export Area
export default App;

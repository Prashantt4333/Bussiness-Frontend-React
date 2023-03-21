//Import Area
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './component/ui/Layout';
import Navigation from './component/ui/Navigation';
import BussinessRegister from './pages/BussinessRegister';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';



//Defination Area
const App = () => {
    const [user, setUser] = React.useState(null);

    const handleLogin = () => {
        //API Call
        setUser({ id: '1', name: 'robin' })
    };
    const  handleLogout = () => {
        //alert('OK');
        window.localStorage.removeItem('jwt_token');
        setUser(null);

    };


    //Return Area
    return (
        <BrowserRouter>
            <Navigation logout={handleLogout} />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='detail' element={<Detail user={user} />}></Route>
                    <Route path='login' element={<Login login={handleLogin} />}></Route>
                    <Route path='register' element={<Registration />}></Route>
                    <Route path='bussiness_register' element={<BussinessRegister user={user} />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

//Export Area
export default App;

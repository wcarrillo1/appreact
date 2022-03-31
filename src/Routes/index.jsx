import React from "react"
import { BrowserRouter as Router,
Routes,
Route,
Link, 
Navigate} from "react-router-dom"
import Cookies from "universal-cookie"

import Seguidor from '../view/Seguidor/Seguidor'
import Nav from '../Base/Layouts/Navbar/index'
import Clientes from '../view/Clientes/Clientes'
import Pedidos from '../view/Pedidos/Pedidos'
import Login from '../view/Login/login'
const Index = () =>{
    const cookies = new Cookies();
    return (
      
        <Router>

            {cookies.get('id') && <Nav/>}
            
            <Routes>
               
                <Route exact path="/private/clientes" element={<Clientes/>}/>
                <Route exact path="/private/pedidos"  element={<Pedidos/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/seguidor"  element={<Seguidor/>}/>
            </Routes>
        </Router>
     
        )
}

export default Index
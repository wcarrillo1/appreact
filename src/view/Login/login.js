import React, {useEffect, useState, Fragment} from 'react'
import { Row, Col, Form, Button, Card, Container, ListGroupItem, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { PostRoute } from '../../Services/Private';
import Cookies from 'universal-cookie';
import { useForm } from 'react-hook-form'
import Log from '../../Base/assets/logo.png'
const Login = (props)=> {

    const [alldata, setAllData] = useState([]),
         { register, handleSubmit } = useForm(),
        cookies = new Cookies(),

        IniciarSession = async (data) =>  {
            const json = {
                username: data.username,
                password: data.password
            }
        const response = await PostRoute(`login/login`, json)
        setAllData((response.id>0) ? response: [])
        if (response.id){
            cookies.set("id",response.id, {path: "/private"})
            cookies.set("nombreCompleto",response.nombreCompleto, {path: "/private"})
            cookies.set("username", response.username, {path: "/private"})
            window.location.href = "/private/clientes"
        }else{
            alert("Usuario o contraseña incorrectos")
        }
   
    }
 
    useEffect(() => {
        if(cookies.get("id")){
            
            window.location.href = "/private/clientes"
        }
    },[])


    return(
           
                <div className="container">
                <Row>
                    
                </Row>
                <Row>
                    <Col sm={6} md={6} lg={6} xl={6}>
                        <Row>
                            <Col className="col-6 offset-1">
                            <br/>
                            <h1 className="text-center">Administracion De Pedidos </h1>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <br/>
                            <img src={Log} width="400px" height="200px"/>
                            </Col>
                        </Row>
                        
                    </Col>
               

                <Col sm={6} md={6} lg={6} xl={6}>
                    <br/>
               
                  <Form onSubmit={handleSubmit(IniciarSession)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                        type="text" 
                        name="username"
                        placeholder="Ingresa tu usuario"
                        { ...register("username",{
                                required: true
                        })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password{alldata.id}</Form.Label>
                        <Form.Control 
                        type="password"
                        placeholder="Password"
                        name="password"
                        { ...register("password", { 
                                required: true
                        })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar Sesion
                    </Button>
                    </Form>
                 </Col>
                   
                </Row>
                

         

                </div>
                 
            
            
       
       
       
    )
}

export default Login
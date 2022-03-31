import React from 'react'
import { Row, Col, Container, Nav,  Button, NavDropdown, Form, FormControl} from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


const Navbar = () => {
const cookies = new Cookies(),
cerrarSesion=()=>{
  cookies.remove('id', {path: '/private'} );
  cookies.remove('nombreCompleto', {path: '/private'} );
  cookies.remove('username', {path: '/private'} );
  window.location.href = "/"

}


    return (
      <>
      <Container>
         <Row>
        <Col sm={11}>
         <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            
              <NavLink to="/private/clientes"> Clientes</NavLink>
              
          </Nav.Item>
          <Nav.Item>
           
            <NavLink to="/private/pedidos"> Pedidos</NavLink>
             
          </Nav.Item>
        </Nav>
        </Col>
        <Col>
          <Button className="btn btn-danger my-2" onClick={() =>cerrarSesion()}>cerrar</Button>
        </Col>
        
      </Row>
      </Container>
     
     
    </>
    )
       
        
}

export default Navbar
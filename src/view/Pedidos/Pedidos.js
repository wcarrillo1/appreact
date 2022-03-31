import React, { useEffect, useState } from 'react'
import {GetRout, PostRoute} from '../../Services/Private'
import List from './List'
import { Row, Col, Form, Nav, Card, Container, ListGroupItem, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Formulario from './Form'
import FormularioC from './FormCambio';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Pedidos = () => {

const [allData, setAllData] = useState([]),
      [oneData, setOneData] = useState([]),
      [clientes, setClientes] = useState([]),
      [wared, setWared] = useState([]),
      [modal, setModal] = useState(false),
      [modalCambio, setModalCambio] = useState(false),

    cookies = new Cookies(),
toggleModal = (data) => {

    if(data === 1){
         setModal(true)
         setOneData(null)
        } 
    if(data === 0){ setModal(false) }
    
},
toggleModalCambio = (data) => {
    if(data){
        setModalCambio(true)
        One2(data)
         
        } 
    if(data === 0){ setModalCambio(false) }
    
},
datos = async () =>  {
    const response = await GetRout(`pedidos/all`)
    setAllData((response.length) ? response : [])
},
datosClientes = async () =>  {
    const response = await GetRout(`clientes/label`)
    setClientes((response.length) ? response : [])
},
datosWared = async (data) =>  {
    const response = await PostRoute(`clientes/wlabel`, { cliente : data.id })
    setWared((response.length) ? response : [])
},
One = async (data) => {
    const response = await PostRoute(`pedidos/one`, { id : data.id })
    setOneData((response[0]) ? response[0] : [])
    datosWared(data)
    setModal(true)
},
One2 = async (data) => {
    const response = await PostRoute(`pedidos/one`, { id : data.id })
    setOneData((response[0]) ? response[0] : [])
    datosWared(data)
},
StoreUpdate = async (data) => {
    let response = []
    response = await PostRoute(`pedidos/${!data.id ? 'store' : 'update' }`, data)
    {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
    {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
    datos()
    toggleModal(0)
   
},
CambioEstado = async (data) => {

    let response = []
      response = await PostRoute(`pedidos/cambioEstado`, data )
      {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
      {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
      datos()
      toggleModalCambio(0)
    
}

useEffect(() => {
    if(!cookies.get("id")){
        window.location.href = "/"
    }
},[])

useEffect(() => {
    datos()
    datosClientes()
},[])
return(
        <>
        <Container>

          <div style={{
                marginTop: '10px',
                marginBottom: '8',
                marginRight: '10px',
                marginLeft: '10px',
                //   marginTop: 10px; /* margen superior */
                //   margin-bottom: 8px; /* margen inferior */
                //   margin-left: 6px; /* margen izquierdo */
                //   margin-right: 5px; /* margen derecho */
             }}>
           <h1 className="text-center">Pedidos</h1>
            <Row>
              <Nav>
                  <Nav.Item className="mx-1">
                      <Formulario
                        StoreUpdate={StoreUpdate}
                        modal={modal}
                        toggleModal={toggleModal}
                        oneData={oneData}
                        wared={wared}
                        clientes={clientes}
                        datosWared={datosWared}
                        />
                  </Nav.Item>
                  <Nav.Item>
                      <FormularioC
                      toggleModalCambio={toggleModalCambio}
                      modalCambio={modalCambio}
                      CambioEstado={CambioEstado}
                      clientes={clientes}
                      wared={wared} 
                      datosWared={datosWared}
                      />
                  </Nav.Item>
              </Nav>
            </Row>
            </div>
            <div className="my-3">
            <List
            allData={allData}
            One={One}
            toggleModalCambio={toggleModalCambio}

           />  
            </div>
        
        <NotificationContainer/>
        </Container>
        
        </>
        
        
        
    )
}

export default Pedidos
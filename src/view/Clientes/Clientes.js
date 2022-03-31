import React, { useEffect, useState } from 'react'
import {GetRout, PostRoute} from '../../Services/Private'
import List from './List'
import { Row, Col, Form, Nav, Card, Container, ListGroupItem, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Formulario from './Form'
import FormWareHause from './FormWareHause'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Clientes = () => {

const [allData, setAllData] = useState([]),
      [oneData, setOneData] = useState([]),
      [clientes, setClientes] = useState([]),
      [wared, setWared] = useState([]),
      [modal, setModal] = useState(false),
      [modalWare, setModalWare] = useState(false),

    cookies = new Cookies(),
toggleModal = (data) => {

    if(data === 1){
         setModal(true)
         setOneData(null)
        } 
    if(data === 0){ setModal(false) }
    
},
toggleModalWare = (data) => {

    if(data === 1){ setModalWare(true) } 
    if(data === 0){ setModalWare(false) }
    
},
datos = async () =>  {
    const response = await GetRout(`clientes/all`)
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
    const response = await PostRoute(`clientes/one`, { id : data.id })
    setOneData((response[0]) ? response[0] : [])
    datosWared(data)
    setModal(true)
},
StoreUpdate = async (data) => {
    let response = []
    response = await PostRoute(`clientes/${!data.id ? 'store' : 'update' }`, data)
    {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)}
    {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
    datos()
    toggleModal(0)
   
},
StoreUpdateWhare = async (data) => {
    let response = []
    response = await PostRoute(`clientes/${!data.id ? 'wstore' : 'wupdate' }`, data)
    {response.response === 1 && NotificationManager.success(response.message, 'Guardado', 5000)} 
    {response.response !== 1 && NotificationManager.error(response.message, 'No Guardado', 5000)}
    
    datos()
    toggleModalWare(0)
   
},
Actions = async (data) => {
    // setShow(true)
    // const response = await PostRoute(`${nameController}/${ data.estado === 1 ? 'destroy' : 'active'}`, { id : data.id })
    // toast.success(response.message, OptionsToast)
    // All()
    // setShow(false)
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
           <h1 className="text-center">Clientes</h1>
            <Row>
              <Nav>
                  <Nav.Item className="mx-1">
                      <Formulario
                        StoreUpdate={StoreUpdate}
                        modal={modal}
                        toggleModal={toggleModal}
                        oneData={oneData}
                        wared={wared}
                        />
                  </Nav.Item>
                  <Nav.Item className="mx-1">
                      <FormWareHause
                        modalWare={modalWare}
                        toggleModaWare={toggleModalWare}
                        clientes={clientes}
                        StoreUpdateWhare={StoreUpdateWhare}
                        
                        />
                  </Nav.Item>
              </Nav>
            </Row>
            </div>
            <div className="my-3">
            <List
            allData={allData}
            One={One}
           />  
            </div>
            
        <NotificationContainer/>
        </Container>
        
        </>
        
        
        
    )
}

export default Clientes
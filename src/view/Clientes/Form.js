import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ListW from './ListWared'
const Formulario = ({StoreUpdate, modal, toggleModal, oneData, wared}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : oneData ? oneData.id : null,
            nombres : data.nombres,
            apellidos : data.apellidos,
            direccion : data.direccion,
            telefono : data.telefono
          }
          StoreUpdate(json)
          setShow(false)
          reset()
        },

        setData = async () => {
          await setValue('nombres', oneData.nombres)
          await setValue('nombres', oneData.nombres)
          await setValue('apellidos', oneData.apellidos)
          await setValue('direccion', oneData.direccion)
          await setValue('telefono', oneData.telefono)
       
      }
      useEffect(() => {
        async function fetchMyAPI() {
          reset()
      }
      fetchMyAPI()
        
      },[modal])
  
      useEffect(
          () => {
              async function fetchMyAPI() {
                  if ( await oneData) {
                    await setData() }
              }
              fetchMyAPI()
          },[oneData]
      )



    return (
        <>
        <Button variant="primary" onClick={()=>toggleModal(1)}>
        Nuevo Cliente
        </Button>
      
        <Modal size="lg" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nuevo Cliente</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
         <Row>
           <Col>
           <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
             type="text" 
             name="nombres"
             placeholder="Ingresa Los Nombres"
             { ...register("nombres",{
                    required: true
             })} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                { ...register("apellidos", { 
                        required: true
                })} />
        </Form.Group>
           </Col>
         </Row>
         <Row>
           <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="telefono"
                  name="telefono"
                  { ...register("telefono", { 
                          required: true
                  })} />
              </Form.Group>
           </Col>
           <Col>
            <Form.Group className="mb-3">
            <Form.Label>Direcion</Form.Label>
            <Form.Control
             as="textarea" 
             type="text"
             placeholder="Direccion"
             name="direccion"
             { ...register("direccion", { 
                    required: true
             })} />
        </Form.Group>
           </Col>
         </Row>
         {
           oneData && 
           <Row>
          <Col>
          <ListW
            wared={wared}
          />
          </Col>
          </Row>
         }
        
        
        
            </Modal.Body>
           
          <Modal.Footer>
            <Button variant="danger" onClick={()=>toggleModal(0)}>
              Salir
            </Button>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
           </Form>
        </Modal>
      
      </>
    )

}

export default Formulario
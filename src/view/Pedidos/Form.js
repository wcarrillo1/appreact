import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
const Formulario = ({StoreUpdate, modal, toggleModal, oneData, wared, clientes,datosWared}) => {
    
    const [show, setShow] = useState(false),
        { register, handleSubmit, reset, setValue, control, watch } = useForm(),

        onSubmit =  (data) =>{
          const json = {
            id : (oneData) ? oneData.id : null,
            wharedhouse : data.waredHouse.value,
            shpName : data.shpName,
            totpcs : data.totpcs,
            totWtLbs : data.totWtLbs,
            descripcion : data.descripcion
          }
          StoreUpdate(json)
          // setShow(false)
          // reset()
        },

      setData = async () => {      
          await setValue('shpName', oneData.shpName)
          await setValue('totpcs', oneData.totpcs)
          await setValue('totWtLbs', oneData.totWtLbs)
          await setValue('descripcion', oneData.descripcion)
         
       
      },

      ClientesSelect = watch('cliente')

      useEffect(() => {
        datosWared(ClientesSelect)
      },[ClientesSelect])


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
        Nuevo Pedido
        </Button>
      
        <Modal size="lg" show={modal} onHide={()=>toggleModal(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Nuevo Pedido</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
         <Row>
           <Col>
           <Form.Group className="mb-3">
           <Controller 
                  name="cliente"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        defaultValue={null}
                        options={clientes}
                        placeholder={"Seleccionar Cliente"}
                        noOptionsMessage={()=>'sin resultados'}
                      />  
                      )
                    }
                  }
                  rules={{ required: "Este campo es requerido" }}   
                /> 
            </Form.Group>
           </Col>
           <Col>
           <Form.Group className="mb-3">
          <Controller 
                  name="waredHouse"
                  control={control}
                  render={({ field }) =>{
                    return(
                      <Select 
                        {...field}
                        isClearable
                        isSearchable
                        defaultValue={null}
                        options={wared}
                        placeholder={"Seleccionar WharedHouse"}
                        noOptionsMessage={()=>'sin resultados'}
                      />  
                      )
                    }
                  }
                  rules={{ required: "Este campo es requerido" }}   
                /> 
            </Form.Group>
           </Col>
         </Row>
         <Row>
           <Col>
              <Form.Group className="mb-3">
                  <Form.Label>shpName</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="shpName"
                  name="shpName"
                  { ...register("shpName", { 
                          required: true
                  })} />
              </Form.Group>
           </Col>
           <Col>
            <Form.Group className="mb-3">
            <Form.Label>totpcs</Form.Label>
            <Form.Control
             type="text"
             placeholder="Ingrese solo numeros"
             name="totpcs"
             { ...register("totpcs", { 
                    required: true
             })} />
        </Form.Group>
           </Col>
            </Row>
            <Row>
           <Col>
              <Form.Group className="mb-3">
                  <Form.Label>totWtLbs</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="ingrese solo numeros"
                  name="totWtLbs"
                  { ...register("totWtLbs", { 
                          required: true
                  })} />
              </Form.Group>
           </Col>
           <Col>
            <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
             type="text"
             placeholder="descripcion"
             name="descripcion"
             { ...register("descripcion", { 
                    required: true
             })} />
        </Form.Group>
           </Col>
            </Row>
        
        
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
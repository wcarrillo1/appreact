import { Modal, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
const Formulario = ({StoreUpdateWhare, modalWare, toggleModaWare, oneData, clientes, wared}) => {
    
    const { register, handleSubmit, reset, setValue, control } = useForm(),

        onSubmit =  (data, e) =>{
          const json = {
            cliente : data.cliente.value,
            waredhouse : data.wharedHouse
          }
          StoreUpdateWhare(json)
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
      },[modalWare])
  
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
        <Button variant="primary" onClick={()=>toggleModaWare(1)}> Asignar Warehouse </Button>
      
        <Modal size="lg" show={modalWare} onHide={()=>toggleModaWare(0)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Asignar WhareHouse</Modal.Title>
          </Modal.Header>
           <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
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
        <Form.Group className="mb-3">
            <Form.Label>Numero de Warehouse</Form.Label>
            <Form.Control 
             type="text"
             placeholder="WhareHouse"
             name="wharedHouse"
             { ...register("wharedHouse", { 
                    required: true
             })} />
        </Form.Group>
            </Modal.Body>  
          <Modal.Footer>
            <Button variant="danger" onClick={()=>toggleModaWare(0)}>
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
import react, { useEffect} from 'react'
import { Modal,Button, Form, Col, Row } from "react-bootstrap"
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const FormularioC = ({toggleModalCambio, modalCambio, CambioEstado, clientes, wared,datosWared}) => {

      const { handleSubmit, register, watch, control, reset } = useForm(),
         
      OnSubmit = (data,e) => {
        const json = {
          waredhouse : data.waredHouse.value,
          estado : e.target.estado.value,
        }
        CambioEstado(json)
        reset()
      },

      ClientesSelect = watch('cliente')

      useEffect(() => {
        datosWared(ClientesSelect)
      },[ClientesSelect])

      



  return (
    <>
     <Button variant="danger" onClick={()=>toggleModalCambio(1)}>Estado Del Warehouse</Button>
     <Modal show={modalCambio} size="lg">
       <Modal.Header>
         <h6 >Cambiar Estado Warehouse</h6>
       </Modal.Header>
       <Form onSubmit={handleSubmit(OnSubmit)}>
       <Modal.Body>
         <Row>
          <Col>
          <Form.Group>
          <Controller
           name="cliente"
           control={control}
           render={({field}) =>{
            return( <Select
             {...field}
             isClearable
             isSearchable
             defaultValue={null}
             options={clientes}
             placeholder={"Seleccione Un Cliente"}
             noOptionsMessage={()=>'Sin resultados'}

             />
             )
           }
          }
          rules={{ required : "Este Campo es requerido"}}
          />
        </Form.Group>
          </Col>
          <Col>
          <Form.Group>
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
               placeholder={"Seleciona un WareHouse"}
               noOptionsMessage={()=>{"Sin Resultados"}}
               />
             )
             
           }}
          />
          </Form.Group> 
          </Col>
         </Row>
         <br />
         <Row>
           <Col>
   
         <Form.Group>
             <Row>
             <Col><Form.Check label="Bodega Miami" name="estado" inline type="radio" value={1}></Form.Check></Col>

            <Col><Form.Check label="En Recoleccion Miami-Gt" name="estado" inline type="radio" value={2}></Form.Check></Col>
            <Col><Form.Check label="En Transito Miami-Gt" name="estado" inline type="radio" value={3}></Form.Check></Col>
            </Row>
            <Row> 
            <Col><Form.Check label="Ingreso a COMBEX GT" name="estado" inline type="radio" value={4}></Form.Check></Col>
            <Col><Form.Check label="Proceso Aduanal" name="estado" inline type="radio" value={5}></Form.Check></Col>
            <Col><Form.Check label="Liberado Para Entrega" name="estado" inline type="radio" value={6}></Form.Check></Col>
            </Row>
            <Row> 
            <Col><Form.Check label="En Ruta De Entrega" name="estado" inline type="radio" value={7}></Form.Check></Col>
            <Col><Form.Check label="Entregado" name="estado" inline type="radio" value={8}></Form.Check></Col>
            <Col><Form.Check label="Retorno a Bodega" name="estado" inline type="radio" value={9}></Form.Check></Col>
            </Row>
         </Form.Group>
          
         </Col>
         </Row>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="danger" onClick={()=>toggleModalCambio(0)}>
           Salir
         </Button>
         <Button variant="success" type="submit">Guardar</Button>
       </Modal.Footer>
       </Form>
     </Modal>
    </>
   
  )
}

export default FormularioC
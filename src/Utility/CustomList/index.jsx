import { Alert } from 'reactstrap'

  export const CustomText = (data) => {
    return  <div data-tag="allowRowEvents" style={{ fontSize:'15px', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
              { data } 
            </div>
  }


  export const EstadoLista = ({row}) => {
    const Variante = [
        'danger',
        'danger',
        'secondary',
        'secondary',
        'info',
        'info',
        'success',
        'warning',
        'danger'
        

    ]

    return (
        <Alert color={Variante[row.estado]} className="w-100 text-center alert-xs font-weight-bolder" style={{ padding: '5px' }}>
    
            { (row.estado === 1) && 'Bodega MIAMI'}
            { (row.estado === 2) && 'En espera de recoleccion en MIAMI-GT' }
            { (row.estado === 3) && 'En Transito MIAMI-GT' }
            { (row.estado === 4) && 'Ingreso a COMBEX Guatemala'}
            { (row.estado === 5) && 'Proceso Aduanal'}
            { (row.estado === 6) && 'Liberado Para Entregado'}
            { (row.estado === 7) && 'En Ruta de Entregado'}
            { (row.estado === 8) && 'Entregado'}
            { (row.estado === 9) && 'Retorno a Bodega'}
        </Alert>
    )
}

  export default ( 
      CustomText,
      EstadoLista
  )
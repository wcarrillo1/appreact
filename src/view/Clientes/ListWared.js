import React, { Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Input, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { CustomText, EstadoLista } from  '../../Utility/CustomList/index'
import * as Icon from 'react-feather'

const List = ({wared, Actions, One}) => {
  const  Columns = [
        {
          name: 'WaredHouse',
          column: 'label',
          sortable: true,
          center: true,
          cell: row => CustomText(row['label'])
        },
        {
          name: 'Estado',
          column: 'estado',
          sortable: true,
          center: true,
          width:'200px',
          cell: row => <EstadoLista row={row} />
        },
        {
          name: 'Acciones',
          column: 'id',
          sortable: true,
          center: true,
          cell: row => (
            <UncontrolledButtonDropdown>
              
              <DropdownItem onClick={() => One(row, 3)}>
                <Icon.Edit className="mr-2" size={15} />
              </DropdownItem>
              <DropdownItem onClick={() => Actions(row) }>
              <Icon.Check className="mr-2" size={15} />  
               
              </DropdownItem>
           
          </UncontrolledButtonDropdown>
          )
        }
    ]

    return(
        <div className="list">
            <Row>
            <Container>
            <DataTable
                // dense
                noHeader
                highlightOnHover
                pagination
                data={wared }          
                columns={Columns}
                className='table-responsive'
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                paginationComponentOptions={
                    {
                    rowsPerPageText: '',
                    rangeSeparatorText:''
                    }
                }
                noDataComponent='Sin Registros'
            />
        </Container>
        </Row> 
        </div>
       
        
        
        
    )
}

export default List
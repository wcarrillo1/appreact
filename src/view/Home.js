import React, { useEffect, useState} from 'react'
import Routes from '../Routes/index'
import { GetRout } from '../Services/Private'
const Home = () => {

   const datos = async () =>  {
        const response = await GetRout(`clientes/all`)
       console.log(response)
    }

    useEffect(() => {
        datos()
    })

    return (
        <h1>home prueba</h1>
    )
}

export default Home
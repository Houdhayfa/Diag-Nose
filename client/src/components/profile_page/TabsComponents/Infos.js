import React from 'react'
import InfosCard from './InfosCard'

function Infos(props) {
    const {value,index}=props
    return (
        <div>
          {value==index? (
           <InfosCard/>
          ):null}  
        </div>
    )
}

export default Infos

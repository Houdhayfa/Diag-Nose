import React from 'react'

function Infos(props) {
    const {value,index}=props
    return (
        <div>
          {value==index? (
           <h1> Infos</h1>
          ):null}  
        </div>
    )
}

export default Infos

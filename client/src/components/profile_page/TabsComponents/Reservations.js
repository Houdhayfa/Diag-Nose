import React from 'react'

function Reservations(props) {
    const {value,index}=props
    return (
        <div>
          {value==index? (
           <h1> Reservations</h1>
          ):null}  
        </div>
    )
}

export default Reservations

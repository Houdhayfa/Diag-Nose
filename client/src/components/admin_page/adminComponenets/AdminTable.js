import React from 'react'
import {useSelector} from 'react-redux'
import MaterialTable from 'material-table'
import Toast from '../../register_page/Toast'


function AdminUsers({data,columns,title,actions}) {

    const userMessage=useSelector((state) => state.userReducer.msg)
    const reservationMessage=useSelector((state) => state.reservationReducer.msg)
    const demandeMessage=useSelector((state) => state.demandeReducer.msg)
    return (
        <div >
            <MaterialTable title={title}
                           data={data} 
                           columns={columns}
                           actions={actions}
                           options={{
                           paging:false,
                           headerStyle:{
                                backgroundColor: 'orange',
                                color: '#FFF'
                            },
                            actionsColumnIndex: -1}}
                            localization={{ toolbar: { searchPlaceholder: 'Chercher' } }}// changer le placeholder
                            />
                            <Toast msg={userMessage}/>
                            <Toast msg={reservationMessage}/>
                            <Toast msg={demandeMessage}/>
                            
        </div>
        
    )
}

export default AdminUsers

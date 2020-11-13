import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import MaterialTable from 'material-table'
import Toast from '../../register_page/Toast'
import {resetMessage} from '../../../Store/actions/authActions'

function AdminTable({data,columns,title,actions}) {

/*############# Toast messages #################*/
    const userMessage=useSelector((state) => state.userReducer.msg)
    const reservationMessage=useSelector((state) => state.reservationReducer.msg)
    const demandeMessage=useSelector((state) => state.demandeReducer.msg)
const dispatch=useDispatch()
useEffect(() =>{
dispatch(resetMessage())
},[])
    return (
        <div  >
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
                            actionsColumnIndex: -1}}//place les actions à gauche
                            localization={{ toolbar: { searchPlaceholder: 'Chercher' } }}// changer le placeholder
                            />
                            <Toast msg={userMessage}/>
                            <Toast msg={reservationMessage}/>
                            <Toast msg={demandeMessage}/>
                            
        </div>
        
    )
}

export default AdminTable

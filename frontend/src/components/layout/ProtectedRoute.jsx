import React, { useContext } from 'react'
import UserContext from '../store/UserContext'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
 
    const {user } =  useContext(UserContext);
   
    if(!user){
      return <Navigate to="/login" replace/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute
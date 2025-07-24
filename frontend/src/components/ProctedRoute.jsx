import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProctedRoute = ({children}) => {
   const navigate = useNavigate();
   useEffect(()=>{
      const token = localStorage.getItem('token');
      if(!token){
         navigate('/login');
      }
   },[navigate])
  return (
    <>{children}</>
  )
}

export default ProctedRoute;
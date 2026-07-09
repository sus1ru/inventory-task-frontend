import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({children}: any) => {
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated){
return <Navigate to='/login'
    /> };
    return  children;


}

export default ProtectedRoutes;
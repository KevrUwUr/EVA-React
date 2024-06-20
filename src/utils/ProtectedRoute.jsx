import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute= ({
    canActivate,
    redirectPath ='/'
})=>{
    if (!activate){
        return <Navigate to={redirectPath} replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute= ({
    activate,
    redirectPath ='/'
})=>{
    if (!activate){
        return <Navigate to={redirectPath} replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute
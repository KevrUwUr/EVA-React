import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { Toast } from "../assets/js/alertConfig";
const ProtectedRoute = ({ redirectPath = '/',allowedUserTypes = []}) => {
  const { accessToken,userType} = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [rolAuthorized,setRolAuthorized]=useState(null)

  useEffect(() => {
    const getToken = async () => {
        Swal.fire({
            title: 'Cargando...',
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: false,
          });
      try {
        const response = await axios.post(
          'http://localhost/API-EVA/LoginController/renewToken',
          {},
          {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.status=="error"){
            setIsAuthorized(false);
            
            Swal.close();
            Toast.fire({
                icon: "danger",
                title: `Tu sesion ha expirado`,
              });

            console.log("Error de sesion expirada, estatus del token")
        }else{
          setIsAuthorized(true);   
          if (allowedUserTypes.includes(parseInt(userType))){
            setRolAuthorized(true)
          }else{
            setRolAuthorized(false)
          }
          Swal.close(); 
        }
    
       
      } catch (error) {
        setIsAuthorized(false);
        Swal.close();
        Swal.fire({
            title: 'Tu sesión ha finalizado',
            allowOutsideClick: true,
          });
      }
    };
    console.log(allowedUserTypes,"    numero de rol:   ",parseInt(userType))
    if (accessToken) {
      getToken();
    }else {
      setIsAuthorized(false);
    }
   
  }, [accessToken,userType, allowedUserTypes]);

  if (isAuthorized === null) {
    // Mientras se verifica el token, puedes mostrar un loader o similar
    return null;
  }

  if (!isAuthorized || !rolAuthorized) {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('languageUser');
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

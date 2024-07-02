import { useState,useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../context/UserContext'
import "../../assets/css/login.css";
import LogoEVA from "../../assets/img/logo EVA2.0.png";

import axios from 'axios'
const LogIn = () => {

  const nav = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error,Seterror]=useState('');
  const { userId, setUserId, userType, setUserType, accessToken, setAccessToken, name, setName } = useContext(UserContext);

  const log= async(event)=>{
    event.preventDefault();
    try{
      const parameters={
        "email":username,
        "password":password
      }
      const response= await axios.post(`http://localhost/API-EVA/LoginController/Auth`,parameters)
      const responseData=response.data
   
      if(responseData.status===true){
        if(responseData.userLogin.state===1){
          console.log(responseData)
          setUserId(responseData.userLogin.id)
          setUserType(responseData.userLogin.type)
          setAccessToken(responseData.userLogin.accessToken)
          if(responseData.userLogin.type===1 || responseData.userLogin.type===2 ){
            nav("/admin")
          } else if(responseData.userLogin.type===3){
            nav("/editor")
          } else if(responseData.userLogin.type===4){
            nav("/index=Quality")
          }
          else{
            nav("/inactive")
          }
        }else{
          nav("/auth/inactive")
        }
       
      }else{
        Seterror("")
      }
      

    }catch(error){
      console.error(error)
      if (error.response && error.response.status ===404){
        Seterror('Usuario no encontrado');
      }else if (error.response && error.response.status===401){
        Seterror('Usuario o contraseña incorrecto')
      }
      
      else{
        Seterror('Error en el servidor, por favor intentalo de nuevo mas tarde');
      }
  }}
  
  return (
    <div className="App">
      <div id="login-body" className="bodyLogin">
        <div className="col container-img">
          <img src={LogoEVA} className="d-sm-block d-lg-none" alt="" />
        </div>
        <div className="login-container container col-sm-12">
          <h2 className="text-start tittle-session">Iniciar Sesión</h2>
          <form id="login-form" onSubmit={log}>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                required
                id="email"
                name="email"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <i className=" fa-sharp fa-solid fa-envelope"></i>
              <label> Correo</label>
              <p>loremipsum@gmail.com</p>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock"></i>
              <label> Contraseña</label>
              <p>● ● ● ● ● ● ● ● ● ●</p>
            </div>
           
            {error && <p className='text-danger text-center'>{error}</p>}
            
              <button
                className="btn access-button"
                id="bot"
                type="submit"
              >
                Ingresar
              </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

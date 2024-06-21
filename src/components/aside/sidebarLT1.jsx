import React,{ useState, useContext, useEffect } from "react";
import "../../assets/css/header_aside.css";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import useInput from "../../components/hooks/useInput";

import axios from 'axios'
/* import ManageUser from "../Modals/manageUser"; */

const SidebarLT1 = () => {
  const { accessToken, userId } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    password: '',
    language: 'es' // valor predeterminado, puedes cambiarlo según tus necesidades
  });
  const lastName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const firstName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const middleName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const email = useInput({defaultValue: "",validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/, });
  const language = useInput({ defaultValue: "", validate: /^(es|en|it|pt)$/ });
  const password = useInput({defaultValue: "",validate:/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/,});

  const nav = useNavigate();
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  useEffect(()=>{
   getInfo();
  },[])


  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('accessToken');
    nav("/");
  }
  const url="http://localhost/API-EVA/userController/userbyId/"
  const urlp="http://localhost/API-EVA/userController/putUser/"


  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };

  const getInfo = async () => {
    try {
      console.log(userId);
      const response = await axios.get(`${url}${userId}`, config);
      setUserInfo(response.data);
      console.log(hours,":",minutes,":",seconds)
      firstName.handleChange(userInfo.firstname || "");
      middleName.handleChange(userInfo.middlename || "");
      lastName.handleChange(userInfo.lastname || "");
      email.handleChange(userInfo.email || "");
      password.handleChange(userInfo.password || "");
      language.handleChange(userInfo.language || "en");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 

  const updateInfo=async(event)=>{
    event.preventDefault();
    var parameters
    console.log(userInfo)
    if (
      lastName.input.trim() === "" ||
      firstName.input.trim() === "" ||
      email.input.trim() === "" ||
      language.input.trim()===""
    ) {
      alert("Informacion no diligenciada")
    } else {
        try{
          parameters = {
            firstname: firstName.input,
            middlename: middleName.input,
            lastname: lastName.input,
            email: email.input,
            language: language.input,
            last_visit_date: "",
          };
          password.input.length>8? parameters['password']=password.input: null;
          const response= await axios.put(`${urlp}${userId}`,parameters,config)
          if(response.data.status){
            //hacer un timeout alert 3s y si le da aceptar antes que se reloguee instantaneamente
            window.location.reload()
          }
          
        }catch(error){
          console.error(error)
        }
    }
    
  }
  return (
    <div className="col-1 col-md-1 col-lg-1 d-lg-block d-none h-100 rounded-end-4 collapse navbar-collapse ps-2 align-content-center" id="navbarNav" style={{position:"absolute"}}>
      <div id="div_ul" className="h-75 pe-0 ps-2 align-content-center">
        <ul className="pt-3 rounded-end-4">
          <li className="nav-item">
            <a className="nav-link tooltip-container" href="/admin">
              <i id="iconoDegradado" className="fa-solid fa-house"></i>
            </a>
          </li>
          <br />
          <li className="nav-item">
            <a className="nav-link tooltip-container" href="/admin_list">
              <i id="iconoDegradado" className="fa-solid fa-user"></i>
            </a>
          </li>
          <br />
          <li className="nav-item">
            <a className="nav-link tooltip-container" href="/client_list">
              <i id="iconoDegradado" className="fa-solid fa-id-card-clip"></i>
            </a>
          </li>
          <br />
          <a className="dropdown-toggle nav-link nav-item link-dark" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i id="iconoDegradado" className="fa-solid fa-gear"></i>
          </a>
          <li className="nav-item dropdown">
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item"  onClick={()=>getInfo()} data-bs-toggle="modal" data-bs-target="#userModalInfo">Gestionar cuenta</button>
              </li>
              <li>
                <button className="dropdown-item" onClick={logout}>Cerrar sesión</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>



      <div className="modal fade" tabIndex="-1"  aria-hidden="false" id="userModalInfo">
      <div className="modal-dialog modal-m modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-body">
            <form id="manage-user-self" onSubmit={updateInfo}>
              <div id="msg"></div>

              <div className="form-group m-2">
                <label htmlFor="firstname" className="form-label">Primer nombre</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  placeholder=" "
                  value={firstName.input}
                  onChange={(e) => firstName.handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="middlename" className="form-label">Segundo nombre</label>
                <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="form-control"
                  placeholder=" "
                  value={middleName.input}
                  onChange={(e) => middleName.handleChange(e.target.value)}
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="lastname" className="form-label">Apellidos</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  placeholder=" "
                  value={lastName.input}
                      onChange={(e) => lastName.handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="email" className="form-label">Correo</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder=" "
                  value={email.input}
                      onChange={(e) => email.handleChange(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => password.handleChange(e.target.value)}
                />
                <small>
                  <i>Deje esto en blanco si no desea cambiar la contraseña.</i>
                </small>
              </div>

              <div className="form-group m-2">
                <label htmlFor="cpass" className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="cpass"
                  id="cpass"
                  className="form-control"
                  placeholder=" "
                />
                <small id="pass_match" data-status=""></small>
              </div>

              <p className="lang m-2" key="titulo26">Idioma</p>
              <div className="btn-group flex-wrap m-2" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check translate"
                  id="es"
                  value="es"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "es"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="es" key="titulo27">Español</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="en"
                  value="en"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "en"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="en" key="titulo28">Inglés</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="it"
                  value="it"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "it"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="it" key="titulo29">Italiano</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="pt"
                  value="pt"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "pt"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="pt" key="titulo30">Portugués</label>
              </div>

              <div className="modal-footer">
                <button className="btn bg-gradient-guardar mr-2" id="btn-send-survey" type="submit">
                  Guardar
                </button>
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SidebarLT1;

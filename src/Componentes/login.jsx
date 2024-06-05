import { useState } from "react";
import "../assets/css/login.css";
import LogoEVA from "../assets/img/logo EVA2.0.png";

const LogIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <div id="login-body" className="bodyLogin">
        <div className="col container-img">
          <img src={LogoEVA} className="d-sm-block d-lg-none" alt="" />
        </div>
        <div className="login-container container col-sm-12">
          <h2 className="text-start tittle-session">Iniciar Sesión</h2>
          <div id="login-form">
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
            <a href="./index">
              <button
                className="btn access-button"
                key="titulo"
                id="bot"
                href="./Admin/index.jsx"
              >
                Ingresar
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

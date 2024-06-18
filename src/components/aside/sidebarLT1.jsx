import "../../assets/css/header_aside.css";
import {UserContext} from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
const SidebarLT1 = () => {
  const nav = useNavigate();
  const logout=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('accessToken');
    nav("/")
  }

  return (
    <div
      className="col-1 col-md-1 col-lg-1 d-lg-block d-none h-100 rounded-end-4 collapse navbar-collapse ps-2 align-content-center"
      id="navbarNav"
    >
      <div id="div_ul" className="h-75 pe-0 ps-2 align-content-center">
        <ul className="pt-3 rounded-end-4">
          <li className="nav-item">
            <a className="nav-link tooltip-container" href="./index">
              <i id="iconoDegradado" className="fa-solid fa-house"></i>
            </a>
          </li>
          <br />
          <li className="nav-item">
            <a className="nav-link tooltip-container" href="./admin_list">
              <i id="iconoDegradado" className="fa-solid fa-user"></i>
            </a>
          </li>
          <br />
          <li className="nav-item">
            <a
              className="nav-link tooltip-container"
              href="/client_list"
            >
              <i id="iconoDegradado" className="fa-solid fa-id-card-clip"></i>
            </a>
          </li>
          <br />
          <a
            className="dropdown-toggle nav-link nav-item link-dark"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i id="iconoDegradado" className="fa-solid fa-gear"></i>
          </a>
          <li className="nav-item dropdown">
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className=" btn btn-primary dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#modalManageUser"
                >
                  Gestionar cuentas
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => logout()}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLT1;

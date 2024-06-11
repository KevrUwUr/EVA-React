import { useEffect } from "react";
import "../../assets/css/experiencia.css";
import {
  toggleGridMode,
  toggleListMode,
} from "../../assets/js/toggleListGridMode";
import SidebarLT1 from "../aside/sidebarLT1";
import HeaderLT1 from "../header/headerLT1";

const Satisfaction = () => {
  useEffect(() => {
    document
      .getElementById("grid-button-mode")
      .addEventListener("click", toggleGridMode);
    document
      .getElementById("list-button-mode")
      .addEventListener("click", toggleListMode);

    return () => {
      document
        .getElementById("grid-button-mode")
        .removeEventListener("click", toggleGridMode);
      document
        .getElementById("list-button-mode")
        .removeEventListener("click", toggleListMode);
    };
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    const year = String(date.getFullYear()); // Últimos dos dígitos del año
    return `${day}-${month}-${year}`;
  };
  const currentDate = new Date();

  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section>
          <SidebarLT1 />

          <div className="container cards-EVA">
            <div className="row">
              {/* <!-- OPCION  MODO GRID  --> */}
              <div
                className="cards-group text-center col-lg-8"
                id="grid-mode"
                style={{ display: "block" }}
              >
                <div className="row m-3">
                  <div className="row d-flex ">
                    <div className="col-8">
                      <h2 className="text-start w-100 fw-bolder tituloCardGroup">
                        Sistema de encuestas
                      </h2>
                    </div>
                    <div className="col-4">
                      <h3 className="mt-4 flex-shrink-1 text-end date fechaCardGroup">
                        {formatDate(currentDate)}
                      </h3>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-4 col-lg-4 text-start">
                      <h4 className="cardElement">1</h4>
                    </div>
                    <div className="col-8 col-lg-8 text-end d-none d-lg-block">
                      <button
                        className="btn btn-option-view"
                        id="list-button-mode"
                      >
                        <i className="fa-solid fa-list" id="lista"></i>
                      </button>
                      <button className="btn btn-option-view active">
                        <i className="fa-solid fa-border-all" id="grid"></i>
                      </button>
                    </div>
                  </div>

                  <div className=" row ">
                    <div className=" col-lg-4 col-8 text-start">
                      <h6 className="cardElement">Total Encuestas</h6>
                    </div>
                  </div>
                </div>
                <div className="row  text-center">
                  <div className="col-lg  ">
                    <div className="card card6">
                      <div className="card-body d-grid">
                        <div className="row">
                          <div className="col-10 card-title">
                            <span className="">
                              Administrador de área de experiencia
                            </span>
                          </div>
                          <div className="col-2">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h3 className="card-text">Usuarios</h3>
                          </div>
                        </div>
                        <div className="row d-flex align-items-start justify-content-start mb-2">
                          <div className="col card-second-text  ">
                            <span className="">Administrador</span>
                          </div>
                        </div>
                        <div className="row button-container">
                          <div
                            className="col-10 "
                            onClick="window.location.href='./index.php?page=user_list&access=3'"
                          >
                            <button className="card-btn check">Lista</button>
                          </div>
                          <div className="col-2">
                            <button className="btn-plus">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg">
                    <div className="card card4">
                      <div className="card-body d-grid">
                        <div className="row">
                          <div className="col-10 card-title">
                            <span className="">Encuestas de usuario final</span>
                          </div>
                          <div className="col-2">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h3 className="card-text">Encuestas</h3>
                          </div>
                        </div>
                        <div className="row d-flex align-items-start justify-content-start mb-2">
                          <div className="col card-second-text  ">
                            <span className="">Crear y/o editar encuesta</span>
                          </div>
                        </div>
                        <div className="row button-container">
                          
                          <div
                            className="col-10"
                            onClick="./survey_list"
                          >
                            <a href="/survey_list">
                            <button className="card-btn check">
                              Crear encuesta
                            </button>
                            </a>
                          </div>
                          <div className="col-2">
                            <button className="btn-plus">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg  ">
                    <div className="card card5">
                      <div className="card-body d-grid">
                        <div className="row">
                          <div className="col-10 card-title">
                            <span className="">
                              Generar gráficos e informe de encuesta
                            </span>
                          </div>
                          <div className="col-2">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h3 className="card-text w-100 m-0 p-0">
                              Reporte de encuesta
                            </h3>
                          </div>
                        </div>
                        <div className="row d-flex align-items-start justify-content-start mb-2">
                          <div className="col card-second-text  ">
                            <span className="">Generar informe</span>
                          </div>
                        </div>
                        <div className="row button-container">
                          <div className="col-10">
                            <button className="card-btn check">
                              Generar gráficos
                            </button>
                          </div>
                          <div className="col-2">
                            <button className="btn-plus">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- OPCION  MODO GRID  --> */}

              {/* <!-- OPCION MODO LISTA --> */}
              <div
                className="col-lg-8 cards-group"
                id="list-mode"
                style={{ display: "none" }}
              >
                <div className="row m-3">
                  <div className="row d-flex">
                    <div className="col-8">
                      <h2 className="text-start  fw-bolder w-100 tituloCardGroup">
                        Sistema de encuestas
                      </h2>
                    </div>
                    <div className="col-4">
                      <h3 className="mt-4 flex-shrink-1 text-end date fechaCardGroup">
                        {formatDate(currentDate)}
                      </h3>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-12 col-lg-4 text-start">
                      <h4 className="cardElement">1</h4>
                    </div>
                    <div className="col-8 col-lg-8 text-end d-none d-lg-block">
                      <button
                        className="btn btn-option-view active"
                        id="list-button-mode2"
                      >
                        <i className="fa-solid fa-list" id="lista"></i>
                      </button>
                      <button
                        className="btn btn-option-view"
                        id="grid-button-mode"
                      >
                        <i className="fa-solid fa-border-all" id="grid"></i>
                      </button>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-12 col-lg-4 text-start">
                      <h6 className="cardElement">Total Encuestas</h6>
                    </div>
                  </div>
                </div>
                <div className="row  list">
                  <div className="col-12">
                    <li>
                      <ul className="list-item item-4 d-flex justify-content-between">
                        <div className="col-6 col-lg-5">
                          <h5 className="text-white fw-bolder">
                            Encuestas de usuario final
                          </h5>
                        </div>
                        <div className="col-lg-2 ms-3 d-none d-lg-block">
                          <span className="text-white text-start">
                            Crear y/o editar encuesta
                          </span>
                        </div>
                        <div className="col-lg-3  justify-content-center  col ">
                          <button className="card-btn ">Crear encuesta</button>

                          <button className="btn-plus ms-2">
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-1 d-none d-lg-block">
                          <div className="dropdown">
                            <button className="dropbtn">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div className="dropdown-content">
                              <a href="#">Link 1</a>
                              <a href="#">Link 2</a>
                              <a href="#">Link 3</a>
                            </div>
                          </div>
                        </div>
                      </ul>
                      <ul className="list-item item-5 d-flex justify-content-between">
                        <div className="col-6 col-lg-5">
                          <h5 className="text-white fw-bolder">
                            Generar gráficos e informe de encuesta
                          </h5>
                        </div>
                        <div className="col-lg-2 ms-3 d-none d-lg-block">
                          <span className="text-white text-start">
                            Generar informe
                          </span>
                        </div>
                        <div className="col-lg-3  justify-content-center  col ">
                          <button className="card-btn ">Generar informe</button>
                          <button className="btn-plus ms-2">
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-1 d-none d-lg-block">
                          <div className="dropdown">
                            <button className="dropbtn">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div className="dropdown-content">
                              <a href="#">Link 1</a>
                              <a href="#">Link 2</a>
                              <a href="#">Link 3</a>
                            </div>
                          </div>
                        </div>
                      </ul>
                      <ul className="list-item item-6 d-flex justify-content-between">
                        <div className="col-6 col-lg-5">
                          <h5 className="text-white fw-bolder">
                            Envío de encuesta a correos
                          </h5>
                        </div>
                        <div className="col-lg-2 ms-3 d-none d-lg-block">
                          <span className="text-white text-start">
                            Enviar encuesta
                          </span>
                        </div>
                        <div className="col-lg-3  justify-content-center  col ">
                          <button className="card-btn ">Enviar correos</button>

                          <button className="btn-plus ms-2">
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-1 d-none d-lg-block">
                          <div className="dropdown">
                            <button className="dropbtn">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div className="dropdown-content">
                              <a href="#">Link 1</a>
                              <a href="#">Link 2</a>
                              <a href="#">Link 3</a>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </li>
                  </div>
                </div>
              </div>
              {/* <!-- OPCION MODO LISTA  --> */}
              <div className="col-12 col-lg-4 col-sm-12">
                <div className="card outstanding-card2 extern">
                  <div className="card-body div-title">
                    <h5 className="">Encuestas</h5>
                    <div className="row">
                      <div className="col-12">
                        <span className=" text-start fw-bold">
                          Titulo{" "}
                          <i className=" fa-regular fa-clipboard"></i>
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <p className="text-start ">
                        Califica la calidad de atención al cliente que se está
                        presentando por parte del agente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Satisfaction;

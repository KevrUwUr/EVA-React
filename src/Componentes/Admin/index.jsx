import "../../assets/css/index.css";
import SidebarLT1 from "../aside/sidebarLT1";
import HeaderLT1 from "../header/headerLT1";
const Index = () => {
  const data = {
    id: "1",
    primerNombre: "Juan",
    segundoNombre: "Carlos",
    primerApellido: "García",
    email: "juan.garcia@example.com",
    password: "",
    language: "en",
  };
  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section>
          <SidebarLT1 />
          <div className="container mt-5 home">
            <div id="row_card" className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2 d-flex justify-content-center align-content-center">
                <a style={{ textDecoration: "none" }} href="./quality">
                  <div id="card1" className="card text-white text-center pb-2">
                    <div className="card-body index">
                      <i
                        id="iconoCard"
                        className="fa-solid fa-circle-user"
                        style={{ fontSize: "100px" }}
                      ></i>
                      <br />
                      <h3>Calidad</h3>
                      <p>
                        Agentes / Usuarios / Formularios de monitoreo / Reportes
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2 d-flex justify-content-center align-content-center h-100">
                <a style={{ textDecoration: "none" }} href="./satisfaction">
                  <div
                    id="card2"
                    className=" d-flex card text-white text-center pb-2 align-items-center"
                  >
                    <div className="card-body index">
                      <i
                        id="iconoCard"
                        className="fa-solid fa-chart-column"
                        style={{ fontSize: "100px" }}
                      ></i>
                      <br />
                      <h3>Experiencia de cliente</h3>
                      <p>Encuestas / Graficas / Reportes</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="modal fade"
        id="modalManageUser"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body">
              <form action="" id="manage-user-self">
                <input type="hidden" name="id" value={data.id} />
                <div id="msg"></div>

                <div className="form-group m-2">
                  <label htmlFor="firstname" className="form-label">
                    Primer nombre
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control"
                    placeholder=" "
                    value={data.primerNombre}
                    required
                  />
                </div>

                <div className="form-group m-2">
                  <label htmlFor="middlename" className="form-label">
                    Segundo nombre
                  </label>
                  <input
                    type="text"
                    name="middlename"
                    id="middlename"
                    className="form-control"
                    placeholder=" "
                    value={data.segundoNombre}
                  />
                </div>

                <div className="form-group m-2">
                  <label htmlFor="lastname" className="form-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-control"
                    placeholder=" "
                    required
                    value={data.primerApellido}
                  />
                </div>

                <div className="form-group m-2">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder=" "
                    required
                    autoComplete="off"
                    value={data.email}
                  />
                </div>

                <div className="form-group m-2">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder=" "
                    value={data.password}
                  />
                  <small>
                    <i>
                      Deje esto en blanco si no desea cambiar la contraseña.
                    </i>
                  </small>
                </div>

                <div className="form-group m-2">
                  <label htmlFor="cpass" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="cpass"
                    id="cpass"
                    className="form-control"
                    placeholder=" "
                  />
                  <small id="pass_match" data-status=""></small>
                </div>

                <p className="lang m-2" key="titulo26">
                  Idioma
                </p>
                <div
                  className="btn-group m-2"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check translate"
                    id="es"
                    value="es"
                    name="language"
                    autoComplete="off"
                    defaultChecked={data.language === "es"}
                  />
                  <label
                    className="btn btn-outline-dark lang"
                    htmlFor="es"
                    key="titulo27"
                  >
                    Español
                  </label>

                  <input
                    type="radio"
                    className="btn-check translate"
                    id="en"
                    value="en"
                    name="language"
                    autoComplete="off"
                    defaultChecked={data.language === "en"}
                  />
                  <label
                    className="btn btn-outline-dark lang"
                    htmlFor="en"
                    key="titulo28"
                  >
                    Inglés
                  </label>

                  <input
                    type="radio"
                    className="btn-check translate"
                    id="it"
                    value="it"
                    name="language"
                    autoComplete="off"
                    defaultChecked={data.language === "it"}
                  />
                  <label
                    className="btn btn-outline-dark lang"
                    htmlFor="it"
                    key="titulo29"
                  >
                    Italiano
                  </label>

                  <input
                    type="radio"
                    className="btn-check translate"
                    id="pt"
                    value="pt"
                    name="language"
                    autoComplete="off"
                    defaultChecked={data.language === "pt"}
                  />
                  <label
                    className="btn btn-outline-dark lang"
                    htmlFor="pt"
                    key="titulo30"
                  >
                    Portugués
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn bg-gradient-guardar mr-2"
                    id="btn-send-survey"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-bs-dismiss="modal"
                  >
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

export default Index;

import "../../assets/css/index.css";
import SidebarLT1 from "../aside/sidebarLT1";
import HeaderLT1 from "../header/headerLT1";
const Index = () => {
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
    </div>
  );
};

export default Index;

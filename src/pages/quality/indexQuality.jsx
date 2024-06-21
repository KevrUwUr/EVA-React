import "../../assets/css/index.css";
import SidebarLT2 from "../../components/aside/sidebarLT2";
import HeaderLT2 from "../../components/header/headerLT2";
const Index = () => {
  return (
    <div className="App">
     <div id="body">
      <HeaderLT2/>
        <section>
          <div className="col-12">
          <div className="container mt-5 home">
            <div id="row_card" className="row d-flex justify-content-center">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2 d-flex justify-content-center align-content-center">
                <a style={{ textDecoration: "none" }} href="/quality">
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
              
            </div>
          </div>
          </div>
          <SidebarLT2 /> 
        </section>
   
      </div>
 
    </div>
   
  );
};

export default Index;

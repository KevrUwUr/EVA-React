import { useState, useEffect, useContext } from "react";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import SidebarLT2 from "../../components/aside/sidebarLT2";
import HeaderLT2 from "../../components/header/headerLT2";
import useInput from "../../components/hooks/useInput";
import TableSurvey from "../../components/Tables/tableSurvey";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { smallAlertDelete, Toast } from "../../assets/js/alertConfig";
import Select from "react-select";
const SurveyList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)
  const url = "http://localhost/API-EVA/surveyController/surveys";
  const headers = ["Title", "Start_date", "End_date", "state"];
  const [operation, setOperation] = useState([1]);
  const [idToEdit, setidToEdit] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [survey, setSurvey] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const title = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const start_date = useInput({
    defaultValue: "",
    validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  });
  const end_date = useInput({
    defaultValue: "",
    validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  });
  const description = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const link = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const state = useInput({ defaultValue: "", validate: /^[0-2 ]*$/ });
  const idClient = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Se establecen los survey una vez que el componente se monta
    getSurveys();
    getClients(userId);
  }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez

  const { accessToken, userType, userId } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const getSurveys = async () => {
    try {
      const response = await axios.get(url, config);
      setSurvey(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getClients = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/UserController/ClientsxUser/${id}`,
        config
      );
      console.log("clientes relacionados: ", response.data);
      setClients(
        response.data.map((client) => ({
          value: client.id,
          label: client.client,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const activeSurvey = (survey) => {
    const url = `http://localhost/API-EVA/surveyController/patchSurvey`;
    const id = survey.id;
    const name = survey.title;
    const parametros = {
      state: 1,
    };
    smallAlertDelete
      .fire({
        text: `El usuario ${name} se activara.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });

            Toast.fire({
              icon: "success",
              title: `La encuesta ${survey.title} se ha activado exitosamente`,
            });

            // getSurveys();
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `La encuesta ${survey.title} no ha sido activada`,
            });
            console.error(error);
          }
        }
        getSurveys();
      });
  };

  const deactivateSurvey = (survey) => {
    const url = `http://localhost/API-EVA/surveyController/patchSurvey`;
    const id = survey.id;
    const name = survey.title;
    const parametros = {
      state: 0,
    };

    smallAlertDelete
      .fire({
        text: `La encuesta ${name} se eliminará de forma permanente.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros, config);
            Toast.fire({
              icon: "success",
              title: `La encuesta ${survey.title} se ha activado exitosamente`,
            });
          } catch (error) {
            alert("error", "Error al eliminar");
            console.error(error);
          }
        }
        getSurveys();
      });
  };

  const openModal = (op, survey) => {
    setOperation(op);
    if (op == 1) {
      setModalTitle("Añadir encuesta");
      title.handleChange("");
      start_date.handleChange("");
      end_date.handleChange("");
      description.handleChange("");
      link.handleChange("");
      idClient.handleChange("");
    } else if (op == 2) {
      setModalTitle("Editar encuesta");
      title.handleChange(survey?.title || "");
      start_date.handleChange(survey?.start_date || "");
      end_date.handleChange(survey?.end_date || "");
      description.handleChange(survey?.description || "");
      link.handleChange(survey?.link || "");
      idClient.handleChange(survey?.idClient || "");
      setidToEdit(survey?.id);
    }
  };
  const validar = (id) => {
    var parametros;
    var metodo;

    if (
      title.input.trim() == "" ||
      start_date.input.trim() == "" ||
      end_date.input.trim() == "" ||
      description.input.trim() == "" ||
      idClient.input == ""
    ) {
      alert("Campos mal diligenciados");
    } else {
      if (operation == 1) {
        parametros = {
          title: title.input,
          start_date: start_date.input,
          end_date: end_date.input,
          description: description.input,
          idClient: idClient.input,
        };
        metodo = "post";
      } else if (operation == 2) {
        parametros = {
          title: title.input,
          start_date: start_date.input,
          end_date: end_date.input,
          description: description.input,
          idClient: idClient.input,
        };
        metodo = "put";
      }
      sendData(metodo, parametros, id);
    }
  };
  const sendData = async (metodo, parametros, clientes) => {
    try {
      if (metodo.toUpperCase() == "POST") {
        const handleCreateSurvey = async () => {
          setLoading(true);
          try {
            const response = await axios.post(
              "http://localhost/API-EVA/surveyController/postSurvey",
              parametros,
              config
            );
            const responseData = response.data;
            console.log("Respuesta solicitud Post:", responseData);
            if (responseData.status) {
              alert("Encuesta creada exitosamente");
              document.getElementById("btnCerrar").click();
              getSurveys();
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };

        handleCreateSurvey();
      } else if (metodo.toUpperCase() == "PUT") {
        const url = `http://localhost/API-EVA/surveyController/putSurvey`;
        const response = await axios.put(
          `${url}/${idToEdit}`,
          parametros,
          config
        );
        const responseData = response.data;
        document.getElementById("btnCerrar").click();
        getSurveys();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const openModalCont = (survey) => {
    /*  await getClient(survey.id) */ //!llamar cliente para nombrarlo en el modal!
    setModalTitle("Información de la encuesta");
    title.handleChange(survey?.title || "");
    start_date.handleChange(survey?.start_date || "");
    end_date.handleChange(survey?.end_date || "");
    state.handleChange(survey?.state || "");
    description.handleChange(survey?.description || "");
    link.handleChange(survey?.link || "No presenta link anexado");
    idClient.handleChange(survey?.idClient || "");
  };
  const handleRedirect = (id) => {
    navigate(`/survey/${id}`);
  };

  const handleClientChange = (selectedOption) => {
    setSelectedClients(selectedOption);
    console.log(selectedOption);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    console.log(date);
  };

  return (
    <div className="App">
      <div id="body">
        {userType == "1" || userType == "2" ? <HeaderLT1 /> : <HeaderLT2 />}
        <section
          style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
        >
          {userType == "1" || userType == "2" ? <SidebarLT1 /> : <SidebarLT2 />}
          <div className="container mt-0">
            {survey.length > 0 && (
              <TableSurvey
                header={headers}
                data={survey}
                onCreate={() => openModal(1)}
                onUpdate={(payload) => openModal(2, payload)}
                modalId={"modalSurvey"}
                modalId2={"modalViewSurvey"}
                onView={(payload) => openModalCont(payload)}
                onRemove={(item) => deactivateSurvey(item)}
                onActive={(payload) => activeSurvey(payload)}
              />
            )}
          </div>
        </section>
      </div>
      <div id="modalSurvey" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{modalTitle}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
                onClick={() => setSelectedClients([])}
              ></button>
            </div>
            <div className="modal-body ">
              <div className="row">
                <div className="col-8 mb-3">
                  <label id="labelAnimation">
                    <input
                      placeholder=" "
                      className="input-new"
                      type="text"
                      name="title"
                      value={title.input}
                      onChange={(e) => title.handleChange(e.target.value)}
                    />
                    <span className="labelName">Titulo</span>
                  </label>
                </div>
                <div className="col-4 mb-3">
                  <label id="labelAnimation">
                    <Select
                      options={clients}
                      isSearchable={true}
                      onChange={handleClientChange}
                      isClearable={true}
                      placeholder={"Cliente"}
                      className="input-new"
                    />
                  </label>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="date"
                      name="start_date"
                      value={start_date.input}
                      onChange={(e) => start_date.handleChange(e.target.value)}
                    />
                    <span className="labelName">Fecha de inicio:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="date"
                      name="end_date"
                      value={end_date.input}
                      onChange={(e) => end_date.handleChange(e.target.value)}
                    />
                    <span className="labelName">Fecha de finalización:</span>
                  </label>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col mb-3 ">
                  <label id="labelAnimation">
                    <textarea
                      className="input-new "
                      placeholder="Descripción"
                      type="text-area"
                      name="descripcion"
                      value={description.input}
                      onChange={(e) => description.handleChange(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSelectedClients([])}
              >
                Cerrar
              </button>
              <button
                onClick={() => validar(idToEdit)}
                className="btn-primary btn"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyList;

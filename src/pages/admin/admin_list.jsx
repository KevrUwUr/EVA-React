import { useState, useEffect, React } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../assets/css/newUser.css";
import TableAdmin from "../../components/Tables/tableAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import useInput from "../../components/hooks/useInput";

const AdminList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)

  const selectedKeys = ["firstname", "lastname","type", "estado"];
  const defaultOption = { value: 1, label: "Administrador" };
  const [accessToken, setAccessToken] = useState("");
  const [operation, setOperation] = useState([1]);
  const [title, setTitle] = useState();
  const [idToEdit, setidToEdit] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);
  const [userclients,setUserClients]=useState([]);
  const [selectedClients,setSelectedClients]=useState([])
  const [clientesDelUsuario, setClientesDelUsuario]=useState([])
  const userxClients= useInput({defaultValue: "", validate: ""})
  const lastName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const firstName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const middleName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const email = useInput({
    defaultValue: "",
    validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/,
  });
  const password = useInput({
    defaultValue: "",
    validate:
      /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/,
  });
  const type = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const estado = useInput({ defaultValue: "", validate: /^[0-1]+$/ });

  const language = useInput({ defaultValue: "", validate: /^(es|en|it|pt)$/ });
  const registration_date = useInput({
    defaultValue: "",
    validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  });
  const last_visit_date = useInput({
    defaultValue: "",
    validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  });

  useEffect(() => {
    getAdmins();
    getClients();
    // Se establecen los admins una vez que el componente se monta
  }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez
  const getAdmins = async () => {
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/userController/Users`
      );
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const getClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/ClientController/Clients`
      );
      setClients(response.data);
 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getUserClients = async (id) => {
    console.log(id)
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/UserController/ClientsxUser/${id}`
      );
      setUserClients(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const config = {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Cache-Control": "no-cache",
    },
  };

  const openModal = (op, admin) => {
    setOperation(op);
    console.log(op)
    if (op == 1) {
      const clientes = Object.freeze(clients.map((client) => (
        {"value": client.id, "label":client.client }))
       );
      setTitle("Registrar administrador");
      lastName.handleChange("");
      firstName.handleChange("");
      middleName.handleChange("");
      email.handleChange("");
      password.handleChange("");
      type.handleChange("");
      language.handleChange("es");
      estado.handleChange(1);
      registration_date.handleChange(new Date());
      last_visit_date.handleChange(new Date());
      userxClients.handleChange(clientes)
    } else if (op == 2) {
     /*  getUserClients(admin.id)
      const selectedClients=Object.freeze(Userclients.map((client)=>(
        {"value":client.id,"label":client.client
        }
      )))
      const clientes = Object.freeze(clients.map((client) => (
        {"value": client.id, "label":client.client }))
       ); */
      
      setTitle("Editar Usuario");
      lastName.handleChange(admin?.lastname || "");
      firstName.handleChange(admin?.firstname || "");
      middleName.handleChange(admin?.middlename || "");
      email.handleChange(admin?.email || "");
      password.handleChange(admin?.password || "");
      type.handleChange(admin?.type || "");
      estado.handleChange(admin?.estado || "");
      language.handleChange(admin?.language || "en");
      registration_date.handleChange(admin?.registration_date || new Date());
      last_visit_date.handleChange(admin?.last_visit_date || new Date());
      setidToEdit(admin?.id);
    }
  };
  const openModalCont = async (admin) => {
    await getUserClients(admin.id)
    console.log("clientes del usuario ",userclients.client)
    setClientesDelUsuario(userclients)
    setTitle("Información");
    lastName.handleChange(admin?.lastname || "");
    firstName.handleChange(admin?.firstname || "");
    middleName.handleChange(admin?.middlename || "");
    email.handleChange(admin?.email || "");
    password.handleChange(admin?.password || "");
    type.handleChange(admin?.type || "");
    estado.handleChange(admin?.estado || "");
    language.handleChange(admin?.language || "en");
    registration_date.handleChange(admin?.registration_date || "");
    last_visit_date.handleChange(admin?.last_visit_date || "Nunca");
    setidToEdit(admin?.id);
  };

  const active = (admin) => {
    const url = `http://localhost/API-EVA/userController/patchUser`;
    const id = admin.id;
    const name = admin.firstname;
    console.log("hola");
    const parametros = {
      estado: 1,
    };
    const smallAlertDelete = Swal.mixin({
      toast: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        container: "small-alert-container",
        title: "small-alert-title",
        content: "medium-alert-content",
        actions: "small-alert-actions",
        confirmButton: "small-alert-confirm-button2",
        cancelButton: "small-alert-cancel-button",
      },
      buttonsStyling: true, // Para aplicar estilos personalizados
      width: "400px", // Ajusta el ancho de la alerta
      padding: "1em", // Reduce el padding para que sea menos invasiva
      display: "flex",
      backdrop: false,
      position: "center",
    });

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
            await axios.patch(`${url}/${id}`, parametros);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: `El usuario ${admin.firstname} se ha activado exitosamente`,
            });

            console.log("El usuario se ha activado con exito", admin.firstname);
            // getAdmins();
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `El usuario ${admin.firstName} no ha sido activado`,
            });
            console.error(error);
          }
        }
        getAdmins();
      });
  };
  const validar = (id) => {
    var parametros;
    var metodo;

    if (
      lastName.input.trim() === "" ||
      firstName.input.trim() === "" ||
      email.input.trim() === "" ||
      password.input.trim() === "" ||
      type.input === ""
    ) {
      console.log(firstName.input);
      console.log(lastName.input);
      console.log(middleName.input);
      console.log(email.input);
      console.log(password.input);
      console.log(type.input);
    } else {
      if (operation === 1) {
        parametros = {
          lastname: lastName.input,
          firstname: firstName.input,
          middlename: middleName.input,
          email: email.input,
          password: password.input,
          type: type.input,
          language: "es",
          registration_date: "0000-00-00",
          last_visit_date: "0000-00-00 00:00:00",

        };
        metodo = "post";
      } else if (operation === 2) {
        parametros = {
          lastname: lastName.input,
          firstname: firstName.input,
          middlename: middleName.input,
          email: email.input,
          password: password.input,
          type: type.input,
          language: "es",
          registration_date: "0000-00-00",
          last_visit_date: "0000-00-00 00:00:00",
        };
        metodo = "put";
      }
      sendData(metodo, parametros, id);
    }
  };

  const sendData = async (metodo, parametros, id) => {
    try {
      if (metodo.toUpperCase() === "POST") {
        const duplicados = admins.find((u) => u.email === parametros.email);

        if (duplicados) {
          alert("warning", "Este administrador ya existe");
          return;
        }
        const response = await axios.post(
          `http://localhost/API-EVA/userController/postUser`,
          parametros
        );
        console.log(parametros);
        const responseData = response.data;
        console.log("Respuesta solicitud Pst;", responseData);
        document.getElementById("btnCerrar").click();
        alert("success", "Administrador creado");
        getAdmins();
      } else if (metodo.toUpperCase() === "PUT") {
        const url = `http://localhost/API-EVA/userController/putUser`;
        const response = await axios.put(`${url}/${id}`, parametros);
        console.log(parametros);
        const responseData = response.data;
        console.log("Respuesta solicitud Put;", responseData);
        document.getElementById("btnCerrar").click();
        getAdmins();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteCargo = (admin) => {
    const url = `http://localhost/API-EVA/userController/patchUser`;
    const id = admin.id;
    const name = admin.firstname;
    const parametros = {
      estado: 0,
    };
    
    const smallAlertDelete = Swal.mixin({
      toast: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        container: "small-alert-container",
        title: "small-alert-title",
        content: "medium-alert-content",
        actions: "small-alert-actions",
        confirmButton: "small-alert-confirm-button2",
        cancelButton: "small-alert-cancel-button",
      },
      buttonsStyling: true, // Para aplicar estilos personalizados
      width: "400px", // Ajusta el ancho de la alerta
      padding: "1em", // Reduce el padding para que sea menos invasiva
      display: "flex",
      backdrop: false,
      position: "center",
    });

    smallAlertDelete
      .fire({
        text: `El registro de ${name} se eliminará de forma permanente.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros);
            console.log("El usuario se ha desactivado", admin.firstname);
            // getAdmins();
          } catch (error) {
            alert("error", "Error al eliminar el admin");
            console.error(error);
          }
        }
        getAdmins();
      });
  };

  //? Select
  const animatedComponents = makeAnimated();

 
  const defaultOptionClients=Object.freeze(clients.map((client) => (
    {"value": client.id, "label":client.client }))
   );
  const handleClientChange=(selectedOption)=>{
    setSelectedClients(selectedOption)
    console.log(selectedOption)
  }

  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section
          style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
        >
          <SidebarLT1 />
          <div className="container mt-0">
            {admins.length > 0 && (
              <TableAdmin
                header={selectedKeys}
                data={admins}
                onCreate={() => openModal(1)}
                onRemove={(item) => deleteCargo(item)}
                modalId={"modalAdmin"}
                modalId2={"modalAdmin2"}
                onUpdate={(payload) => openModal(2, payload)}
                onView={(payload) => openModalCont(payload)}
                onActive={(payload) => active(payload)}
              />
            )}
          </div>
          <div></div>
        </section>
      </div>
      <div id="modalAdmin" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-between">
              <div className="row flex-column m-0 w-50">
                <div className="col text-center fs-4 mb-2">
                  Datos de usuario
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      placeholder=" "
                      className="input-new"
                      type="text"
                      name="firstname"
                      value={firstName.input}
                      onChange={(e) => firstName.handleChange(e.target.value)}
                    />
                    <span className="labelName">Primer nombre</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="text"
                      name="middleName"
                      value={middleName.input}
                      onChange={(e) => middleName.handleChange(e.target.value)}
                    />
                    <span className="labelName">Segundo nombre:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="text"
                      name="lastname"
                      value={lastName.input}
                      onChange={(e) => lastName.handleChange(e.target.value)}
                    />
                    <span className="labelName">Apellido:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <Select
                      className="input-new"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={defaultOptionClients}
                      onChange={handleClientChange}
                    />
                    <span className="labelName">Clientes:</span>
                  </label>
                </div>
              </div>
              <div className="row flex-column m-0 w-50">
                <div className="col text-center fs-4 mb-2">
                  Datos administrativos
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="text"
                      name="email"
                      value={email.input}
                      onChange={(e) => email.handleChange(e.target.value)}
                    />
                    <span className="labelName">E-mail:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="password"
                      name="password"
                      onChange={(e) => password.handleChange(e.target.value)}
                    />
                    <span className="labelName">Contraseña:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <input
                      className="input-new"
                      placeholder=" "
                      type="password"
                      name="cPassword"
                    />
                    <span className="labelName">Confirmar contraseña:</span>
                    <small>
                      Si no desea cambiar la contraseña dejar en blanco
                    </small>
                  </label>
                </div>
                <div className="col mb-3">
                  <label id="labelAnimation">
                    <Select
                      className="input-new"
                      defaultValue={defaultOption}
                      options={[
                        { value: 1, label: "Administrador" },
                        { value: 2, label: "Cliente" },
                      ]}
                      name="type"
                      onChange={(selectedOption) =>
                        type.handleChange(selectedOption.value)
                      }
                    />
                    <span className="labelName">Tipo:</span>
                  </label>
                </div>
                <div className="col mb-3">
                  {/* <label id="labelAnimation">
                    <Select
                      className="input-new"
                      defaultValue={defaultOptionState}
                      options={[
                        { value: 0, label: "Inactivo" },
                        { value: 1, label: "Activo" },
                      ]}
                      name="estado"
                      onChange={(selectedOption) =>
                        estado.handleChange(selectedOption.value)
                      }
                    />
                    <span className="labelName">Estado:</span>
                  </label> */}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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


      <div id="modalAdmin2" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div
              className="modal-header mb-0 pb-0" style={{ borderBottom:"none" }} >
                <label className="h5">Detalles del usuario</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
             
              
            </div>
            <div> <p style={{marginLeft:"15px", marginBottom:0, padding:0, color:"gray", fontSize: "small"}}>Información detallada del perfil de usuario.</p></div>
            <div className="modal-body d-flex ">
              <div className="col  m-2 ">
                <div className="m-1 p-1">
                   <label  className="fw-semibold ">Nombre</label>
                  <input type="text" className="form-control mt-1"   value={`${firstName.input} ${middleName.input} ${lastName.input}`} readOnly />
                </div>
               
                <div  className="m-1 p-1">
                <span  className="fw-semibold "> Estado</span>
                  <input type="text" className="form-control mt-1" value={`${estado.input === 1 ? "Activo" : "Inactivo"}`} readOnly />
                </div>
                <div className="m-1 p-1">
                <span  className="fw-semibold ">Rol</span>
                  <input type="text" className="form-control mt-1" value={` ${type.input === 1
                      ? "Super Administrador"
                      : type.input === 2
                      ? "Administrador"
                      : type.input == 3
                      ? "Editor"
                      : "Visualizador"}`} readOnly />
                </div>
                
                <div className="m-1 p-1">
                <span  className="fw-semibold ">Fecha de registro</span>
                  <input type="text" className="form-control mt-1" value={`${registration_date.input}`} readOnly />
                </div>
                
              </div>
              <div className="col  m-2  ">
              <div className="m-1 p-1">
                <span className="fw-semibold ">Correo electronico</span>
                  <input type="text" className="form-control mt-1" value={`${email.input}`} readOnly />
               </div>
               <div className="m-1 p-1">
                <span  className="fw-semibold ">Clientes</span>
                  <input type="text" className="form-control mt-1" value={`${email.input}`} readOnly />
               </div>
               <div  className="m-1 p-1">
                <span  className="fw-semibold ">Lenguaje</span>
                  <input type="text" className="form-control mt-1" value={`${language.input == "es"
                      ? "Español"
                      : language.input == "en"
                      ? "Inglés"
                      : language.input == "it"
                      ? "Italiano"
                      : "Portugués"}`} readOnly />
               </div>
               <div className="m-1 p-1">
                <span className="fw-semibold ">Última visita</span>
                  <input type="text" className="form-control mt-1" value={`${last_visit_date.input}`} readOnly />
               </div>
               
                
              </div>
             
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;

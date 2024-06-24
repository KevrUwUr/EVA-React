import React,{ useState, useEffect, useContext} from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../assets/css/newUser.css";
import TableAdmin from "../../components/Tables/tableAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import useInput from "../../components/hooks/useInput";
import { UserContext } from "../../context/UserContext";
import { Toast,smallAlertDelete } from "../../assets/js/alertConfig";
const AdminList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)
  const selectedKeys = ["firstname", "lastname","type", "state"];
  
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);

  const [operation, setOperation] = useState([1]);
  const [title, setTitle] = useState();
  const [idToEdit, setidToEdit] = useState(null);
  const [formattedDate,setFormattedDate]=useState('')
  const [loading, setLoading] = useState(false);


  const [userclients,setUserClients]=useState([]);
  const [selectedClients,setSelectedClients]=useState([])

 
  useEffect(() => {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const formattedDater = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    setFormattedDate(formattedDater);
    
    
    getAdmins();
    
    getClients();
  }, []); 
  const { accessToken } = useContext(UserContext);
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };
  const lastName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const firstName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const middleName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const email = useInput({defaultValue: "",validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/, });
  const password = useInput({defaultValue: "",validate:/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/,});
  const type = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const state = useInput({ defaultValue: "", validate: /^[0-1]+$/ });
  const language = useInput({ defaultValue: "", validate: /^(es|en|it|pt)$/ });
  const registration_date = useInput({defaultValue: "",validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,});
  const last_visit_date = useInput({defaultValue: "",validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,});


  


 //REQUEST//
  const getAdmins = async () => {
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/userController/Users`,{headers: {Authorization: `Bearer ${accessToken}`}});
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost/API-EVA/ClientController/Clients`,config);
      setClients(response.data.map((client)=> (
        {"value":client.id, "label":client.client}
      )));
 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getUserClients = async (id) => {
    try {
      const response = await axios.get(`http://localhost/API-EVA/UserController/ClientsxUser/${id}`,config);
      setUserClients(response.data.map((client)=>(
        {"value":client.id, "label":client.client}
      )));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const sendClients= async (parametros, id)=>{}

  const sendData = async (metodo, parametros, clientes) => {
    try {
      if (metodo.toUpperCase() === "POST") {
        const duplicados = admins.find((u) => u.email === parametros.email);
        if (duplicados) {
            alert("Este administrador ya existe");
            return;
        }
    
        const handleCreateAdmin = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost/API-EVA/userController/postUser', parametros, config);
                const responseData = response.data;
                console.log('Respuesta solicitud Post:', responseData);
                if (responseData.status){
                  try{
                    const id = responseData.id;
                    const urlclients= 'http://localhost/API-EVA/userClientController/postUserClient/'                    
                    const clientes2 = userclients.map(obj => ({
                    idUser: id,
                    idClient: obj.value
                    }));
                    console.log(clientes2);
                    const secondResponse = await axios.post(urlclients, clientes2, config);
                    const secondResponseData=secondResponse.data
                    console.log('respuesta> ',secondResponse.data)
                    let allStatus=true
                    for (let i= 0; i<secondResponseData.length;i++){
                      if(!secondResponseData[i].status){
                        allStatus=false;
                        break
                      }
                    }
                    if (allStatus){
                      alert("Usuario creado exitosamente");
                      document.getElementById("btnCerrar").click();
                      getAdmins();
                    }else{
                      alert("El usuario se ha registrado, consulte los clientes anexados.")
                    }
                   setUserClients([])
                  }catch(error){
                      console.error(error)
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    
        handleCreateAdmin();
    
      } else if (metodo.toUpperCase() === "PUT") {
        const url = `http://localhost/API-EVA/userController/putUser`;
        const response = await axios.put(`${url}/${idToEdit}`,parametros,config);
        const responseData = response.data;
        document.getElementById("btnCerrar").click();
        getAdmins();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deactivateUser = (admin) => {
    const url = `http://localhost/API-EVA/userController/patchUser`;
    const id = admin.id;
    const name = admin.firstname;
    const parametros = {
      state: 0,
    };
    
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
            await axios.patch(`${url}/${id}`,parametros,config);
            // getAdmins();
          } catch (error) {
            alert("error", "Error al eliminar el admin");
            console.error(error);
          }
        }
        getAdmins();
      });
  };

  const activeUser = (admin) => {
    const url = `http://localhost/API-EVA/userController/patchUser`;
    const id = admin.id;
    const name = admin.firstname;
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
            await axios.patch(`${url}/${id}`, parametros,{headers: {Authorization: `Bearer ${accessToken}`}});
            Toast.fire({
              icon: "success",
              title: `El usuario ${admin.firstname} se ha activado exitosamente`,
            });

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

//REQUEST//

//MODALS//

  const openModal = (op, admin) => {
    setOperation(op);
    if (op == 1) {
      setTitle("Registrar administrador");
      lastName.handleChange("");
      firstName.handleChange("");
      middleName.handleChange("");
      email.handleChange("");
      password.handleChange("");
      type.handleChange(0);
      language.handleChange("es");
      state.handleChange(1);
      registration_date.handleChange(formattedDate);
      last_visit_date.handleChange(formattedDate);
      /* userxClients.handleChange(clientes) */
    } 
    else if (op == 2) {
      getUserClients(admin.id)
      setTitle("Editar Usuario");
      lastName.handleChange(admin?.lastname || "");
      firstName.handleChange(admin?.firstname || "");
      middleName.handleChange(admin?.middlename || "");
      email.handleChange(admin?.email || "");
      password.handleChange(admin?.password || "");
      type.handleChange(admin?.type || "");
      state.handleChange(admin?.state || "");
      language.handleChange(admin?.language || "en");
      setidToEdit(admin?.id);
    }
  };

  const openModalCont = async (admin) => {
    await getUserClients(admin.id)
    setTitle("Información");
    lastName.handleChange(admin?.lastname || "");
    firstName.handleChange(admin?.firstname || "");
    middleName.handleChange(admin?.middlename || "");
    email.handleChange(admin?.email || "");
    password.handleChange(admin?.password || "");
    type.handleChange(admin?.type || "");
    state.handleChange(admin?.state || "");
    language.handleChange(admin?.language || "en");
    registration_date.handleChange(admin?.registration_date || "");
    last_visit_date.handleChange(admin?.last_visit_date || "Nunca");
    setidToEdit(admin?.id);
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
      alert("Campos mal diligenciados")
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
          registration_date: formattedDate,
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

  //? Select //
  const animatedComponents = makeAnimated();


 
  const handleClientChange=(selectedOption)=>{
    setUserClients(selectedOption)
    console.log(selectedOption)
  }

  const loadOptions=(searchValue, callback)=>{
    setTimeout(()=>{
      const filteredOptions= clients.filter((option)=>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions)
    },1000)
  }
  //? Select //

  return (
    <div className="App">
      <div id="body">
        {loading && <p>Cargando...</p>}
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
                onRemove={(item) => deactivateUser(item)}
                modalId={"modalAdmin"}
                modalId2={"modalViewAdmin"}
                onUpdate={(payload) => openModal(2, payload)}
                onView={(payload) => openModalCont(payload)}
                onActive={(payload) => activeUser(payload)}
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
                    <AsyncSelect
                      className="input-new"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      defaultOptions
                      defaultValue={userclients}
                      loadOptions={loadOptions}
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
                    <select className="input-new text-center" name="type" onChange={(e) => type.handleChange(e.target.value)} value={type.input}>
                     {/*  <option value="0" disabled selected>Seleccione un rol</option> */}
                      <option value="1">Super Administrador</option>
                      <option value="2">Administrador</option>
                      <option value="3">Editor</option>
                      <option value="4">Visualizador</option>
                    </select>
                    <span className="labelName">Tipo:</span>
                  </label>
                </div>
                <div className="col mb-3">
                 

                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSelectedClients()}
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


      <div id="modalViewAdmin" className="modal fade" aria-hidden="true">
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
                <span  className="fw-semibold "> state</span>
                  <p className="form-control mt-1">{`${state.input === 1 ? "Activo" : "Inactivo"}`} </p>
                </div>
                <div className="m-1 p-1">
                <span  className="fw-semibold ">Fecha de registro</span>
                  <p  className="form-control mt-1" > {registration_date.input}</p>
                </div>
                <div  className="m-1 p-1">
                <span  className="fw-semibold ">Lenguaje</span>
                  <p  className="form-control mt-1" > {`${language.input == "es"
                      ? "Español"
                      : language.input == "en"
                      ? "Inglés"
                      : language.input == "it"
                      ? "Italiano"
                      : "Portugués"}`}</p>
               </div>
              </div>
              <div className="col  m-2  ">
              <div className="m-1 p-1">
                <span className="fw-semibold ">Correo electronico</span>
                  <input type="text"  className="form-control mt-1" value={email.input}/> 
               </div>
               <div className="m-1 p-1">
                <span  className="fw-semibold ">Rol</span>
                  <p type="text" className="form-control mt-1"  > {` ${type.input === 1? "Super Administrador": type.input === 2? "Administrador": type.input == 3? "Editor": "Visualizador"}`} </p>
                </div>
                <div className="m-1 p-1">
                <span className="fw-semibold ">Última visita</span>
                  <p className="form-control mt-1">{last_visit_date.input} </p>
               </div>
               <div className="m-1 p-1">
                <span className="fw-semibold ">Clientes</span>
                
                  <ul className="form-control mt-1">
                    
                      {userclients.length>0?(userclients.map((client)=>(
                   <li key={client.value}>
                    {client.label},
                   </li>))) : ( <li>No se presentan clientes</li>)}
                   </ul>
                 
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

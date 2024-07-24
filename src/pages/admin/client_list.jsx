import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect,useContext } from "react";
import HeaderLT1 from "../../components/header/headerLT1";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import TableDetalle from "../../components/Tables/tableClients";
import useInput from "../../components/hooks/useInput";
import { UserContext } from "../../context/UserContext";
import "../../assets/css/newUser.css";
import {Toast,smallAlertDelete} from '../../assets/js/alertConfig'
import { useTranslation } from "react-i18next";



export default function Client_list() {
  const [logoFile, setLogoFile] = useState(null);
  const [operation, setOperation] = useState([1]);
  const [idToEdit, setidToEdit] = useState(null);
  const [logoEdit,setLogoToEdit]=useState("")
  const [title, setTitle] = useState();
  const selectedKeys = ["id", "client", "state"];
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleToSend, setTitleTosend] = useState('');

  const url = "http://localhost/API-EVA/clientController/Clients";
  const { t,i18n } = useTranslation();


  const link = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const idClient = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const client = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const logo = useInput({ defaultValue: "", validate: "" });
  const estado = useInput({ defaultValue: "", validate: /^[0-1]+$/ });

  const { accessToken,languageUser } = useContext(UserContext);
  useEffect(() => {
    
    fetchData();
    i18n.changeLanguage(languageUser)

  }, [languageUser]); // Arreglo dependiente de que se tenga languageUser para carga de idioma

  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url,config);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const openModalCont = (clientData) => {
    client.handleChange(clientData?.client || "");
    estado.handleChange(clientData?.estado || "");
    logo.handleChange(clientData?.logo || "");
  };


  const openModal = (op, clientData) => {
    setOperation(op);
      if (op == 1) {
      setTitle(t("clientModal.NewClient"));
      client.handleChange("");
      logo.handleChange("");

    } else if (op == 2) {
      setTitle(t("clientModal.EditClient"));
      client.handleChange(clientData?.client || "");
      setLogoToEdit(clientData?.logo || "")
      logo.handleChange("");
      setidToEdit(clientData?.id);
    }
  };
 
  const activation=(clientData)=> { 
    const url=`http://localhost/API-EVA/clientController/patchClient/`
    const id =clientData.id
    const name=clientData.client
    console.log(name)
    const parametros={
      state:1,
    };
    smallAlertDelete
      .fire({
        text: `${t("alertActivate.TheClient")} ${name} ${t("alertActivate.FinalPhrase")}`,
        showCancelButton: true,
        confirmButtonText: `${t("alertActivate.Confirm")}`,
        cancelButtonText: `${t("alertActivate.Cancel")}`,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros, config);
            
            Toast.fire({
              icon: "success",
              title: `${t("alertActivate.TheClient")} ${clientData.client} ${t("alertActivate.SuccessAlert")}`,
            });
           
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `${t("alertActivate.TheClient")} ${clientData.client}${t("alertActivate.ErrorAlert")} `,
            });
            console.error(error);
          }
        }
        fetchData();
      });        
  };
  const deactivation=(clientData)=> {  
    const url = `http://localhost/API-EVA/clientController/patchClient/`;
    const id = clientData.id;
    const name = clientData.client;
    const parametros = {
      state: 0,
    };
    smallAlertDelete
      .fire({
        text: `${t("alertActivate.TheClient")} ${name} ${t("alertDeactivate.FinalPhrase")}`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`,parametros,config);
            Toast.fire({
              icon: "success",
              title: `${t("alertActivate.TheClient")} ${clientData.client} ${t("alertActivate.SuccessAlert")}`,
            });
            fetchData();
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `${t("alertActivate.TheClient")} ${clientData.client} ${t("alertActivate.ErrorAlert")}`,
            });
            console.error(error);
          }
        }
        fetchData();
      });
   };

   const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Verificar que el archivo seleccionado sea JPEG o PNG
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setSelectedFile(selectedFile);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción en caso de no ser un archivo JPEG o PNG
      console.log('Por favor selecciona un archivo JPEG o PNG.');
    }
  };
  const handleTitleChange = (event) => {
    setTitleTosend(event.target.value);
  };
  const validar = async (id) => {
     const urlpost=`http://localhost/API-EVA/clientController/postClient`
     const formData = new FormData();
      formData.append('logo', selectedFile);
      formData.append('cliente', client.input);
      console.log(id)
    if (id===null){
    try{
      const response = await axios.post(`${urlpost}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${accessToken}`
        },
      });
      console.log('Respuesta del servidor:', response.data);
      if (response.data.status){
        Toast.fire({
          icon: "success",
          title: `${t("alertActivate.TheClient")} ${client.input} ${t("alertActivate.Created")} `,
        });
        fetchData();
      }
    }
    
     catch (error) {
      console.error('Error subiendo el archivo:', error);
    }
  
  }else{
    const urlput="http://localhost/API-EVA/clientController/putClient"
    try{
      const response = await axios.post(`${urlput}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${accessToken}`
        },
      });
      if (!response.data.status){
        alert("NO se realizo la edición del usuario")
      }
      Toast.fire({
        icon: "success",
        title: `El cliente ${clientData.client} se ha editado exitosamente`,
      });
      fetchData();
    }catch(error){
      console.error(error)
    }
  }
  };

  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section
          style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
        >
          <SidebarLT1 />
          <div className="container mt-0">
            {data.length > 0 && (
              <TableDetalle
                header={selectedKeys}
                data={data}
                onCreate={() => openModal(1)}
                onRemove={(item) => deactivation(item)}
                modalId={"modalCreateClient"}
                modalId2={"modalViewClient"}
                onUpdate={(payload) => openModal(2, payload)}
                onView={(payload) => openModalCont(payload)}
                onActive={(payload)=> activation(payload)}
              />
            )}
          </div>
        </section>
      </div>

      <div id="modalViewClient" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div
              className="modal-header mb-0 pb-0 text-center"
              style={{ borderBottom: "none" }}
            >
              <label className="fw-bold fs-5">{t("clientViewModal.Client")}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div>
              {" "}
              <p
                style={{
                  marginLeft: "15px",
                  marginBottom: 0,
                  padding: 0,
                  color: "gray",
                  fontSize: "small",
                }}
              >
               {t("clientViewModal.ClientInfo")}
              </p>
            </div>

            <div className="modal-body">
              <div className="row text-center"></div>
              <div className="row">
                <div className="col m-2">
                  <div className="col m-2 text-center">
                    <img src={`clientes/${logo.input}`} alt="Logo" className="logoModal" />
                  </div>
                </div>
                <div className="col  m-2 ">
                  <div className="m-1 p-1 text-center">
                    <p className="fw-semibold fs-5">{client.input}</p>
                    <p className="text-secondary">
                      {" "}
                      <span>{`${
                        estado.input === 1 ? `${t("clientTable.Active")}` : `${t("clientTable.Inactive")}`
                      }`}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


     { <div id="modalCreateClient" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div
              className="modal-header mb-0 pb-0 text-center"
              style={{ borderBottom: "none" }}
            >
              <label className="fw-bold fs-5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row text-center"></div>
              <div className="row">
                <div className="col m-2">
                  <div className="col m-2 text-center">
                  <img src={`clientes/${logoEdit}`} alt="Logo" className="logoModal"/>
                  </div>
                  <div className="col m-2 text-center">
                  
                  <input type="file" className="btn btn-primary"   accept=".jpg, .jpeg, .png"  name="logo" onChange={handleFileChange}
/>

                
                  </div>
                </div>
                <div className="col  m-2 ">
                  <label id="labelAnimation" className="text-center">

                      <input type="text" placeholder=" " className="input-new" name="client" value={client.input} onChange={(e)=>client.handleChange(e.target.value)}/>
                      <span className="labelName">{t("clientModal.ClientName")}</span>
               
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
              >
                 {t("sidebarlt.Cancel")}
              </button>
              <button
                onClick={() => validar(idToEdit)}
                className="btn-primary btn"
              >
                {t("sidebarlt.Save")}
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

import { useState, useEffect } from "react";
import TableDetalle from "../../components/Tables/table";

import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import useInput from "../../components/hooks/useInput";
import TableSurvey from "../../components/Tables/tableSurvey";

const SurveyList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)
  const url = "ENDPOINT de la API";

  const [accessToken, setAccessToken] = useState("");
  const [operation, setOperation] = useState([1]);
  // const [title, setTitle] = useState();
  const [idToEdit, setidToEdit] = useState(null);

  const [survey, setSurvey] = useState([]);
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
  const type = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const idClient = useInput({ defaultValue: "", validate: /^[1-4]+$/ });

  useEffect(() => {
    // Se establecen los survey una vez que el componente se monta
    setSurvey([
      {
        id: "3",
        title: "Encuesta de satisfacción",
        start_date: "2023-10-01",
        end_date: "2024-03-24",
        description: "Encuesta de satisfacción para el usuario final",
        link: "http://localhost/trabajo_desarrollo/eva/encuesta.php?id=3",
        type: "survey",
        idClient: "1",
      },
    ]);
  }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez

  const config = {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Cache-Control": "no-cache",
    },
  };

  // const getAdmins = async () => {
  //   try {
  //     if (!accessToken) {
  //
  //       throw new Error("No se proporcionó un token de acceso");
  //     }
  //     const respuesta = await axios.get(url, config);
  //     setSurvey(respuesta.data);
  //   } catch (error) {
  //     console.error("Error al obtener los administradores:", error.message);
  //
  //   }
  // };

  // const openModal = (op, admin) => {
  //   setOperation(op);
  //   if (op === 1) {
  //     setTitle("Registrar administrador");
  //     lastName.handleChange("");
  //     email.handleChange("");
  //     password.handleChange("");
  //     role.handleChange("");
  //     state.handleChange("");
  //   } else if (op === 2) {
  //     setTitle("Editar administrador");
  //     name.handleChange(admin?.name);
  //     lastName.handleChange(admin?.lastName);
  //     email.handleChange(admin?.email);
  //     password.handleChange(admin?.password);
  //     role.handleChange(admin?.role);
  //     state.handleChange(admin?.state);
  //     setidToEdit(admin?.id);
  //   }
  // };

  // const validar = (id) => {
  //   var parametros;
  //   var metodo;

  //   if (
  //     name.input.trim() === "" ||
  //     lastName.input.trim() === "" ||
  //     email.input.trim() === "" ||
  //     password.input.trim() === "" ||
  //     role.input === "" ||
  //     state.input === ""
  //   ) {
  //     show_alert("error", "Completa todos los campos del formulario");
  //   } else {
  //     if (operation === 1) {
  //       parametros = {
  //         name: name.input,
  //         lastName: lastName.input,
  //         email: email.input,
  //         password: 123,
  //         role: role.input,
  //         state: state.input,
  //       };
  //       metodo = "post";
  //     } else if (operation === 2) {
  //       parametros = {
  //         name: name.input,
  //         lastName: lastName.input,
  //         email: email.input,
  //         password: 123,
  //         role: role.input,
  //         state: state.input,
  //       };
  //       metodo = "put";
  //     }
  //     sendData(metodo, parametros, id);
  //   }
  // };

  // const sendData = async (metodo, parametros, id) => {
  //   if (metodo === "POST") {
  //     const duplicados = survey.find((u) => u.name === parametros.name);

  //     if (duplicados) {
  //       show_alert("warning", "Este administrador ya existe");
  //       return;
  //     }
  //     await axios
  //       .post(url, parametros, config)
  //       .then(function (respuesta) {
  //         show_alert("success", "Administrador creado");
  //         document.getElementById("btnCerrar").click();
  //         // getAdmins();
  //       })
  //       .catch(function (error) {
  //         show_alert("error", "Error de solicitud");
  //       });
  //   } else if (metodo === "PUT") {
  //     await axios
  //       .put(`${url}${id}`, parametros, config)
  //       .then(function (respuesta) {
  //         show_alert("success", "Administrador editado con éxito");
  //         document.getElementById("btnCerrar").click();
  //         // getAdmins();
  //       })
  //       .catch(function (error) {
  //         show_alert("error", "El administrador no pudo ser editado");
  //       });
  //   }
  // };

  // const deleteCargo = (admin) => {
  //   const id = admin.id;
  //   const name = admin.name;
  //   const MySwal = withReactContent(Swal);
  //   MySwal.fire({
  //     title: "¿Seguro quieres eliminar el admin " + name + "?",
  //     icon: "question",
  //     text: "No se podrá dar marcha atrás",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axios.delete(`${url}${id}`, config);
  //         show_alert("success", "Admin eliminado exitosamente");
  //         // getAdmins();
  //       } catch (error) {
  //         show_alert("error", "Error al eliminar el admin");
  //         console.error(error);
  //       }
  //     } else {
  //       show_alert("info", "El admin no fue eliminado");
  //     }
  //     // getAdmins();
  //   });
  // };

  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section
          style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
        >
          <SidebarLT1 />
          <div className="container mt-0">
            {survey.length > 0 && (
              <TableSurvey
                header={[...Object.keys(survey[0])]}
                data={survey}
                // onCreate={() => openModal(1)}
                // onRemove={(item) => deleteCargo(item)}
                // modalId={"modalAdmin"}
                // modalId2={"modalAdmin"}
                // onUpdate={(payload) => openModal(2, payload)}
                // onView={(payload) => openModalCont(payload)}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SurveyList;

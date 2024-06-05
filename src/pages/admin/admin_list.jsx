import { useState, useEffect } from "react";
import TableDetalle from "../../components/Tables/table";

import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import useInput from "../../components/hooks/useInput";

const AdminList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)
  const url = "ENDPOINT de la API";

  const [accessToken, setAccessToken] = useState("");
  const [operation, setOperation] = useState([1]);
  const [title, setTitle] = useState();
  const [idToEdit, setidToEdit] = useState(null);

  const [admins, setAdmins] = useState([]);
  const name = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const lastName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const email = useInput({
    defaultValue: "",
    validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/,
  });
  const password = useInput({
    defaultValue: "",
    validate:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  });
  const role = useInput({ defaultValue: "", validate: /^[1-2]+$/ });
  const state = useInput({ defaultValue: "", validate: /^[1-2]+$/ });

  useEffect(() => {
    // // getAdmins();
    // Se establecen los admins una vez que el componente se monta
    setAdmins([
      {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        email: "juan.perez@example.com",
        password: "123",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 2,
        nombre: "María",
        apellido: "González",
        email: "maria.gonzalez@example.com",
        password: "456",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 3,
        nombre: "Pedro",
        apellido: "López",
        email: "pedro.lopez@example.com",
        password: "789",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 4,
        nombre: "Ana",
        apellido: "Martínez",
        email: "ana.martinez@example.com",
        password: "abc",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 5,
        nombre: "Carlos",
        apellido: "Sánchez",
        email: "carlos.sanchez@example.com",
        password: "def",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 6,
        nombre: "Laura",
        apellido: "Fernández",
        email: "laura.fernandez@example.com",
        password: "ghi",
        rol: "Administrador",
        estado: "Inactivo",
      },
      {
        id: 7,
        nombre: "Daniel",
        apellido: "Gómez",
        email: "daniel.gomez@example.com",
        password: "jkl",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 8,
        nombre: "Sofía",
        apellido: "Díaz",
        email: "sofia.diaz@example.com",
        password: "mno",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 9,
        nombre: "Pablo",
        apellido: "Rodríguez",
        email: "pablo.rodriguez@example.com",
        password: "pqr",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 10,
        nombre: "Elena",
        apellido: "López",
        email: "elena.lopez@example.com",
        password: "stu",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 11,
        nombre: "Mario",
        apellido: "Hernández",
        email: "mario.hernandez@example.com",
        password: "vwx",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 12,
        nombre: "Luisa",
        apellido: "Martín",
        email: "luisa.martin@example.com",
        password: "yz1",
        rol: "Administrador",
        estado: "Inactivo",
      },
      {
        id: 13,
        nombre: "Javier",
        apellido: "García",
        email: "javier.garcia@example.com",
        password: "234",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 14,
        nombre: "Marcela",
        apellido: "Soto",
        email: "marcela.soto@example.com",
        password: "567",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 15,
        nombre: "Cristian",
        apellido: "Romero",
        email: "cristian.romero@example.com",
        password: "890",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 16,
        nombre: "Valeria",
        apellido: "Navarro",
        email: "valeria.navarro@example.com",
        password: "abc1",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 17,
        nombre: "Germán",
        apellido: "Ruíz",
        email: "german.ruiz@example.com",
        password: "def2",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 18,
        nombre: "Isabel",
        apellido: "Gutiérrez",
        email: "isabel.gutierrez@example.com",
        password: "ghi3",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 19,
        nombre: "Diego",
        apellido: "López",
        email: "diego.lopez@example.com",
        password: "jkl4",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 20,
        nombre: "Paula",
        apellido: "Fernández",
        email: "paula.fernandez@example.com",
        password: "mno5",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 21,
        nombre: "Roberto",
        apellido: "Díaz",
        email: "roberto.diaz@example.com",
        password: "pqr6",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 22,
        nombre: "Sara",
        apellido: "Ruiz",
        email: "sara.ruiz@example.com",
        password: "stu7",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 23,
        nombre: "Martín",
        apellido: "Hernández",
        email: "martin.hernandez@example.com",
        password: "vwx8",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 24,
        nombre: "Lucía",
        apellido: "Gómez",
        email: "lucia.gomez@example.com",
        password: "yz19",
        rol: "Administrador",
        estado: "Inactivo",
      },
      {
        id: 25,
        nombre: "Laura",
        apellido: "García",
        email: "laura.garcia@example.com",
        password: "2340",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 26,
        nombre: "Francisco",
        apellido: "Martínez",
        email: "francisco.martinez@example.com",
        password: "5671",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 27,
        nombre: "Eva",
        apellido: "Martín",
        email: "eva.martin@example.com",
        password: "8902",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 28,
        nombre: "Jorge",
        apellido: "Hernández",
        email: "jorge.hernandez@example.com",
        password: "abc13",
        rol: "Usuario",
        estado: "Activo",
      },
      {
        id: 29,
        nombre: "Marta",
        apellido: "Gutiérrez",
        email: "marta.gutierrez@example.com",
        password: "def24",
        rol: "Usuario",
        estado: "Inactivo",
      },
      {
        id: 30,
        nombre: "Alberto",
        apellido: "Sánchez",
        email: "alberto.sanchez@example.com",
        password: "ghi35",
        rol: "Administrador",
        estado: "Activo",
      },
      {
        id: 31,
        nombre: "Carolina",
        apellido: "Pérez",
        email: "carolina.perez@example.com",
        password: "jkl46",
        rol: "Usuario",
        estado: "Activo",
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
  //     setAdmins(respuesta.data);
  //   } catch (error) {
  //     console.error("Error al obtener los administradores:", error.message);
  //
  //   }
  // };

  const openModal = (op, admin) => {
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar administrador");
      name.handleChange("");
      lastName.handleChange("");
      email.handleChange("");
      password.handleChange("");
      role.handleChange("");
      state.handleChange("");
    } else if (op === 2) {
      setTitle("Editar administrador");
      name.handleChange(admin?.name);
      lastName.handleChange(admin?.lastName);
      email.handleChange(admin?.email);
      password.handleChange(admin?.password);
      role.handleChange(admin?.role);
      state.handleChange(admin?.state);
      setidToEdit(admin?.id);
    }
  };

  const validar = (id) => {
    var parametros;
    var metodo;

    if (
      name.input.trim() === "" ||
      lastName.input.trim() === "" ||
      email.input.trim() === "" ||
      password.input.trim() === "" ||
      role.input === "" ||
      state.input === ""
    ) {
      show_alert("error", "Completa todos los campos del formulario");
    } else {
      if (operation === 1) {
        parametros = {
          name: name.input,
          lastName: lastName.input,
          email: email.input,
          password: 123,
          role: role.input,
          state: state.input,
        };
        metodo = "post";
      } else if (operation === 2) {
        parametros = {
          name: name.input,
          lastName: lastName.input,
          email: email.input,
          password: 123,
          role: role.input,
          state: state.input,
        };
        metodo = "put";
      }
      sendData(metodo, parametros, id);
    }
  };

  const sendData = async (metodo, parametros, id) => {
    if (metodo === "POST") {
      const duplicados = admins.find((u) => u.name === parametros.name);

      if (duplicados) {
        show_alert("warning", "Este administrador ya existe");
        return;
      }
      await axios
        .post(url, parametros, config)
        .then(function (respuesta) {
          show_alert("success", "Administrador creado");
          document.getElementById("btnCerrar").click();
          // getAdmins();
        })
        .catch(function (error) {
          show_alert("error", "Error de solicitud");
        });
    } else if (metodo === "PUT") {
      await axios
        .put(`${url}${id}`, parametros, config)
        .then(function (respuesta) {
          show_alert("success", "Administrador editado con éxito");
          document.getElementById("btnCerrar").click();
          // getAdmins();
        })
        .catch(function (error) {
          show_alert("error", "El administrador no pudo ser editado");
        });
    }
  };

  const deleteCargo = (admin) => {
    const id = admin.id;
    const name = admin.name;
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro quieres eliminar el admin " + name + "?",
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${url}${id}`, config);
          show_alert("success", "Admin eliminado exitosamente");
          // getAdmins();
        } catch (error) {
          show_alert("error", "Error al eliminar el admin");
          console.error(error);
        }
      } else {
        show_alert("info", "El admin no fue eliminado");
      }
      // getAdmins();
    });
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
            {admins.length > 0 && (
              <TableDetalle
                header={[...Object.keys(admins[0])]}
                data={admins}
                onCreate={() => openModal(1)}
                onRemove={(item) => deleteCargo(item)}
                modalId={"modalAdmin"}
                modalId2={"modalAdmin"}
                onUpdate={(payload) => openModal(2, payload)}
                onView={(payload) => openModalCont(payload)}
              />
            )}
          </div>
        </section>
      </div>
      <div id="modalAdmin" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
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
            <div className="modal-body">
              <div className="row w-50 d-flex flex-column">
                <div className="col fw-bold">Datos de usuario</div>
                <div className="col">
                  <label className="fw-bold">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    value={name.input}
                    onChange={(e) => name.handleChange(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label className="fw-bold">Segundo nombre:</label>
                  <input type="text" name="lastName" />
                </div>
                <div className="col">
                  <label className="fw-bold">Apellido</label>
                  <input
                    type="text"
                    name="email"
                    value={lastName.input}
                    onChange={(e) => lastName.handleChange(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label className="fw-bold">Cliente:</label>
                  <input type="number" name="role" />
                </div>
              </div>
              <div className="row w-50 f-flex flex-column">
                <div className="col fw-bold">Datos administrativos</div>
                <div className="col">
                  <label className="fw-bold">E-Mail</label>
                  <input
                    type="text"
                    name="email"
                    value={email.input}
                    onChange={(e) => email.handleChange(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label className="fw-bold">Contraseña:</label>
                  <input
                    type="number"
                    name="role"
                    value={password.input}
                    onChange={(e) => password.handleChange(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label className="fw-bold">Confirmar contraseña:</label>
                  <input type="number" name="role" />
                </div>
                <small>Si no desea cambiar la contraseña dejar en blanco</small>
                <div className="col">
                  <label className="fw-bold">Rol</label>
                  <select
                    name=""
                    id=""
                    value={role.input}
                    onChange={(e) => role.handleChange(e.target.value)}
                  >
                    <option value="" disabled>
                      {" "}
                      Selecciona un estado{" "}
                    </option>
                    <option value="1"> Administrador</option>
                    <option value="2"> Cliente </option>
                  </select>
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
                className="btn btn-success"
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

export default AdminList;

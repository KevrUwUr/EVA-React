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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  });
  const type = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const language = useInput({ defaultValue: "", validate: /^(es|en|it|pt)$/ });
  const registrationDate = useInput({ defaultValue: "", validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/ });
  const lastVisitDate = useInput({ defaultValue: "", validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/ });


  

  useEffect(() => {
    // // getAdmins();
    // Se establecen los admins una vez que el componente se monta
    setAdmins([
      {
          ID: 1,
          lastname: "García",
          firstname: "Carlos",
          middlename: "Andrés",
          email: "carlos.andres.garcia@example.com",
          password: "carlos2024!",
          type: "admin",
          language: "es",
          registration_date: "2023-01-15",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 2,
          lastname: "López",
          firstname: "María",
          middlename: "Fernanda",
          email: "maria.fernanda.lopez@example.com",
          password: "maria2024#",
          type: "user",
          language: "es",
          registration_date: "2023-02-20",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 3,
          lastname: "Martínez",
          firstname: "Juan",
          middlename: "Pablo",
          email: "juan.pablo.martinez@example.com",
          password: "juan2024$",
          type: "moderator",
          language: "en",
          registration_date: "2023-03-10",
          last_visit_date: "2024-05-30"
      },
      {
          ID: 4,
          lastname: "Rodríguez",
          firstname: "Ana",
          middlename: "Lucía",
          email: "ana.lucia.rodriguez@example.com",
          password: "ana2024%",
          type: "user",
          language: "es",
          registration_date: "2023-04-05",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 5,
          lastname: "Hernández",
          firstname: "Luis",
          middlename: "Miguel",
          email: "luis.miguel.hernandez@example.com",
          password: "luis2024^",
          type: "admin",
          language: "en",
          registration_date: "2023-05-18",
          last_visit_date: "2024-05-29"
      },
      {
          ID: 6,
          lastname: "González",
          firstname: "Laura",
          middlename: "Elena",
          email: "laura.elena.gonzalez@example.com",
          password: "laura2024&",
          type: "user",
          language: "es",
          registration_date: "2023-06-22",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 7,
          lastname: "Pérez",
          firstname: "Jorge",
          middlename: "Alberto",
          email: "jorge.alberto.perez@example.com",
          password: "jorge2024*",
          type: "moderator",
          language: "en",
          registration_date: "2023-07-30",
          last_visit_date: "2024-05-31"
      },
      {
          ID: 8,
          lastname: "Sánchez",
          firstname: "Mónica",
          middlename: "Beatriz",
          email: "monica.beatriz.sanchez@example.com",
          password: "monica2024(",
          type: "user",
          language: "es",
          registration_date: "2023-08-14",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 9,
          lastname: "Ramírez",
          firstname: "Eduardo",
          middlename: "José",
          email: "eduardo.jose.ramirez@example.com",
          password: "eduardo2024)",
          type: "admin",
          language: "en",
          registration_date: "2023-09-19",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 10,
          lastname: "Torres",
          firstname: "Patricia",
          middlename: "María",
          email: "patricia.maria.torres@example.com",
          password: "patricia2024_",
          type: "user",
          language: "es",
          registration_date: "2023-10-24",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 11,
          lastname: "Flores",
          firstname: "Ricardo",
          middlename: "Antonio",
          email: "ricardo.antonio.flores@example.com",
          password: "ricardo2024+",
          type: "moderator",
          language: "en",
          registration_date: "2023-11-30",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 12,
          lastname: "Rivera",
          firstname: "Gabriela",
          middlename: "Isabel",
          email: "gabriela.isabel.rivera@example.com",
          password: "gabriela2024|",
          type: "user",
          language: "es",
          registration_date: "2023-12-05",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 13,
          lastname: "Gómez",
          firstname: "Sergio",
          middlename: "David",
          email: "sergio.david.gomez@example.com",
          password: "sergio2024!",
          type: "admin",
          language: "en",
          registration_date: "2023-01-12",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 14,
          lastname: "Díaz",
          firstname: "Carmen",
          middlename: "Luisa",
          email: "carmen.luisa.diaz@example.com",
          password: "carmen2024#",
          type: "user",
          language: "es",
          registration_date: "2023-02-17",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 15,
          lastname: "Morales",
          firstname: "Héctor",
          middlename: "Francisco",
          email: "hector.francisco.morales@example.com",
          password: "hector2024$",
          type: "moderator",
          language: "en",
          registration_date: "2023-03-21",
          last_visit_date: "2024-05-30"
      },
      {
          ID: 16,
          lastname: "Ortiz",
          firstname: "Paula",
          middlename: "Rocío",
          email: "paula.rocio.ortiz@example.com",
          password: "paula2024%",
          type: "user",
          language: "es",
          registration_date: "2023-04-08",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 17,
          lastname: "Cruz",
          firstname: "Alberto",
          middlename: "Manuel",
          email: "alberto.manuel.cruz@example.com",
          password: "alberto2024^",
          type: "admin",
          language: "en",
          registration_date: "2023-05-15",
          last_visit_date: "2024-05-31"
      },
      {
          ID: 18,
          lastname: "Gutiérrez",
          firstname: "Angela",
          middlename: "María",
          email: "angela.maria.gutierrez@example.com",
          password: "angela2024&",
          type: "user",
          language: "es",
          registration_date: "2023-06-21",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 19,
          lastname: "Chávez",
          firstname: "Mario",
          middlename: "Alejandro",
          email: "mario.alejandro.chavez@example.com",
          password: "mario2024*",
          type: "moderator",
          language: "en",
          registration_date: "2023-07-28",
          last_visit_date: "2024-05-29"
      },
      {
          ID: 20,
          lastname: "Ramos",
          firstname: "Verónica",
          middlename: "Claudia",
          email: "veronica.claudia.ramos@example.com",
          password: "veronica2024(",
          type: "user",
          language: "es",
          registration_date: "2023-08-11",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 21,
          lastname: "Molina",
          firstname: "Fernando",
          middlename: "Gustavo",
          email: "fernando.gustavo.molina@example.com",
          password: "fernando2024)",
          type: "admin",
          language: "en",
          registration_date: "2023-09-16",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 22,
          lastname: "Castro",
          firstname: "Daniela",
          middlename: "Silvia",
          email: "daniela.silvia.castro@example.com",
          password: "daniela2024_",
          type: "user",
          language: "es",
          registration_date: "2023-10-21",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 23,
          lastname: "Méndez",
          firstname: "Roberto",
          middlename: "Javier",
          email: "roberto.javier.mendez@example.com",
          password: "roberto2024+",
          type: "moderator",
          language: "en",
          registration_date: "2023-11-27",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 24,
          lastname: "Pacheco",
          firstname: "Alejandra",
          middlename: "Sofía",
          email: "alejandra.sofia.pacheco@example.com",
          password: "alejandra2024|",
          type: "user",
          language: "es",
          registration_date: "2023-12-03",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 25,
          lastname: "Rojas",
          firstname: "Julio",
          middlename: "César",
          email: "julio.cesar.rojas@example.com",
          password: "julio2024!",
          type: "admin",
          language: "en",
          registration_date: "2023-01-11",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 26,
          lastname: "Vargas",
          firstname: "Esther",
          middlename: "Alicia",
          email: "esther.alicia.vargas@example.com",
          password: "esther2024#",
          type: "user",
          language: "es",
          registration_date: "2023-02-16",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 27,
          lastname: "Suárez",
          firstname: "Diego",
          middlename: "Raúl",
          email: "diego.raul.suarez@example.com",
          password: "diego2024$",
          type: "moderator",
          language: "en",
          registration_date: "2023-03-20",
          last_visit_date: "2024-05-31"
      },
      {
          ID: 28,
          lastname: "Mendoza",
          firstname: "Elena",
          middlename: "Patricia",
          email: "elena.patricia.mendoza@example.com",
          password: "elena2024%",
          type: "user",
          language: "es",
          registration_date: "2023-04-07",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 29,
          lastname: "Aguilar",
          firstname: "Javier",
          middlename: "Iván",
          email: "javier.ivan.aguilar@example.com",
          password: "javier2024^",
          type: "admin",
          language: "en",
          registration_date: "2023-05-14",
          last_visit_date: "2024-05-30"
      },
      {
          ID: 30,
          lastname: "Herrera",
          firstname: "Lucía",
          middlename: "Pilar",
          email: "lucia.pilar.herrera@example.com",
          password: "lucia2024&",
          type: "user",
          language: "es",
          registration_date: "2023-06-20",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 31,
          lastname: "Reyes",
          firstname: "Carlos",
          middlename: "Ángel",
          email: "carlos.angel.reyes@example.com",
          password: "carlos2024*",
          type: "moderator",
          language: "en",
          registration_date: "2023-07-27",
          last_visit_date: "2024-05-29"
      },
      {
          ID: 32,
          lastname: "Soto",
          firstname: "Marcela",
          middlename: "Paola",
          email: "marcela.paola.soto@example.com",
          password: "marcela2024(",
          type: "user",
          language: "es",
          registration_date: "2023-08-10",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 33,
          lastname: "Silva",
          firstname: "Fernando",
          middlename: "Luis",
          email: "fernando.luis.silva@example.com",
          password: "fernando2024)",
          type: "admin",
          language: "en",
          registration_date: "2023-09-15",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 34,
          lastname: "Álvarez",
          firstname: "Marta",
          middlename: "Estefanía",
          email: "marta.estefania.alvarez@example.com",
          password: "marta2024_",
          type: "user",
          language: "es",
          registration_date: "2023-10-20",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 35,
          lastname: "Vega",
          firstname: "Luis",
          middlename: "Alejandro",
          email: "luis.alejandro.vega@example.com",
          password: "luis2024+",
          type: "moderator",
          language: "en",
          registration_date: "2023-11-26",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 36,
          lastname: "Mejía",
          firstname: "Adriana",
          middlename: "Carolina",
          email: "adriana.carolina.mejia@example.com",
          password: "adriana2024|",
          type: "user",
          language: "es",
          registration_date: "2023-12-02",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 37,
          lastname: "Castillo",
          firstname: "Francisco",
          middlename: "Alberto",
          email: "francisco.alberto.castillo@example.com",
          password: "francisco2024!",
          type: "admin",
          language: "en",
          registration_date: "2023-01-10",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 38,
          lastname: "Romero",
          firstname: "Gloria",
          middlename: "Teresa",
          email: "gloria.teresa.romero@example.com",
          password: "gloria2024#",
          type: "user",
          language: "es",
          registration_date: "2023-02-15",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 39,
          lastname: "Campos",
          firstname: "Miguel",
          middlename: "Ángel",
          email: "miguel.angel.campos@example.com",
          password: "miguel2024$",
          type: "moderator",
          language: "en",
          registration_date: "2023-03-19",
          last_visit_date: "2024-05-30"
      },
      {
          ID: 40,
          lastname: "Fuentes",
          firstname: "Elena",
          middlename: "Valeria",
          email: "elena.valeria.fuentes@example.com",
          password: "elena2024%",
          type: "user",
          language: "es",
          registration_date: "2023-04-06",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 41,
          lastname: "Cabrera",
          firstname: "Carlos",
          middlename: "Andrés",
          email: "carlos.andres.cabrera@example.com",
          password: "carlos2024^",
          type: "admin",
          language: "en",
          registration_date: "2023-05-13",
          last_visit_date: "2024-05-31"
      },
      {
          ID: 42,
          lastname: "Reyes",
          firstname: "Paula",
          middlename: "Juliana",
          email: "paula.juliana.reyes@example.com",
          password: "paula2024&",
          type: "user",
          language: "es",
          registration_date: "2023-06-19",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 43,
          lastname: "Luna",
          firstname: "José",
          middlename: "María",
          email: "jose.maria.luna@example.com",
          password: "jose2024*",
          type: "moderator",
          language: "en",
          registration_date: "2023-07-26",
          last_visit_date: "2024-05-29"
      },
      {
          ID: 44,
          lastname: "Marín",
          firstname: "Beatriz",
          middlename: "Soledad",
          email: "beatriz.soledad.marin@example.com",
          password: "beatriz2024(",
          type: "user",
          language: "es",
          registration_date: "2023-08-09",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 45,
          lastname: "Jiménez",
          firstname: "Pedro",
          middlename: "Gabriel",
          email: "pedro.gabriel.jimenez@example.com",
          password: "pedro2024)",
          type: "admin",
          language: "en",
          registration_date: "2023-09-14",
          last_visit_date: "2024-06-05"
      },
      {
          ID: 46,
          lastname: "Pineda",
          firstname: "Natalia",
          middlename: "Patricia",
          email: "natalia.patricia.pineda@example.com",
          password: "natalia2024_",
          type: "user",
          language: "es",
          registration_date: "2023-10-19",
          last_visit_date: "2024-06-02"
      },
      {
          ID: 47,
          lastname: "Espinoza",
          firstname: "Héctor",
          middlename: "Manuel",
          email: "hector.manuel.espinoza@example.com",
          password: "hector2024+",
          type: "moderator",
          language: "en",
          registration_date: "2023-11-25",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 48,
          lastname: "Pérez",
          firstname: "María",
          middlename: "José",
          email: "maria.jose.perez@example.com",
          password: "maria2024|",
          type: "user",
          language: "es",
          registration_date: "2023-12-01",
          last_visit_date: "2024-06-04"
      },
      {
          ID: 49,
          lastname: "Ruiz",
          firstname: "David",
          middlename: "Felipe",
          email: "david.felipe.ruiz@example.com",
          password: "david2024!",
          type: "admin",
          language: "en",
          registration_date: "2023-01-09",
          last_visit_date: "2024-06-03"
      },
      {
          ID: 50,
          lastname: "Navarro",
          firstname: "Carolina",
          middlename: "Marcela",
          email: "carolina.marcela.navarro@example.com",
          password: "carolina2024#",
          type: "user",
          language: "es",
          registration_date: "2023-02-14",
          last_visit_date: "2024-06-01"
      },
      {
          ID: 51,
          lastname: "Ortega",
          firstname: "Joaquín",
          middlename: "Santiago",
          email: "joaquin.santiago.ortega@example.com",
          password: "joaquin2024$",
          type: "moderator",
          language: "en",
          registration_date: "2023-03-18",
          last_visit_date: "2024-05-30"
      }
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

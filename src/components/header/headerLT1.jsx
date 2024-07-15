import Logo from "../../assets/img/logo EVA.webp";
import axios from 'axios'
import { useContext,useState,useEffect} from "react";
import { toggleBlackMode } from "../../assets/js/toggleBlackMode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Modal,ModalBody,ModalHeader,Button,ModalFooter} from "reactstrap";
import { useTranslation } from "react-i18next";

import useInput from "../../components/hooks/useInput";
import "../../assets/css/header_aside.css"
const HeaderLT1 = () => {
  const { accessToken,userId,languageUser,setLanguageUser  } = useContext(UserContext);
  const { t,i18n } = useTranslation();

useEffect(()=>{
  checkinfo()
  i18n.changeLanguage(languageUser)

},[])
const [userLanguage,setUserLanguaje]=useState({language:''})
const [userInfo, setUserInfo] = useState({
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  password: '',
  language: ''
});
const [modal, setModal] = useState(false);

  const openModal = () =>{
    getInfo()
    setModal(true)
  }
  const closeModal=()=> {
    setModal(false)
  }
const lastName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
const firstName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
const middleName = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
const email = useInput({defaultValue: "",validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/, });
const language = useInput({ defaultValue: "", validate: /^(es|en|it|pt)$/ });
const password = useInput({defaultValue: "",validate:/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/,});

const nav = useNavigate();
const now = new Date();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
  const logout=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('accessToken');
    nav("/")
  }
  
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };
 
  const checkinfo= async() =>{
    try{
    console.log(userId)
    const response=await axios.get (`http://localhost/API-EVA/userController/userbyId/${userId}`,config)
    setUserInfo(response.data)
    setLanguageUser(response.data.language)
    console.log(userInfo)
  } catch(error){
    console.error(error)
  }
  }
  const url="http://localhost/API-EVA/userController/userbyId/"
  const urlp="http://localhost/API-EVA/userController/putUser/"
  const getInfo = async () => {
    try {
      console.log(userId);
      const response = await axios.get(`${url}${userId}`, config);
      setUserInfo(response.data);
      console.log(hours,":",minutes,":",seconds)
      firstName.handleChange(userInfo.firstname || "");
      middleName.handleChange(userInfo.middlename || "");
      lastName.handleChange(userInfo.lastname || "");
      email.handleChange(userInfo.email || "");
      password.handleChange(userInfo.password || "");
      language.handleChange(userInfo.language || "en");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLanguaje((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  const updateInfo=async(event)=>{
    event.preventDefault();
    var parameters
    console.log(userInfo)
    if (
      lastName.input.trim() === "" ||
      firstName.input.trim() === "" ||
      email.input.trim() === "" ||
      userLanguage==""
    ) {
      alert("Informacion no diligenciada")
    } else {
        try{
          parameters = {
            firstname: firstName.input,
            middlename: middleName.input,
            lastname: lastName.input,
            email: email.input,
            language: userLanguage.language,
            last_visit_date: "",
          };
          password.input.length>8? parameters['password']=password.input: null;
          const response= await axios.put(`${urlp}${userId}`,parameters,config)
          if(response.data.status){
            //hacer un timeout alert 3s y si le da aceptar antes que se reloguee instantaneamente
            window.location.reload()
          }
          
        }catch(error){
          console.error(error)
        }
    }
  }
  return (
    <header className="sticky-top" >
      <nav className="navbar navbar-expand-lg m-2 mb-3" id="nav-Claro">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-4 col-md-6 col-lg-6 d-flex text-center align-items-center">
              <button
                className="d-lg-none d-block bg-transparent"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i id="icono" className="fa-solid fa-bars"></i>
              </button>
              <a className="" href="/admin">
                <img id="logo" src={Logo} alt="" />
              </a>
            </div>
            <div className="col-8 col-md-6 col-lg-6 d-flex align-items-center justify-content-end">
              <i
                id="icono"
                className="fa-regular fa-moon me-2 luna"
                onClick={()=>toggleBlackMode()}
              ></i>
              {/* [//?Poner modo oscuro] */}
              <i id="icono" className="fa-regular fa-bell me-2"></i>
              <div className="vr fw-bold ms-2 me-2"></div>
              <i id="iconoDegradado" className="fa-solid fa-circle me-2"></i>
              <span className="ps-2 align-items-center">
                <p id="nombreUsuario" className="fw-bold m-0">
                 {`${userInfo.firstname} ${userInfo.middlename} ${userInfo.lastname}`}
                </p>
              </span>
            </div>
            <div
              className="col-1 col-md-1 col-lg-1 d-lg-none collapse navbar-collapse"
              id="navbarNav"
              style={{ border: "none" }}
            >
              <div id="div_ul" className="d-lg-none mt-3">
                <ul className="p-2 ul-colapse">
                  <li className="nav-item">
                    <a
                      className="nav-link tooltip-container"
                      href="/index"
                    >
                      <i id="iconoDegradado" className="fa-solid fa-house"></i>
                    </a>
                  </li>
                  <br />
                  <li className="nav-item">
                    <a className="nav-link tooltip-container" href="admin_list">
                      <i id="iconoDegradado" className="fa-solid fa-user"></i>
                    </a>
                  </li>
                  <br />
                  <li className="nav-item">
                    <a
                      className="nav-link tooltip-container"
                      href="client_list"
                    >
                      <i
                        id="iconoDegradado"
                        className="fa-solid fa-id-card-clip"
                      ></i>
                    </a>
                  </li>
                  <br />
                  <a
                    className="dropdown-toggle nav-link link-dark"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i id="iconoDegradado" className="fa-solid fa-gear"></i>
                  </a>
                  <li className="nav-item dropdown">
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target="#userModalInfo2"  onClick={()=> openModal()}> 
                        {t("headerlt.Manage_account")}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={()=>logout()}>{t("headerlt.Logout")}</button>
                      </li>
                      {/* [//! Cerrar sesión] */}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <ManageUser data={fakeData}/> */}
      <Modal isOpen={modal} toggle={openModal} centered>
        <ModalHeader toggle={closeModal}>{t("headerlt.Manage_account")}</ModalHeader>
        <ModalBody>
        
              <div id="msg"></div>

              <div className="form-group m-2">
                <label htmlFor="firstname" className="form-label">{t("headerlt.First_name")}</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  placeholder=" "
                  value={firstName.input}
                  onChange={(e) => firstName.handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="middlename" className="form-label">{t("headerlt.Middle_name")}</label>
                <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="form-control"
                  placeholder=" "
                  value={middleName.input}
                  onChange={(e) => middleName.handleChange(e.target.value)}
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="lastname" className="form-label">{t("headerlt.Last_name")}</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  placeholder=" "
                  value={lastName.input}
                      onChange={(e) => lastName.handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="email" className="form-label">{t("headerlt.Email")}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder=" "
                  value={email.input}
                      onChange={(e) => email.handleChange(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="password" className="form-label">{t("headerlt.Password")}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => password.handleChange(e.target.value)}
                />
                <small>
                  <i>{t("headerlt.Leave_this_blank_if_you_dont_want_to_change_the_password")}</i>
                </small>
              </div>

              <div className="form-group m-2">
                <label htmlFor="cpass" className="form-label">{t("headerlt.Confirm_Password")}</label>
                <input
                  type="password"
                  name="cpass"
                  id="cpass"
                  className="form-control"
                  placeholder=" "
                />
                <small id="pass_match" data-status=""></small>
              </div>

              <p className="lang m-2" key="titulo26">{t("headerlt.Language")}</p>
              <div className="btn-group flex-wrap m-2" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check translate"
                  id="es"
                  value="es"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "es"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="es" key="titulo27">{t("headerlt.Spanish")}</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="en"
                  value="en"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "en"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="en" key="titulo28">{t("headerlt.English")}</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="it"
                  value="it"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "it"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="it" key="titulo29">{t("headerlt.Italian")}</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="pt"
                  value="pt"
                  name="language"
                  autoComplete="off"
                  checked={language.input === "pt"}
                  onChange={(e) => language.handleChange(e.target.value)}
                />
                <label className="btn btn-outline-dark lang" htmlFor="pt" key="titulo30">{t("headerlt.Portuguese")}</label>
              </div>

       
       
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>{t("headerlt.Close")}</Button>
          <Button color="primary" onClick={updateInfo}>{t("headerlt.Save_changes")}</Button>
        </ModalFooter>
      </Modal>
    </header>
  );
};

export default HeaderLT1;

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import '../../assets/css/ManageUser.css';

const ManageUser = ({ closeModal }) => {
  const { accessToken, userId } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    id: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    password: '',
    language: 'es' // valor predeterminado, puedes cambiarlo según tus necesidades
  });

  useEffect(() => {
    getInfo();
  }, []);

  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };

  const getInfo = async () => {
    try {
      console.log(userId);
      const response = await axios.get(`http://localhost/API-EVA/userController/userbyId/${userId}`, config);
      setUserInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  return (
    <div className="modal " tabIndex="-1"  aria-hidden="false">
      <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <form action="" id="manage-user-self">
              <input type="hidden" name="id" value={userInfo.id} />
              <div id="msg"></div>

              <div className="form-group m-2">
                <label htmlFor="firstname" className="form-label">Primer nombre</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  placeholder=" "
                  value={userInfo.firstname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="middlename" className="form-label">Segundo nombre</label>
                <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="form-control"
                  placeholder=" "
                  value={userInfo.middlename}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="lastname" className="form-label">Apellidos</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  placeholder=" "
                  value={userInfo.lastname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="email" className="form-label">Correo</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder=" "
                  value={userInfo.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder=" "
                  onChange={handleChange}
                />
                <small>
                  <i>Deje esto en blanco si no desea cambiar la contraseña.</i>
                </small>
              </div>

              <div className="form-group m-2">
                <label htmlFor="cpass" className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="cpass"
                  id="cpass"
                  className="form-control"
                  placeholder=" "
                />
                <small id="pass_match" data-status=""></small>
              </div>

              <p className="lang m-2" key="titulo26">Idioma</p>
              <div className="btn-group flex-wrap m-2" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check translate"
                  id="es"
                  value="es"
                  name="language"
                  autoComplete="off"
                  checked={userInfo.language === "es"}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-dark lang" htmlFor="es" key="titulo27">Español</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="en"
                  value="en"
                  name="language"
                  autoComplete="off"
                  checked={userInfo.language === "en"}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-dark lang" htmlFor="en" key="titulo28">Inglés</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="it"
                  value="it"
                  name="language"
                  autoComplete="off"
                  checked={userInfo.language === "it"}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-dark lang" htmlFor="it" key="titulo29">Italiano</label>

                <input
                  type="radio"
                  className="btn-check translate"
                  id="pt"
                  value="pt"
                  name="language"
                  autoComplete="off"
                  checked={userInfo.language === "pt"}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-dark lang" htmlFor="pt" key="titulo30">Portugués</label>
              </div>

              <div className="modal-footer">
                <button className="btn bg-gradient-guardar mr-2" id="btn-send-survey" type="submit">
                  Guardar
                </button>
                <button className="btn btn-secondary" type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;

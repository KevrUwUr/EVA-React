import React from 'react';
import "../../../assets/css/encuesta.css"
import img1 from "../../../assets/img/clientes/700.png";
import img2 from "../../../assets/img/encuesta.png";

export default function Public_survey() {
  return (
    <div >
      <svg
        id="personalized-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="10 0 1920 1080"
        fill="#2d3277" style={{zIndex:-1}}      >
        <path
          d="m874.8,203.28S993.6-136.92,0,62.88v1587.6s186.3-116.1,189-197.1h729s359.1,267.3,494.1-62.1v-367.2s-30.34-99.56-132.3-198.84"
        />
      </svg>
      <div className="container container-quiz">
        <form className="quiz-manage">
          <div className="row cont-logo">
            <div className="col-12 d-flex justify-content-start">
              <img className="logo" src={img1} alt="" />
            </div>
          </div>
          <div className="cont-quiz">
            <div className="row text-center cont-title-quiz">
              <div className="col-12">
                <p className="tittle text-center title-quiz">
                  <img src={img2} alt="" width="5%" />Encuesta de satisfaccion
                </p>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <p className="quest fw-bolder fs-5">
                      ¿Qué tan satisfecho estás con el servicio que acabas de recibir?*
                    </p>
                  </div>
                  <div className="col-12">
                    <div className="input-group justify-content-center align-items-center p-1">
                      <div className="mt-3">
                        <p className="ms-2 fw-normal fs-6">Muy insatisfecho</p>
                      </div>
                      <div className="btn-group p-2 m-2" role="group">
                        {["Muy insatisfecho", "Insatisfecho", "Ni satisfecho/ni insatisfecho", "Satisfecho", "Muy satisfecho"].map((tooltip, index) => (
                          <label key={index} data-bs-toggle="tooltip" data-bs-title={tooltip} className="m-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="answer[19]"
                              id={`satisfaccion${index + 1}`}
                              autoComplete="off"
                              value={index + 1}
                            />
                            <span className={`btn ${index < 2 ? 'btn-outline-danger' : index === 2 ? 'btn-outline-dark' : 'btn-outline-success'}`}>
                              {index + 1}
                            </span>
                          </label>
                        ))}
                      </div>
                      <div>
                        <p className="mt-3">Muy satisfecho</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <p className="quest fw-bolder fs-5">
                  ¿Qué tanto recomiendas nuestro servicio a un familiar o amigo?*
                </p>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div>
                      <p className="ms-2 d-none d-lg-block">Nada probable</p>
                    </div>
                  </div>
                  <div className="col-6 d-none d-lg-block">
                    <div className="me-5">
                      <p>Muy probable</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group justify-content-center align-items-center p-1">
                      <div className="btn-group prop-group" role="group">
                        {[...Array(11).keys()].map(value => (
                          <label key={value} data-bs-toggle="tooltip" data-bs-title={value < 7 ? "Nada probable" : value < 9 ? "Neutro" : "Muy probable"} className="ms-1 me-1">
                            <input
                              type="radio"
                              className="btn-check"
                              name="answer[20]"
                              id={`recomendar${value}`}
                              autoComplete="off"
                              value={value}
                            />
                            <span className={`btn ${value < 7 ? 'btn-outline-danger' : value < 9 ? 'btn-outline-dark' : 'btn-outline-success'}`} style={value === 10 ? { fontSize: '100%', margin: 0 } : {}}>
                              {value}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <p className="quest fw-bolder fs-5">¿Su consulta o solicitud fue resuelta?*</p>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group justify-content-center">
                      <div className="btn-group" role="group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="si_no1">
                              <input
                                type="radio"
                                className="btn-check"
                                name="answer[21]"
                                id="si_no1"
                                autoComplete="off"
                                value="SI"
                              />
                              <span className="btn btn-outline-success m-1">SI</span>
                            </label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="si_no2">
                              <input
                                type="radio"
                                className="btn-check"
                                name="answer[21]"
                                id="si_no2"
                                autoComplete="off"
                                value="NO"
                              />
                              <span className="btn btn-outline-danger m-1">NO</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <p className="quest fw-bolder fs-5">¿Qué tan fácil fue gestionar tu consulta o solicitud?*</p>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group justify-content-center align-items-center p-1">
                      <div className="btn-group" role="group">
                        {["Muy difícil", "Difícil", "Ni fácil/ni difícil", "Fácil", "Muy fácil"].map((label, index) => (
                          <label key={index}>
                            <input
                              type="radio"
                              className="btn-check"
                              name="answer[22]"
                              id={`dificultad${index + 1}`}
                              autoComplete="off"
                              value={label}
                            />
                            <span className={`btn ${index < 2 ? 'btn-outline-danger' : index === 2 ? 'btn-outline-dark' : 'btn-outline-success'}`}>
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success m-2">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

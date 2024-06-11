import React from 'react'
import HeaderLT1 from '../../../components/header/headerLT1'
/* import axios from "axios" */
import { useEffect,useState } from 'react'
import SidebarLT1 from '../../../components/aside/sidebarLT1'
import useInput from '../../../components/hooks/useInput'
export default function View_survey() {
  const [data,setData]=useState([])
  const [operation, setOperation] = useState([1]);
  const [title, setTitle] = useState();
  const [idToEdit, setidToEdit] = useState(null); 
  const question = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const type = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const section = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const percentage = useInput({defaultValue: "",validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/});
  const frm_option = useInput({defaultValue: "", validate:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/});
  const conditional = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/});
  const id_conditional = useInput({ defaultValue: "", validate: /^[0-9]*$/ });
  const survey_id = useInput({defaultValue: "",validate: /^[0-9]*$/});
  const conditional_answer=useInput({defaultValue: "", validatE: /^[A-Za-z ]*$/});
  
  useEffect(() => {
    const questions = [    
      {
        "id": "19",
        "question": "¿Qué tan satisfecho estás con el servicio que acabas de recibir?",
        "type": "range_onetofive",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      },
      {
        "id": "20",
        "question": "¿Qué tanto recomiendas nuestro servicio a un familiar o amigo?",
        "type": "range_zerototen",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      },
      {
        "id": "21",
        "question": "¿Su consulta o solicitud fue resuelta?",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      },
      {
        "id": "22",
        "question": "¿Qué tan fácil fue gestionar tu consulta o solicitud?",
        "type": "range_difficulty",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      },
      {
        "id": "23",
        "question": "Cuéntanos más sobre tu experiencia:",
        "type": "textfield_s",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      },
      {
        "id": "27",
        "question": "Emoji Test:",
        "type": "range_emoji",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "3"
      }
    ];

    setData(questions);
  }, []);
  const openModal = (op, idsurvey) => {
    setOperation(op);
    if (op === 1) {
      setTitle("Añadir Pregunta");
      question.handleChange("");
      type.handleChange("");
      section.handleChange("");
      percentage.handleChange("");
      frm_option.handleChange("");
      conditional.handleChange("NO");
      id_conditional.handleChange("0");
      conditional_answer.handleChange("NO");
      survey_id.handleChange(idsurvey);
    } 
    /* else if (op === 2) {
      setTitle("Editar Pregunta");
      question.handleChange(survey?.question);
      type.handleChange(survey?.type);
      section.handleChange(survey?.section);
      percentage.handleChange(survey?.percentage);
      frm_option.handleChange(survey?.frm_option);
      conditional.handleChange(survey?.conditional);
      id_conditional.handleChange(survey?.id_conditional);
      conditional_answer.handleChange(survey?.conditional_answer);
      survey_id.handleChange(survey?.survey_id);
      setIdToEdit(survey?.id);
    } */
  };
  return (
    <div className="App">
      <div id="body">
        <HeaderLT1/>
        <section style={{alignItems:"stretch", flexWrap:"nowrap", padding:0}}>
        <SidebarLT1/>
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-4 borderEVA bg-light">
                <div className="text-center">
                  <h3>Información Encuesta</h3>
                </div>
                <div className="card-body p-0 py-2">
                  <div className="container-fluid">
                    <div className="row d-flex align-items-center">
                      <div className="col-6">
                        <h5>Titulo traido por el id de la encuesta</h5>
                        <p className="fs-6">Descripcion de la encuesta</p>
                      </div>
                      <div className="col-6 text-end">
                        <p className="fs-6">Fecha</p>
                        <p className="fs-6">Cantidad de muestras: </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <div className="card p-4 card-outline card-success borderEVA bg-light">
                <div>
                  <h3 className="text-center">Preguntas de Encuesta</h3>
                  <div className="card-tools">
                    <button className="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target="#modalManageQuestion" onClick={() => openModal(1,3)}>Agregar Nueva pregunta</button>
                  </div>
                </div>
                <form action="" id='manage-sort'>
                  <div className="card-body ui-sorteable">
                                
                      {data.map(question=>(
                        <div className="callout callout info">
                          <div className="row">
                            <div className="col-md-12">
                              <span className="dropleft float-right">
                                {/* //!Aqui va el dropdown */}
                              </span>

                            </div>
                          </div>
                          <h5 className='mt-2'>{question.question}</h5>
                          {question.type=='range_onetofive'?(
                            <div class="input-group justify-content-center">
                            <div class="me-2">
                              <p class="ms-2 fw-normal fs-6">Muy insatisfecho</p>
                            </div>
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                              <a data-bs-toggle="tooltip" data-bs-title="Muy insatisfecho">
                                <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="satisfaccion1" autocomplete="off" value="1"/>
                                <label class="btn btn-outline-danger" for="satisfaccion1">1</label>
                              </a>
      
                              <a data-bs-toggle="tooltip" data-bs-title="Insatisfecho">
                                <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="satisfaccion2" autocomplete="off" value="2"/>
                                <label class="btn btn-outline-danger" for="satisfaccion2">2</label>
                              </a>
      
                              <a data-bs-toggle="tooltip" data-bs-title="Ni satisfecho/ni insatisfecho">
                                <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="satisfaccion3" autocomplete="off" value="3"/>
                                <label class="btn btn-outline-primary" for="satisfaccion3">3</label>
                              </a>
      
                              <a data-bs-toggle="tooltip" data-bs-title="Satisfecho">
                                <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="satisfaccion4" autocomplete="off" value="4"/>
                                <label class="btn btn-outline-success" for="satisfaccion4">4</label>
                              </a>
      
                              <a data-bs-toggle="tooltip" data-bs-title="Muy satisfecho">
                                <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="satisfaccion5" autocomplete="off" value="5"/>
                                <label class="btn btn-outline-success" for="satisfaccion5">5</label>
                              </a>
                            </div>
                            <div class="ms-2">
                              <p class="ms-2 fw-normal fs-6">Muy satisfecho</p>
                            </div>
                          </div>
                          ):(question.type=="range_zerototen"?(
                            <div class="input-group justify-content-center">
											<div class="me-2">
												<p class="ms-2 fw-normal fs-6">Nada probable</p>
											</div>
											<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar1" autocomplete="off" value="0"/>
													<label class="btn btn-outline-danger" for="recomendar1">0</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar2" autocomplete="off" value="1"/>
													<label class="btn btn-outline-danger" for="recomendar2">1</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar3" autocomplete="off" value="2"/>
													<label class="btn btn-outline-danger" for="recomendar3">2</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar4" autocomplete="off" value="3"/>
													<label class="btn btn-outline-danger" for="recomendar4">3</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar5" autocomplete="off" value="4"/>
													<label class="btn btn-outline-danger" for="recomendar5">4</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar6" autocomplete="off" value="5"/>
													<label class="btn btn-outline-danger" for="recomendar6">5</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar7" autocomplete="off" value="6"/>
													<label class="btn btn-outline-danger" for="recomendar7">6</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Neutro">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar8" autocomplete="off" value="7"/>
													<label class="btn btn-outline-primary" for="recomendar8">7</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Neutro">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar9" autocomplete="off" value="8"/>
													<label class="btn btn-outline-primary" for="recomendar9">8</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Muy probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar10" autocomplete="off" value="9"/>
													<label class="btn btn-outline-success" for="recomendar10">9</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Muy probable">
													<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="recomendar11" autocomplete="off" value="10"/>
													<label class="btn btn-outline-success" for="recomendar11">10</label>
												</a>
											</div>
											<div class="me-2">
												<p class="ms-2 fw-normal fs-6">Muy probable</p>
											</div>
										</div>
                          ):(question.type=="range_difficulty"? (<div class="input-group justify-content-center">
											<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="dificultad1" autocomplete="off" value="Muy difícil"/>
												<label class="btn btn-outline-danger" for="dificultad1">Muy difícil</label>

												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="dificultad2" autocomplete="off" value="Difícil"/>
												<label class="btn btn-outline-danger" for="dificultad2">Difícil</label>

												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="dificultad3" autocomplete="off" value="Ni fácil/ni difícil"/>
												<label class="btn btn-outline-primary" for="dificultad3">Ni fácil/ni difícil</label>

												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="dificultad4" autocomplete="off" value="Fácil"/>
												<label class="btn btn-outline-success" for="dificultad4">Fácil</label>

												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="dificultad5" autocomplete="off" value="Muy fácil"/>
												<label class="btn btn-outline-success" for="dificultad5">Muy fácil</label>
											</div>
										</div>):(question.type=="yes_no"? (<div class="input-group justify-content-center">
											<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="si_no2" autocomplete="off" value="NO"/>
                      <label class="btn btn-outline-danger" for="si_no2">NO</label>

												<input type="radio" class="btn-check" name="answer[<?php echo $row['id'] ?>]" id="si_no1" autocomplete="off" value="SI"/>
												<label class="btn btn-outline-success" for="si_no1">SI</label>

												
											</div>
										</div>):(question.type=="range_emoji"?
                      (<div className="input-group justify-content-center">
                      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio"   class="btn-check" autocomplete="off" value="ok"  id='notBad' name="emojis"/>
									      <label class="btn btn-outline-danger fs-5" for="notBad">😐</label>
                        <input type="radio"   class="btn-check" autocomplete="off" value="ok"  id='bad' name="emojis"/>
									      <label class="btn btn-outline-danger fs-5" for="bad">☹</label>
                        <input type="radio"   class="btn-check" autocomplete="off" value="ok"  id='ok' name="emojis"/>
									      <label class="btn btn-outline-primary  fs-5" for="ok">🙂</label>
                        <input type="radio"   class="btn-check" autocomplete="off" value="good"  id='good' name="emojis"/>
									      <label class="btn btn-outline-success fs-5" for="good">😄</label>
									      <input type="radio"   class="btn-check btn-light" autocomplete="off" value="awesome"  id='awesome' name="emojis"/>
									      <label class="btn btn-outline-success fs-5" for="awesome">😊</label>
                       
                        
                       
							        	</div>
                       </div>):(<div class="form-group">
											<textarea name="answer[<?php echo $row['id'] ?>]" id="" cols="30" rows="4" class="form-control" placeholder="Escriba su respuesta aquí..."></textarea>
										</div>)))))}
                    
                        </div>
                      ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </section>
        </div>
    <div
      className="modal fade"
      id="modalManageQuestion"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      
    >
      <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <form action="" id="manage-user-self">
              <div id="msg"></div>

              <div className="form-group m-2">
                <label htmlFor="firstname" className="form-label">
                  Pregunta
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  placeholder=" "
                    value={question.input}
                    onChange={(e) => question.handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="middlename" className="form-label">
                  Tipo de pregunta
                </label>
                <select name="type" id="type" className='form-control text-center'>
                  <option value="">Si o No </option>
                  <option value="">Emoji</option>
                  <option value="">1-5</option>
                  <option value="">1-10</option>
                  <option value="">Por dificultad</option>
                </select>
                {/* <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="form-control"
                  placeholder=" "
                  value={type.input}
                  onChange={(e) => type.handleChange(e.target.value)}
                /> */}
              </div>

              <div className="form-group m-2">
                <label htmlFor="lastname" className="form-label">
                  Porcentaje
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  placeholder=" "
                  required
                  value={percentage.input}
                  onChange={(e) => percentage.handleChange(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn bg-gradient-guardar mr-2" id="btn-send-survey" type="submit">
                  Guardar
                </button>
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> 


        </div>
        
      )       
    
   
}

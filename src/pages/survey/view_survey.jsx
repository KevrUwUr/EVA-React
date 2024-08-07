import React from 'react'
import HeaderLT1 from '../../components/header/headerLT1'
import axios from "axios"
import { useEffect,useState,useContext } from 'react'
import SidebarLT1 from '../../components/aside/sidebarLT1'
import useInput from '../../components/hooks/useInput'
import { UserContext } from '../../context/UserContext'
import { useParams } from 'react-router-dom'
import { smallAlertDelete,loadingAlert, Toast2,Toast} from '../../assets/js/alertConfig'
import { useTranslation } from "react-i18next";
import { sendData,deleteQuestion,getSurvey,getSurveyQuestions } from '../../services/surveyRequest'

export default function View_survey() {

  const {id}=useParams();
  const [data,setData]=useState([]);
  const [operation, setOperation] = useState([1]);
  const [title, setTitle] = useState();
  const [descriptionText,setDescriptionText]=useState()
  const [surveyData,setSurveyData]=useState([])
  const [loading,setLoading]=useState(false)
  const [idToEdit, setidToEdit] = useState(null);
  const [error,setError]=useState('')
  const [listConditional,setListConditional]=useState(false)
  const [valueConditional,setValueConditional]=useState(null)

  const question = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const description = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const questionType = useInput({ defaultValue: '', validate: /^[A-Za-z_]+$/ });
  const section = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const percentage = useInput({defaultValue: "",validate: /^[^\s@]+@[^\s@]+\.[^\s@]*$/});
  const frm_option = useInput({defaultValue: "", validate:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/});
  const conditional = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/});
  const id_conditional = useInput({ defaultValue: "", validate: /^[0-9]*$/ });
  const survey_id = useInput({defaultValue: "",validate: /^[0-9]*$/});
  const conditional_answer=useInput({defaultValue: "", validatE: /^[A-Za-z ]*$/});


  const { t,i18n } = useTranslation();
  const { accessToken,languageUser} = useContext(UserContext);
  useEffect(() => {
    i18n.changeLanguage(languageUser)
    getSurvey(id,config,setSurveyData);
    updateSurveyQuestions() 
   
   

  }, [id,languageUser]);

  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };


  const updateSurveyQuestions = () => {
    getSurveyQuestions(id, config)
      .then(setData)
      .catch(error => {
        console.error('Error fetching survey questions', error);
      });
  };
  const ButtonAllowConditional=()=> {
    setConditionalButton(true)
  }
  const conditionalHandleChange=(e)=>{
    const conditional= e
    console.log("Estado del condicional: ",conditional)
    setValueConditional(conditional)

   
  }
  useEffect(() => {
    console.log("Estado de salida condicional", valueConditional);
    if(!valueConditional){
      setListConditional(false)

   
    }
    return setListConditional(true)

    
}, [valueConditional]);

  const openModal = (op, idsurvey, questionDetails) => {
    setOperation(op);
    console.log("operation: ",operation)
    if (op === 1) {
      setTitle("Añadir Pregunta");
      setDescriptionText('Elige un tipo de pregunta de acuerdo a tus necesidades.')
      description.handleChange("");
      questionType.handleChange("");
      section.handleChange("");
      percentage.handleChange("");
      frm_option.handleChange("");
      conditional.handleChange("NO");
      id_conditional.handleChange(0);
      conditional_answer.handleChange("NO");
      survey_id.handleChange(idsurvey);

    }   
    else if (op === 2) {
      console.log({ questionDetails})
      setTitle("Editar pregunta");
      setDescriptionText('Modifica la pregunta de acuerdo a tus necesidades.')
      id_conditional.handleChange(questionDetails?.id_conditional||"")
      conditional.handleChange(questionDetails?.conditional|| "")
      description.handleChange(questionDetails?.question|| "");
      questionType.handleChange(questionDetails?.type|| "");
      setidToEdit(questionDetails?.id); 
    }
  };

  const validar = (id, survey_idt) => {
    var parametros;
    var metodo;

    if (questionType.input.trim() === "" || description.input.trim() === "") {
      setError("Ingresa una pregunta valida.");
    } else {
      if (operation == 1) {
        parametros = {
          type: questionType.input,
          percentage: 0,
          conditional:valueConditional? "SI": "NO" ,
          question: description.input,
          survey_id: survey_idt,
          frm_option: frm_option.input,
          id_conditional: id_conditional.input,
          //fmr_option cambiar null en db, section e id_conditional
          conditional_answer: conditional_answer.input,
          section: section.input,
        };
        metodo = "post";
      } else if (operation == 2) {
        console.log("pasa la validacion");
        parametros = {
          type: questionType.input,
          percentage: 0,
          conditional: conditional.input,
          question: description.input,
          survey_id: survey_idt,
          conditional_answer: conditional_answer.input,
          id_conditional: id_conditional.input,
        };
        console.log({ parametros });
        metodo = "put";
      }
      sendData(
        metodo,
        parametros,
        config,
        id,
        setLoading,
        setError,
        updateSurveyQuestions,
        t
      )
        .then(() => {
          // Actualizar preguntas después de la llamada a sendData
          updateSurveyQuestions();
          document.getElementById("btnClose").click();
        })
        .catch((error) => {
          console.error("Error en la actualización de preguntas:", error);
        });
    }
  };

  //agregar input de pregunta tipo radio para una sola opcion y otro input para opcion multiple
  //seleccion unica radio_opt
  //seleccion multiple check_opt
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
                        <h5>{surveyData.title}</h5>
                        <p className="fs-6">{surveyData.description}</p>
                      </div>
                      <div className="col-6 text-end">
                        <p className="fs-6">{surveyData.start_date} / {surveyData.end_date}</p>
                        <p className="fs-6">Cantidad de muestras:   </p>
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
                    <button className="btn fw-bold btn-sm acces-tabla" data-bs-toggle="modal"  data-bs-target="#modalManageQuestion" onClick={() => openModal(1,id)}> + Agregar Nueva pregunta</button>
                  </div>
                </div>
                <form action="" id='manage-sort'>
                  <div className="card-body ui-sorteable">
                      {data.map(question=>(
                        <div key={question.id} className="callout callout info">
                          <div className="row">
                            <div className="col-md-12">
                           
                            </div>
                          </div>
                          <div className="d-flex justify-content-between"> <h5 className='mt-2'>{question.question}</h5><div className="dropdown">
                          <a className="btn  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical">
                            </i>
                          </a>
                            <ul className="dropdown-menu">
                              <li><button className="dropdown-item"  type='button'  data-bs-toggle="modal" data-bs-target="#modalManageQuestion" onClick={() => openModal(2,id,question)}>Editar</button></li>
                              <li><button className="dropdown-item"  type='button' onClick={()=> deleteQuestion(question,config, updateSurveyQuestions,t)}>Eliminar</button></li>
                            </ul>
                          </div> </div>
                         
                          {question.type=='range_onetofive'?(
                            <div className="input-group justify-content-center">
                            <div className="me-2">
                              <p className="ms-2 fw-normal fs-6">Muy insatisfecho</p>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                              <a data-bs-toggle="tooltip" data-bs-title="Muy insatisfecho">
                                <input type="radio" className="btn-check" name="satisfaction" id="satisfaccion1" autoComplete="off" value="1"/>
                                <label className="btn btn-outline-danger" htmlFor="satisfaccion1">1</label>
                              </a>
                              <a data-bs-toggle="tooltip" data-bs-title="Insatisfecho">
                                <input type="radio" className="btn-check" name="probability" id="satisfaccion2" autoComplete="off" value="2"/>
                                <label className="btn btn-outline-danger" htmlFor="satisfaccion2">2</label>
                              </a>
                              <a data-bs-toggle="tooltip" data-bs-title="Ni satisfecho/ni insatisfecho">
                                <input type="radio" className="btn-check" name="probability" id="satisfaccion3" autoComplete="off" value="3"/>
                                <label className="btn btn-outline-primary" htmlFor="satisfaccion3">3</label>
                              </a>
                              <a data-bs-toggle="tooltip" data-bs-title="Satisfecho">
                                <input type="radio" className="btn-check" name="probability" id="satisfaccion4" autoComplete="off" value="4"/>
                                <label className="btn btn-outline-success" htmlFor="satisfaccion4">4</label>
                              </a>
                              <a data-bs-toggle="tooltip" data-bs-title="Muy satisfecho">
                                <input type="radio" className="btn-check" name="probability" id="satisfaccion5" autoComplete="off" value="5"/>
                                <label className="btn btn-outline-success" htmlFor="satisfaccion5">5</label>
                              </a>
                            </div>
                            <div className="ms-2">
                              <p className="ms-2 fw-normal fs-6">Muy satisfecho</p>
                            </div>
                          </div>
                          ):(question.type=="range_zerototen"?(
                            <div className="input-group justify-content-center">
											<div className="me-2">
												<p className="ms-2 fw-normal fs-6">Nada probable</p>
											</div>
											<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar1" autoComplete="off" value="0"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar1">0</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar2" autoComplete="off" value="1"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar2">1</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar3" autoComplete="off" value="2"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar3">2</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar4" autoComplete="off" value="3"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar4">3</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar5" autoComplete="off" value="4"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar5">4</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar6" autoComplete="off" value="5"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar6">5</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Nada probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar7" autoComplete="off" value="6"/>
													<label className="btn btn-outline-danger" htmlFor="recomendar7">6</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Neutro">
													<input type="radio" className="btn-check" name="probability" id="recomendar8" autoComplete="off" value="7"/>
													<label className="btn btn-outline-primary" htmlFor="recomendar8">7</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Neutro">
													<input type="radio" className="btn-check" name="probability" id="recomendar9" autoComplete="off" value="8"/>
													<label className="btn btn-outline-primary" htmlFor="recomendar9">8</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Muy probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar10" autoComplete="off" value="9"/>
													<label className="btn btn-outline-success" htmlFor="recomendar10">9</label>
												</a>

												<a data-bs-toggle="tooltip" data-bs-title="Muy probable">
													<input type="radio" className="btn-check" name="probability" id="recomendar11" autoComplete="off" value="10"/>
													<label className="btn btn-outline-success" htmlFor="recomendar11">10</label>
												</a>
											</div>
											<div className="me-2">
												<p className="ms-2 fw-normal fs-6">Muy probable</p>
											</div>
										</div>
                          ):(question.type=="range_difficulty"? (<div className="input-group justify-content-center">
											<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
												<input type="radio" className="btn-check" name="dificult" id="dificultad1" autoComplete="off" value="Muy difícil"/>
												<label className="btn btn-outline-danger" htmlFor="dificultad1">Muy difícil</label>

												<input type="radio" className="btn-check" name="dificult" id="dificultad2" autoComplete="off" value="Difícil"/>
												<label className="btn btn-outline-danger" htmlFor="dificultad2">Difícil</label>

												<input type="radio" className="btn-check" name="dificult" id="dificultad3" autoComplete="off" value="Ni fácil/ni difícil"/>
												<label className="btn btn-outline-primary" htmlFor="dificultad3">Ni fácil/ni difícil</label>

												<input type="radio" className="btn-check" name="dificult" id="dificultad4" autoComplete="off" value="Fácil"/>
												<label className="btn btn-outline-success" htmlFor="dificultad4">Fácil</label>

												<input type="radio" className="btn-check" name="dificult" id="dificultad5" autoComplete="off" value="Muy fácil"/>
												<label className="btn btn-outline-success" htmlFor="dificultad5">Muy fácil</label>
											</div>
										</div>):(question.type=="yes_no"? (<div className="input-group justify-content-center">
											<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" className="btn-check" name="yes_no" id="si_no1" autoComplete="off" value="NO"/>
                      <label className="btn btn-outline-danger" htmlFor="si_no1">NO</label>

												<input type="radio" className="btn-check" name="yes_no" id="si_no2" autoComplete="off" value="SI"/>
												<label className="btn btn-outline-success" htmlFor="si_no2">SI</label>

												
											</div>
										</div>):(question.type=="range_emoji"?
                      (<div className="input-group justify-content-center">
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio"   className="btn-check" autoComplete="off" value="ok"  id='notBad' name="emojis"/>
									      <label className="btn btn-outline-danger fs-5" htmlFor="notBad">😐</label>
                        <input type="radio"   className="btn-check" autoComplete="off" value="ok"  id='bad' name="emojis"/>
									      <label className="btn btn-outline-danger fs-5" htmlFor="bad">☹</label>
                        <input type="radio"   className="btn-check" autoComplete="off" value="ok"  id='ok' name="emojis"/>
									      <label className="btn btn-outline-primary  fs-5" htmlFor="ok">🙂</label>
                        <input type="radio"   className="btn-check" autoComplete="off" value="good"  id='good' name="emojis"/>
									      <label className="btn btn-outline-success fs-5" htmlFor="good">😄</label>
									      <input type="radio"   className="btn-check btn-light" autoComplete="off" value="awesome"  id='awesome' name="emojis"/>
									      <label className="btn btn-outline-success fs-5" htmlFor="awesome">😊</label>
							        	</div>
                       </div>):(question.type=="radio_opt"? (  <SingleChoiceQuestion
                                key={question.id}
                                question={question}
                                onUpdate={(updatedQuestion) => handleUpdate(question.id, updatedQuestion)}
                       />):(<div className="form-group">
											<textarea name="" id="" cols="30" rows="4" className="form-control" placeholder="Escriba su respuesta aquí..."></textarea>
										</div>))))))}
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
      className="modal fade" id="modalManageQuestion" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
              <div id="msg"></div>
                <h5 className='text-start m-2 '>{title}</h5>
                <small>
                <p className='text-start mb-4 ms-2 text-secondary'>{descriptionText}</p>
                </small>
              <div className="form-group m-2 ">
           
                <label htmlFor="middlename" id="labelAnimation">
                <select   className="input-new text-center" placeholder=" "   name='questionType' onChange={(e)=> questionType.handleChange(e.target.value)} value={questionType.input} >
                  <option value="" disabled>Seleccione una pregunta</option>
                  <option value="yes_no">Si/No</option>
                  <option value="range_emoji">Rango de emojis</option>
                  <option value="range_onetofive">Rango de 1/5</option>
                  <option value="range_zerototen">Rango de 0/10</option>
                  <option value="range_difficulty">Rango de dificultad</option>
                  <option value="textfield_s">Campo de texto</option>
                  <option value="radio_opt">Seleccion unica</option>
                  <option value="check_opt">Seleccion multiple</option>
                </select>
                <span className="labelName">Tipo de pregunta:</span>
                </label>
              </div>
              {questionType.input && (
                <>
                {data.length>=1?( <div className="form-check form-switch  m-2">
                   <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e)=> conditionalHandleChange(e.target.checked)
                    }/>
                   <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Condicional</label>
                    </div>):(" ") }
                    {listConditional && valueConditional? (
                      <div className="form-group m-2 mt-4">
                        <label id='labelAnimation'>
                        
                      <select className='input-new text-center'   placeholder=" " name='questionConditional' onChange={(e)=> id_conditional.handleChange(e.target.value)} value={id_conditional.input} >
                        <option value="0" disabled>Selecciona una pregunta</option>
                        {data.map((question) => (
                          <option key={question.id} value={question.id}>
                            {question.question}
                          </option>
                        ))}
                      </select>
                     <span className="labelName">Pregunta condicional:</span>
                        
                      </label>
                    </div>
                    ):("")}
              <div className="form-group m-2 mt-4" >
                <label id="labelAnimation" htmlFor="question" >
                  <input
                    type="text"
                    name="question"
                    id="question"
                    className="input-new"
                    placeholder=" "
                      value={description.input}
                      onChange={(e) => description.handleChange(e.target.value)}
                    required
                  />
                      <span className="labelName">Pregunta:</span>
                      </label>
              </div>
              </>
              )}
               {error && <p className='text-danger text-center'>{error}</p>}
              <div className="modal-footer">
              {questionType.input && (
                <button className="btn bg-gradient-guardar mr-2" id="btn-send-survey"  onClick={() => validar(idToEdit,id)}>
                  Guardar
                </button>
                )}
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" id='btnClose' onClick={()=> setValueConditional(false)}>
                  Cancelar
                </button>
              </div>
          </div>
        </div>
      </div>
    </div> 
        </div>
      )       
}

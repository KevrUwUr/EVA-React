import React from 'react'
import HeaderLT1 from '../../../components/header/headerLT1'

import { useEffect,useState } from 'react'
import SidebarLT1 from '../../../components/aside/sidebarLT1'
export default function View_survey() {
  const [data,setData]=useState([])
    useEffect(() => {
      const questions = [ {
        "id": "1",
        "question": "¿Qué tan probable es que recomiendes a A a un amigo o familiar?",
        "type": "range_zerototen",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "2"
      },
      {
        "id": "2",
        "question": "¿Qué podríamos hacer para que nos recomendaras?\r\n",
        "type": "textfield_s",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "SI",
        "id_conditional": "1",
        "conditional_answer": "0 a 6",
        "survey_id": "2"
      },
      {
        "id": "3",
        "question": "¿Cuáles son las razones de tu calificación?",
        "type": "textfield_s",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "SI",
        "id_conditional": "1",
        "conditional_answer": "9 o 10",
        "survey_id": "2"
      },
      {
        "id": "4",
        "question": "¿Qué tan satisfecho te encuentras con la experiencia de viaje con A? ",
        "type": "range_onetofive",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "2"
      },
      {
        "id": "5",
        "question": "¿Qué tan fácil fue viajar con A? ",
        "type": "range_difficulty",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "2"
      },
      {
        "id": "6",
        "question": "¿Seleccionarías a A para tu próximo viaje?",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "2"
      },
      {
        "id": "8",
        "question": "Bienvenida: Saluda con un tono cálido utilizando frases de cortesía y respeto que disponen al cliente para iniciar la interacion\r\n",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"XJyuF\":\"Cumple\",\"uJtQV\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "9",
        "question": "Proposito: Informa el motivo de la llamada en un lenguaje claro, preciso y entendible para el cliente\r\n",
        "type": "yes_no",
        "section": "",
        "percentage": "10",
        "frm_option": "{\"AVWJq\":\"Cumple\",\"YtNeO\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "10",
        "question": "Interacción: Su voz es clara, enérgica y va acompañada de una sonrisa para generar confianza con el cliente",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"domyE\":\"Cumple\",\"IzEYu\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "11",
        "question": "Empatia: Identifica la emoción del cliente, su estilo de comunicación y se adapta a él siendo natural y utiliza conectores apropiados",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"gXLfY\":\"Cumple\",\"BsMKU\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "12",
        "question": "Asertividad: Comunica de manera asertiva la información relacionada con el servicio, proceso",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"TOBvm\":\"Cumple\",\"DlOTE\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "13",
        "question": "Condiciones del producto y servicio: Brinda información clara y precisa sobre las condiciones del producto",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"vDBoY\":\"Cumple\",\"TqHVX\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "14",
        "question": "Medios de pago: Valida el canal de pago de preferencia del usuario, promoviendo y educandolo sobre los diferentes medios, en especial el canal de pago virtual",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"DFJkR\":\"Cumple\",\"EyKIb\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "15",
        "question": "Información General: Brinda la información, acompañamiento y/o direccionamiento adecuado con relación a la solicitud o situación del cliente",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"rDwzV\":\"Cumple\",\"jDHRL\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "16",
        "question": "Politicas de seguridad: Cumple con las politicas de seguridad establecidas para la gestión y relacionamiento con el cliente",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"BHtmF\":\"Cumple\",\"hRwym\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "17",
        "question": "Tipificación de gestión: Realiza la tipificación de manera correcta según el escenario y resultado de la interacción",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"ZbuTz\":\"Cumple\",\"YXWsL\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
      {
        "id": "18",
        "question": "Documentación: Documenta de forma clara y precisa en los aplicativos la gestión realizada",
        "type": "yes_no",
        "section": "",
        "percentage": "0",
        "frm_option": "{\"Gqwek\":\"Cumple\",\"qzcJH\":\"No cumple\"}",
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      },
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
        "question": "¿Su consulta o solicitud fue resuelta?   ",
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
        "question": "¿Qué tan fácil fue gestionar tu consulta o solicitud? ",
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
        "question": "Cuéntanos más sobre tu experiencia: ",
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
        "id": "25",
        "question": "P1",
        "type": "yes_no",
        "section": "Información personal",
        "percentage": "50",
        "frm_option": null,
        "conditional": "NO",
        "id_conditional": "0",
        "conditional_answer": "NO",
        "survey_id": "1"
      }
    ]
      setData(questions)
    ,[]}
  )
  

  return (
    <div className="App">
      <div id="body">
        <HeaderLT1/>
        <section>
        <SidebarLT1/>
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-12">
              <div className="card p-4 borderEVA bg-light">
                <div className="text-center">
                  <h3 className="card title">Información Encuesta</h3>
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
                    <button className="btn btn-primary btn-sm  btn-flat" data-bs-toggle="modal"  data-bs-target="#modalManageQuestion">Agregar Nueva pregunta</button>
                  </div>
                </div>
                <form action="" id='manage-sort'>
                  <div className="card-body ui-sorteable">
                    {/* //! Aqui va el .map  */}

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </section>
        </div>
        </div>
        
      )       
    
   
}

import { useState, useEffect,useContext } from "react";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import HeaderLT1 from "../../components/header/headerLT1";
import useInput from "../../components/hooks/useInput";
import TableSurvey from "../../components/Tables/tableSurvey";
import { UserContext } from "../../context/UserContext";
import axios from 'axios'

const SurveyList = () => {
  // //todo Poner Tokens const {accessToken, RefreshToken} = useAuth(AuthContext)
  const url = "http://localhost/API-EVA/surveyController/surveys";

  const [operation, setOperation] = useState([1]);
  const [idToEdit, setidToEdit] = useState(null);
  const [survey, setSurvey] = useState([]);

  const title = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const start_date = useInput({defaultValue: "",validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,});
  const end_date = useInput({defaultValue: "", validate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,});
  const description = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const link = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const type = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const idClient = useInput({ defaultValue: "", validate: /^[1-4]+$/ });


  useEffect(() => {
    // Se establecen los survey una vez que el componente se monta
    getSurveys()
  }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez

  const { accessToken } = useContext(UserContext);
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };

  const getSurveys= async () =>{
    console.log(accessToken)
    try{
        const response = await axios.get(url,config)
        console.log(response.data)
        setSurvey(response.data)
    }catch (error){
      console.error(error)
    }
  }






  

 

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

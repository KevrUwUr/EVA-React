import React from 'react';
import axios from 'axios';
import HeaderLT1 from '../../components/header/headerLT1';
import SidebarLT1 from '../../components/aside/sidebarLT1';
import TableDetalle from '../../components/Tables/table';
import useInput from "../../components/hooks/useInput";
import { useState,useEffect } from 'react';
export default function Client_list() {
    

    const [accessToken, setAccessToken] = useState("");
    const [operation, setOperation] = useState([1]);
    // const [title, setTitle] = useState();
    const [idToEdit, setidToEdit] = useState(null);
  
    const [data, setData] = useState([]);
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
    const url = "http://localhost/API-EVA/clientController/Clients";
    useEffect(() => {
      
        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost/API-EVA/clientController/Clients`);
              console.log(response.data)
              setData(response.data)
            } catch (error) {
              console.error('Error fetching data:', error);
              
            }
          };
          fetchData();
      }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez
    return (
        <div className="App">
          <div id="body">
            <HeaderLT1 />
            <section
              style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
            >
              <SidebarLT1 />
              <div className="container mt-0">
                {data.length > 0 && (
                  <TableDetalle
                    header={[...Object.keys(data[0])]}
                    data={data}
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
}

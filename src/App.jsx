import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
/* catch data */
import { UserProvider } from "./context/UserContext";
/* -------------------------------------------- */

/* Layout imports */
import LogIn from "./pages/layout/login";
import Inactive from "./pages/layout/inactive";
/* -------------------------------------------- */

/* SuperAdmin Imports */
import Index from "./components/Admin/index"
import Quality from "./components/Admin/quality"
import Satisfaction from "./components/Admin/satisfaction"
import Client_list from "./pages/admin/client_list";
import AdminList from "./pages/admin/admin_list";
/* ---------------------------------------------------------*/

/* Admin Imports */



/* ---------------------------------------------------------*/

/* Editor Imports */
import IndexEditor from "./pages/editor/indexEditor";
/* ---------------------------------------------------------*/

/* Viwer Imports */
import IndexQuality from "./pages/quality/indexQuality";


/* ---------------------------------------------------------*/

/* Survey */
import Public_survey from "./pages/admin/survey/public_survey";
import SurveyList from "./pages/admin/survey_list";
import View_survey from "./pages/admin/survey/view_survey";
/* ---------------------------------------------------------*/







function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        
        
        <Route path="/client_list" element={<Client_list />} />
        {/* Pruebas de barras */}
       

        {/*error views*/}
        <Route path="/auth/inactive" element={<Inactive />} />


        {/*superAdmin sites*/}
        <Route path="/admin_list" element={<AdminList />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/satisfaction" element={<Satisfaction />} />
        <Route path="/admin" element={<Index/>} />
        {/*admin sites*/}

      
        {/*editor sites*/}
        <Route path="/editor" element={<IndexEditor/>} />


        {/*quality sites*/}
        <Route path="/index=Quality" element={<IndexQuality/>} />


        {/* Pruebas de encuestas */}
        <Route path="/public_survey" element={<Public_survey />} />
        <Route path="/survey_list" element={<SurveyList />} />
        <Route path="/public_survey" element={<Public_survey />} />
        <Route path="/view_survey" element={<View_survey/>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;

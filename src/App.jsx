import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/layout/login";
import Index from "./components/Admin/index"
import Quality from "./components/Admin/quality"
import Satisfaction from "./components/Admin/satisfaction"
import AdminList from ".//pages/admin/admin_list"
import SidebarLT1 from "./components/aside/sidebarLT1";
import SidebarLT2 from "./components/aside/sidebarLT2";
import HeaderLT1 from "./components/header/headerLT1";
import HeaderLT2 from "./components/header/headerLT2";
import SurveyList from "./pages/admin/survey_list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/index" element={<Index/>} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/satisfaction" element={<Satisfaction />} />
        <Route path="/admin_list" element={<AdminList />} />
        <Route path="/survey_list" element={<SurveyList />} />
        
        {/* Pruebas de barras */}
        <Route path="/pruebaAside" element={<SidebarLT1 />} />
        <Route path="/pruebaAside2" element={<SidebarLT2 />} />
        <Route path="/pruebaHeader" element={<HeaderLT1 />} />
        <Route path="/pruebaHeader2" element={<HeaderLT2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

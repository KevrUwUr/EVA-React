import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./Componentes/login";
import SidebarLT1 from "./Componentes/aside/sidebarLT1";
import SidebarLT2 from "./Componentes/aside/sidebarLT2";
import HeaderLT1 from "./Componentes/header/headerLT1";
import HeaderLT2 from "./Componentes/header/headerLT2";
import Index from "./Componentes/Admin/index";
import Quality from "./Componentes/Admin/quality";
import Satisfaction from "./Componentes/Admin/satisfaction";
import AdminList from "./Componentes/Admin/admin_list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/index" element={<Index />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/satisfaction" element={<Satisfaction />} />
        <Route path="/admin_list" element={<AdminList />} />
        
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

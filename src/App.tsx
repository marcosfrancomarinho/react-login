import React from "react";
import Registrar from "./components/Registrar";
import Entrar from "./components/Entrar";
import Header from "./components/Header";
import Incial from "./components/Inicial";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/" element={<Incial />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
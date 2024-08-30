import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthLayout from "./layout/authLayout";

//Rutas Protegidas
import RutaProtegida from "./layout/RutaProtegida.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import CrudApprentices from "./apprentice/crudApprentices.jsx";
import ImportarCSV from "./apprentice/importarCSV";
import CrudTurnosEspeciales from "./turnosEspeciales/CrudTurnosEspeciales.jsx";
import CrudTurnosRutinarios from "./turnosRutinarios/CrudTurnosRutinarios.jsx";
import CrudMemorandum from "./memorandum/crudMemorandum.jsx";
import CrudUnidades from "./unit/CrudUnidad.jsx";
import CrudFichas from "./fichas/CrudFichas.jsx";
import CrudFuncionarios from "./funcionarios/CrudFuncionarios.jsx";
import CrudPrograma from "./programasFormacion/CrudProgramaFormacion.jsx";
import CrudTalentoHumano from "./talentoHumano/CrudTalentoHumano.jsx";

//Rutas Publicas
import RutaPublica from "./layout/RutaPublica.jsx";
import Home from "./home/home.jsx"
import Contacto from "./home/Contacto.jsx"
import ConsultarTurno from "./home/ConsultarTurno.jsx"
<<<<<<< HEAD
import Manual from "./home/Manual.jsx";
=======
import Manual2 from "./home/Manual2.jsx";
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
import LoginForm from "./users/LoginUser";
import UserForm from "./users/CreateAccount";
import OlvidePassword from "./users/OlvidePassword";
import ConfirmarCuenta from "./users/ConfirmarCuenta";
import CambiarPassword from "./users/CambiarPassword";

import { AuthProvider } from "./context/authProvider";

import VerPdf from "./memorandum/verPDF";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RutaPublica />}>
              <Route index element={<Home />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="consultarturno" element={<ConsultarTurno />} />
<<<<<<< HEAD
              <Route path="manual" element={<Manual />} />
=======
              <Route path="manual" element={<Manual2 />} />
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
              <Route path="login" element={<LoginForm />} />
              <Route path="registrar" element={<UserForm />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<CambiarPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<Dashboard />} />
              <Route path="aprendices/" element={<CrudApprentices />}>
                <Route path="importCSV" element={<ImportarCSV />} />
              </Route>
              <Route
                path="turnos-especiales"
                element={<CrudTurnosEspeciales />}
              />
              <Route
                path="turnos-rutinarios"
                element={<CrudTurnosRutinarios />}
              />
              <Route path="memorandos" element={<CrudMemorandum />} />
              <Route path="unidades" element={<CrudUnidades />} />
              <Route path="fichas" element={<CrudFichas />} />
              <Route path="funcionarios" element={<CrudFuncionarios />} />
              <Route path="programa-formacion" element={<CrudPrograma />} />
              <Route path="talentohumano" element={<CrudTalentoHumano />} />

              {/* <Route path='/perfil' element={<MemorandumPDF/>}/> */}
              <Route path="PdfView" element={<VerPdf />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
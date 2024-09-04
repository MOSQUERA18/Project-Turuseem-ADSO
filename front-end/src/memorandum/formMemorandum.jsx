/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from "react-client-session";

const FormMemorandum = ({ buttonForm, memorandum, updateTextButton }) => {
  // const [Id_Memorando, setId_Memorando] = useState("");
  const [Fec_Memorando, setFec_Memorando] = useState("");
  const [Mot_Memorando, setMot_Memorando] = useState("");
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [selectedAprenices, setSelectedAprendices] = useState(null);
  const [aprendices, setAprendices] = useState([]);


  useEffect(() => {
    const fetcAprendiz = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get('/aprendiz', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(response.status ==200){
          setAprendices(response.data);
        }
      } catch (error) {
        console.error('Error fetching apprentices:', error);
      }
    };

    fetcAprendiz();
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (buttonForm === "Actualizar") {
        const respuestApi = await clienteAxios.put(
          `/otrosmemorandos/${memorandum.Id_OtroMemorando}`,
          {
            // Id_Memorando: Id_Memorando,
            Fec_OtroMemorando: Fec_Memorando,
            Mot_OtroMemorando: Mot_Memorando,
            Id_Aprendiz: Id_Aprendiz,
          },
          config
        );
        if (respuestApi.status == 200) {
          updateTextButton("Enviar");
          alert(respuestApi.data.message);
          clearForm();
        }
      } else if (buttonForm === "Enviar") {
        const respuestApi = await clienteAxios.post(
          "/otrosmemorandos",
          {
            // Id_Memorando: Id_Memorando,
            Fec_OtroMemorando: Fec_Memorando,
            Mot_OtroMemorando: Mot_Memorando,
            Id_Aprendiz: Id_Aprendiz,
          },
          config
        );
        if (respuestApi.status == 201) {
          alert(respuestApi.data.message);
          clearForm();
        } else {
          alert(respuestApi.data.message);
        }
      }
      clearForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const clearForm = () => {
    // setId_Memorando("");
    setFec_Memorando("");
    setMot_Memorando("");
    setId_Aprendiz("");
  };

  const setData = () => {
    // setId_Memorando(memorandum.Id_Memorando);
    setFec_Memorando(memorandum.Fec_OtroMemorando);
    setMot_Memorando(memorandum.Mot_OtroMemorando);
    setId_Aprendiz(memorandum.Id_Aprendiz);
    const selected = aprendices.find(aprendiz => aprendiz.Id_Aprendiz === memorandum.Id_Aprendiz);
    setSelectedAprendices(selected || null);
  };

  useEffect(() => {
    setData();
  }, [memorandum]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="memorandumForm"
          action=""
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registrar Memorandos
          </h1>
          <div className="mb-3">
            <label
              htmlFor="dateMemorandum"
              className="text-gray-700 uppercase font-bold"
            >
              Fecha Memorando
            </label>
            <input
              type="date"
              id="dateMemorandum"
              value={Fec_Memorando}
              onChange={(e) => setFec_Memorando(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="motivoMemorando"
              className="text-gray-700 uppercase font-bold"
            >
              Motivo Memorando
            </label>
            <input
              type="textarea"
              id="motivoMemorando"
              placeholder="Motivo del Memorando"
              value={Mot_Memorando}
              onChange={(e) => setMot_Memorando(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
              Área Perteneciente: 
            </label>
            <select
              id="id_area"
              value={Id_Aprendiz}
              onChange={(e) => setId_Aprendiz(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione el Documento de Aprendiz:</option>
              {aprendices.map((aprendiz) => (
                <option key={aprendiz.Id_Aprendiz} value={aprendiz.Id_Aprendiz}>
                  {aprendiz.Id_Aprendiz}
                </option>
              ))}
            </select>
          </div>

          <input
            type="submit"
            id="button"
            value={buttonForm}
            className="bg-green-600 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-700 md:w-auto"
            aria-label="Enviar"
          />
        </form>
        <button>
          <i className="fa/FaHospitalUser"></i>
        </button>
      </div>
    </>
  );
};

export default FormMemorandum;

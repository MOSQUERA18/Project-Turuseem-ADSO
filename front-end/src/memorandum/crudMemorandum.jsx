import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';
import FormMemorandum from "./formMemorandum.jsx";
import { useNavigate } from "react-router-dom";
import DataTableMemorandum from "./dataTableMemorandum.jsx";

// Icons
import { AiOutlineMinusCircle } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";
import Alerta from "../components/Alerta.jsx";

const CrudMemorandum = () => {
  const [memorandumList, setMemorandumList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddMemorandum, setStateAddMemorandum] = useState(false);
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate();

  const [memorandum, setMemorandum] = useState({
    Id_OtroMemorando: "",
    Fec_OtroMemorando: "",
    Mot_OtroMemorando: "",
    Id_Aprendiz: "",
  });

  useEffect(() => {
    getAllMemorandum();
  }, []);

  const getAllMemorandum = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios("/otrosmemorandos/", config);
      if (respuestApi.status == 200) {
        setMemorandumList(respuestApi.data);
      } else {
        console.log("Error: " + respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMemorandum = async (Id_OtroMemorando) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`/otrosmemorandos/${Id_OtroMemorando}`, config);
      if (respuestApi.status === 200) {
        setMemorandum({
          ...respuestApi.data,
        });
      } else {
        console.log("Error" + respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const deleteMemorandum = (Id_OtroMemorando) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = ReactSession.get("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clienteAxios.delete(
            `/otrosmemorandos/${Id_OtroMemorando}`,
            config
          );
          if (respuestApi.status == 200) {
            updateTextButton("Enviar");
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  const mostrarPdf = () => {
    navigate("/admin/PdfView");
  };
  const { msg } = alerta;


  return (
    <>
    <h1 className="text-center font-extrabold text-3xl uppercase">Gestionar informacion de los <span className="text-green-500">Memorandos</span></h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddMemorandum(!stateAddMemorandum);
          }}
        >
          {stateAddMemorandum ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <TiDocumentAdd size={16} className="me-2" />
          )}
          {stateAddMemorandum ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <hr/>
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
        <hr/>
        <DataTableMemorandum
        memorandumList={memorandumList}
        getMemorandum={getMemorandum}
        deleteMemorandum={deleteMemorandum}
        setStateAddMemorandum={setStateAddMemorandum}
        mostrarPdf={mostrarPdf}/>
      </div>
      <hr />
      {stateAddMemorandum ? (
        <FormMemorandum
          buttonForm={buttonForm}
          memorandum={memorandum}
          updateTextButton={updateTextButton}
        />
      ) : null}
      <hr />
    </>
  );
};
export default CrudMemorandum;

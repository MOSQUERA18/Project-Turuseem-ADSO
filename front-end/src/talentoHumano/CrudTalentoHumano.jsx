import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';

// import { CSVLink } from 'react-csv';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import Alerta from "../components/Alerta.jsx";

import FormTalentoHumano from "./formTalentoHumano.jsx";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import DataTableTalentoHumano from "./dataTableTalentoHumano.jsx";

const URI = "talentoHumano";

const CrudTalentoHumano = () => {
  const [talentoHumanoList, setTalentoHumanoList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddTalentoHumano, setStateAddTalentoHumano] = useState(false);
  
  const [alerta, setAlerta] = useState({});

  const [talentoHumano, setTalentoHumano] = useState({
    Id_Talento_Humano: "",
    Nom_Talento_Humano: "",
    Ape_Talento_Humano: "",
    Gen_Talento_Humano: "",
    Cor_Talento_Humano: "",
    Tel_Talento_Humano: "",
    Id_Ficha: "",
    Est_Talento_Humano: "",
  });



  const getAllTalentoHumano = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(URI, config);
      if (respuestApi.status === 200) {
        setTalentoHumanoList(respuestApi.data);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los registros!`,
        error: true,
      });
      console.error(error);
    }
  };

  const getTalentoHumano = async (Id_Talento_Humano) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Talento_Humano}`, config);
      if (respuestApi.status === 200) {
        setTalentoHumano({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los registros!`,
        error: true,
      });
      console.error(error);
    }
  };

  const deleteTalentoHumano = (Id_Talento_Humano) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar!",
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
            `/${URI}/${Id_Talento_Humano}`,
            config
          );
          if (respuestApi.status === 200) {
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
            getAllTalentoHumano();
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al intentar borrar el registro.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const { msg } = alerta;
    // Prepara los datos para Excel
    const prepareDataForExcel = (talentoHumano,talentoHumanoList) => {
      return (talentoHumano.length ? talentoHumano : talentoHumanoList).map(talentoHumano => ({
        Documento: talentoHumano.Id_Talento_Humano,
        Nombre: talentoHumano.Nom_Talento_Humano,
        Apellido: talentoHumano.Ape_Talento_Humano,
        Genero: talentoHumano.Genero_Talento_Humano,
        Correo: talentoHumano.Cor_Talento_Humano,
        Teléfono: talentoHumano.Tel_Talento_Humano,
        Ficha: talentoHumano.fichas ? talentoHumano.fichas.Id_Ficha : "N/A",
        Estado: talentoHumano.Estado,
      }));
    };
  
    // Función para manejar la exportación a Excel
    const handleExportToExcel = (talentoHumano,talentoHumanoList) => {
      const data = prepareDataForExcel(talentoHumano,talentoHumanoList);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Talento Humano');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Talento_Humano.xlsx');
    };
  

    const handleExport = () => {
      handleExportToExcel(talentoHumano, talentoHumanoList);
    };

    useEffect(() => {
      getAllTalentoHumano();
    }, []);
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">
        Gestionar Información de Talento Humano
      </h1>

      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddTalentoHumano(!stateAddTalentoHumano);
          }}
        >
          {stateAddTalentoHumano ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddTalentoHumano ? "Ocultar" : "Agregar"}
        </button>

      <button
        onClick={handleExport}
        className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
      >
        Exportar a Excel
      </button>
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <hr />
        <DataTableTalentoHumano
        talentoHumanoList={talentoHumanoList}
        getTalentoHumano={getTalentoHumano}
        deleteTalentoHumano={deleteTalentoHumano}
        setStateAddTalentoHumano={setStateAddTalentoHumano}
      />
      </div>

      {
        stateAddTalentoHumano ? (
          <FormTalentoHumano
            buttonForm={buttonForm}
            talentoHumano={talentoHumano}
            updateTextButton={updateTextButton}
            setTalentoHumano={setTalentoHumano}
            getAllTalentoHumano={getAllTalentoHumano}
          />
        ) : null
      }

      <hr />

      <Outlet />
    </>
  );
};

export default CrudTalentoHumano;
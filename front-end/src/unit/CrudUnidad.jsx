import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import "datatables.net-responsive-dt";

import FormUnidades from "./formUnidades.jsx";
import Alerta from "../components/Alerta.jsx";
// import DataTableUnit from "./dataTableUnit.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const URI = "unidades";

import { exportToExcel } from "./ExportExcel.js";

const CrudUnidades = () => {
  const [unidadList, setUnidadList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUnidad, setStateAddUnidad] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [unidad, setUnidad] = useState({
    Nom_Unidad: "",
    Hor_Apertura: "",
    Hor_Cierre: "",
    Estado: "",
    Id_Area: "",
  });
  const titles = [
    "ID",
    "Nombre",
    "Hora Apertura",
    "Hora Cierre",
    "Estado",
    "Area",
    "Acciones",
  ];
  const formattedData = unidadList.map((unidad) => [
    unidad.Id_Unidad, // ID
    unidad.Nom_Unidad, // Nombre
    unidad.Hor_Apertura, // Hora Apertura
    unidad.Hor_Cierre, // Hora Cierre
    unidad.Estado, // Estado
    unidad.areas?.Nom_Area || "N/A", // Area (usando "N/A" si areas o Nom_Area es undefined)
  ]);

  useEffect(() => {
    getAllUnidades();
  }, []);




  const getAllUnidades = async () => {
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
        setUnidadList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        // setAlerta({
        //   msg: `Error al cargar los registros!`,
        //   error: true,
        // });
      }
    } catch (error) {
      // setAlerta({
      //   msg: `Error al cargar los registros!`,
      //   error: true,
      // });
      console.error(error);
    }
  };

  const getUnidad = async (Id_Unidad) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Unidad}`, config);
      if (respuestApi.status === 200) {
        setUnidad({
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

  const deleteUnidad = (Id_Unidad) => {
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
            `/${URI}/${Id_Unidad}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllUnidades(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
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

  const handleExportToExcel = () => {
    exportToExcel([], unidadList); // Pasar [] si `unidad` está vacío
  };

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las Unidades
      </h1>
      <div className="flex justify-end pb-3">
        <ModalWindow
          stateAddNewRow={stateAddUnidad}
          setStateAddNewRow={setStateAddUnidad}
          form={
            <FormUnidades
              buttonForm={buttonForm}
              unidad={unidad}
              updateTextButton={updateTextButton}
              setUnidad={setUnidad}
              getAllUnidades={getAllUnidades}
            />
          }
        />

        <button
          onClick={handleExportToExcel}
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
        >
          Exportar a Excel
        </button>

      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        <hr />
        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            deleteRow={deleteUnidad}
            getRow={getUnidad}
            setStateAddNewRow={setStateAddUnidad}
          />
        )}
      </div>
    </>
  );
};

export default CrudUnidades;

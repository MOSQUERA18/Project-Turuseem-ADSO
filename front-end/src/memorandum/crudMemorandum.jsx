import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import FormMemorandum from "./formMemorandum.jsx";

// Icons
import Alerta from "../components/Alerta.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

const CrudMemorandum = () => {
  const [memorandumList, setMemorandumList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddMemorandum, setStateAddMemorandum] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // const navigate = useNavigate();

  const [memorandum, setMemorandum] = useState({
    Id_OtroMemorando: "",
    Fec_OtroMemorando: "",
    Mot_OtroMemorando: "",
    Id_Aprendiz: "",
  });
  const titleModul = [
    "REPORTE DE MEMORANDOS"
  ]

  const titles = [
    "Documento",
    "Nombre",
    "Apellido",
    "Fecha Memorando",
    "Motivo Memorando",
    "Acciones",
  ];
  const formattedData = memorandumList.map((memorandum) => [
    memorandum.Id_Aprendiz,
    memorandum.aprendiz?.Nom_Aprendiz,
    memorandum.aprendiz?.Ape_Aprendiz,
    memorandum.Fec_OtroMemorando,
    memorandum.Mot_OtroMemorando,
  ]);

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
        setCrearDataTable(true);
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
      const respuestApi = await clienteAxios(
        `/otrosmemorandos/${Id_OtroMemorando}`,
        config
      );
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
  // const mostrarPdf = () => {
  //   navigate("/admin/PdfView");
  // };
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar informacion de los{" "}
        <span className="text-blue-700">Memorandos</span>
      </h1>
      <div className="flex justify-end pb-3">
        <ModalWindow
          stateAddNewRow={stateAddMemorandum}
          setStateAddNewRow={setStateAddMemorandum}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          // resetForm={resetForm}
          updateTextBottom={updateTextButton}
          form={
            <FormMemorandum
              buttonForm={buttonForm}
              memorandum={memorandum}
              updateTextButton={updateTextButton}
              setMemorandum={setMemorandum}
              getAllMemorandum={getAllMemorandum}
            />
          }
        />
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        <hr />
        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            deleteRow={deleteMemorandum}
            getRow={getMemorandum}
            stateAddNewRow={setStateAddMemorandum}
            toggleModal={toggleModal} // Aquí pasamos la función
            titleModul={titleModul}
          />
        )}
      </div>
    </>
  );
};
export default CrudMemorandum;

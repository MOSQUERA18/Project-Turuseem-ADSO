/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef,useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';
import Alerta from "../components/Alerta";

const URI = "/ciudades/"
const UriFichas = "/fichas/"


const FormApprentices = ({ buttonForm, apprentice, updateTextButton,}) => {
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [Nom_Aprendiz, setNom_Aprendiz] = useState("");
  const [Ape_Aprendiz, setApe_Aprendiz] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Fec_Nacimiento, setFec_Nacimiento] = useState("");
  const [Id_Ciudad, setId_Ciudad] = useState("");
  const [Lugar_Residencia, setLugarResidencia] = useState("");
  const [Edad, setEdad] = useState("");
  const [Hijos, setHijos] = useState("");
  const [Nom_Eps, setNom_Eps] = useState("");
  const [Tel_Padre, setTel_Padre] = useState("");
  const [Gen_Aprendiz, setGen_Aprendiz] = useState("");
  const [Cor_Aprendiz, setCor_Aprendiz] = useState("");
  const [Tel_Aprendiz, setTel_Aprendiz] = useState("");
  const [Tot_Memorandos, setTot_Memorandos] = useState("");
  const [Tot_Inasistencias, setTot_Inasistencias] = useState("");
  const [Patrocinio, setPatrocinio] = useState("");
  const [Estado, setEstado] = useState("");
  const [Nom_Empresa, setNom_Empresa] = useState("");
  const [Foto_Aprendiz, setFoto_Aprendiz] = useState(null);
  const [CentroConvivencia, setCentroConvivencia] = useState("");

  const [SelectedFicha,setSelectedFicha] = useState(null);
  const [fichas, setFichas] = useState([]); 

  const [selectedCiudades,setSelectedCiudades] = useState(null);
  const [ciudades, setCiudades] = useState([]); 
  const inputFoto = useRef(null)

  const [alerta, setAlerta] = useState({});



  const token = ReactSession.get("token");
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  
  const getAllAprentices = async () => {
    try {
      const response = await clienteAxios.get('/aprendiz/', config);
      setId_Aprendiz(response.data);
    } catch (error) {
      console.error('Error al obtener los aprendices:', error);
    }
  };
  



  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await clienteAxios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          // console.log('ciudades:', response.data); // Imprime los datos para verificar
          setCiudades(response.data);
        }
      } catch (error) {
        console.error('Error al cargar las Ciudades:', error);
      }
    };


    const fetchFichas = async () => {
      try{
        const response = await clienteAxios.get(UriFichas,{
          headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        if(response.status === 200){
          setFichas(response.data)
        }
      
      }catch(err){
        console.log('error al cargar las Fichas',err)
      }
    }
    fetchFichas();
    fetchCiudades();
  }, [token]);





  const sendForm = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();
  
      // Añadir campos al FormData
      formData.append('Id_Aprendiz', Id_Aprendiz);
      formData.append('Nom_Aprendiz', Nom_Aprendiz);
      formData.append('Ape_Aprendiz', Ape_Aprendiz);
      formData.append('Id_Ficha', Id_Ficha);
      formData.append('Fec_Nacimiento', Fec_Nacimiento);
      formData.append('Id_Ciudad', Id_Ciudad);
      formData.append('Lugar_Residencia', Lugar_Residencia);
      formData.append('Edad', Edad);
      formData.append('Hijos', Hijos);
      formData.append('Nom_Eps', Nom_Eps);
      formData.append('Tel_Padre', Tel_Padre);
      formData.append('Gen_Aprendiz', Gen_Aprendiz);
      formData.append('Cor_Aprendiz', Cor_Aprendiz);
      formData.append('Tel_Aprendiz', Tel_Aprendiz);
      formData.append('Tot_Memorandos', Tot_Memorandos);
      formData.append('Tot_Inasistencias', Tot_Inasistencias);
      formData.append('Patrocinio', Patrocinio);
      formData.append('Estado', Estado);
      formData.append('Nom_Empresa', Nom_Empresa);
      formData.append('CentroConvivencia', CentroConvivencia);
      formData.append('Foto_Aprendiz', Foto_Aprendiz);

    
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/aprendiz/${Id_Aprendiz}`,
          formData,
          config
        );
        getAllAprentices();
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/aprendiz`,
          formData,
          config,
        );
        getAllAprentices();
      }
      if (respuestApi.status === 200 || respuestApi.status === 201) {
        console.log('Actualizando alerta con éxito'); // Log para depuración
        getAllAprentices();
        clearForm();
        setAlerta({
          msg: respuestApi.data.message ,
          error: false,
        });
        console.log(respuestApi)
      } else {
        console.log('Actualizando alerta con error'); // Log para depuración
        setAlerta({
          msg: respuestApi.data.message || "Error al registrar al Aprendiz.",
          error: true,
        });
      }
    } catch (error) {
      console.error('Error details:', error.response || error.request || error.message);
      if (error.response) {
        setAlerta({
          msg: error.response.data.message || "Error en la solicitud",
          error: true,
        });
      } else if (error.request) {
        setAlerta({
          msg: "No se recibió respuesta del servidor",
          error: true,
        });
      } else {
        setAlerta({
          msg: "Error desconocido",
          error: true,
        });
      }
    }
    
  };

  const clearForm = () => {
    setId_Aprendiz("");
    setNom_Aprendiz("");
    setApe_Aprendiz("");
    setId_Ficha("");
    setFec_Nacimiento("");
    setId_Ciudad(""); // Limpiar el campo Id_Ciudad
    setLugarResidencia("");
    setEdad("")
    setHijos("")
    setNom_Eps("")
    setTel_Padre("")
    setGen_Aprendiz("");
    setCor_Aprendiz("");
    setTel_Aprendiz("");
    setTot_Memorandos("");
    setTot_Inasistencias("");
    setPatrocinio("");
    setEstado("");
    setNom_Empresa(""); // Limpiar Nombre de la Empresa
    setCentroConvivencia("");
    setFoto_Aprendiz(null); // Limpiar URL de la Foto
    // inputFoto.current.value = ''
  };

  const setData = () => {
    setId_Aprendiz(apprentice.Id_Aprendiz);
    setNom_Aprendiz(apprentice.Nom_Aprendiz);
    setApe_Aprendiz(apprentice.Ape_Aprendiz);
    setId_Ficha(apprentice.Id_Ficha);
    setFec_Nacimiento(apprentice.Fec_Nacimiento);
    setId_Ciudad(apprentice.Id_Ciudad);
    setLugarResidencia(apprentice.Lugar_Residencia);
    setEdad(apprentice.Edad);
    setHijos(apprentice.Hijos)
    setNom_Eps(apprentice.Nom_Eps)
    setTel_Padre(apprentice.Tel_Padre)
    setGen_Aprendiz(apprentice.Gen_Aprendiz);
    setCor_Aprendiz(apprentice.Cor_Aprendiz);
    setTel_Aprendiz(apprentice.Tel_Aprendiz);
    setTot_Memorandos(apprentice.Tot_Memorandos);
    setTot_Inasistencias(apprentice.Tot_Inasistencias);
    setPatrocinio(apprentice.Patrocinio);
    setEstado(apprentice.Estado);
    setNom_Empresa(apprentice.Nom_Empresa);
    setCentroConvivencia(apprentice.CentroConvivencia);
    setFoto_Aprendiz(apprentice.Foto_Aprendiz);
    const selectedFicha = fichas.find(ficha=> ficha.Id_Ficha === apprentice.Id_Ficha);
    setSelectedFicha(selectedFicha || null)

    const selectedCiudad = ciudades.find(ciudad=> ciudad.Id_Ciudad  === apprentice.Id_Ciudad);
    setSelectedCiudades(selectedCiudad || null)
  };

  useEffect(() => {
    setData();
  }, [apprentice]);



  const { msg } = alerta;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
      <form
  id="apprenticeForm"
  action=""
  onSubmit={sendForm}
  className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
>
{msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
  <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
    Registrar Aprendices
  </h1>

  <div className="mb-3">
    <label
      htmlFor="document"
      className="text-gray-700 uppercase font-bold"
    >
      Documento
    </label>
    <input
      type="number"
      id="document"
      placeholder="Documento del Aprendiz"
      value={Id_Aprendiz}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 10) {
          setId_Aprendiz(value);
        }
      }}
      maxLength={10}  
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="flex space-x-12 mb-3">
    <div className="w-1/2">
      <label className="text-gray-700 uppercase font-bold">Nombres</label>
      <input
        type="text"
        id="name"
        placeholder="Nombres"
        value={Nom_Aprendiz}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 60) {
            setNom_Aprendiz(value);
          }
        }}
        maxLength={60}
        className="w-full p-2 border rounded"
      />
    </div>

    <div className="w-1/2">
      <label className="text-gray-700 uppercase font-bold">Apellidos</label>
      <input
        type="text"
        id="lastName"
        placeholder="Apellidos"
        value={Ape_Aprendiz}
        onChange={(e) => setApe_Aprendiz(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Fichas:</label>
    <select name="" id="ficha" value={Id_Ficha} 
    onChange={(e) => setId_Ficha(e.target.value) }
    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">

      <option value="">Seleccione su Ficha: </option>
      {
        fichas.map((ficha)=>(
          <option key={ficha.Id_Ficha} value={ficha.Id_Ficha} >
            {ficha.Id_Ficha}
            
          </option>

        ))}

    </select>
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Fecha de Nacimiento</label>
    <input
      type="date"
      id="birthDate"
      value={Fec_Nacimiento}
      onChange={(e) => setFec_Nacimiento(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

    <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Ciudad
            </label>
                  <select
                    id="Id_ProgramaFormacion"
                    value={Id_Ciudad}
                    onChange={(e) => setId_Ciudad(e.target.value)}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  >
                    <option value="">Seleccione una Ciudad:</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad.Id_Ciudad} value={ciudad.Id_Ciudad}>
                        {ciudad.Nom_Ciudad}
                      </option>
                    ))}
                  </select>
          </div>

          <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Lugar Residencia</label>
    <input
      type="text"
      id="lugar"
      placeholder="Direccion Casa"
      value={Lugar_Residencia}
      onChange={(e) => setLugarResidencia(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>


  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Edad</label>
    <input
      type="number"
      id="age"
      placeholder="Edad"
      value={Edad}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 2) {
          setEdad(value);
        }
      }}
      maxLength={2}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Hijos</label>
    <select
      id="children"
      value={Hijos}
      onChange={(e) => setHijos(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    >
      <option value="">Seleccione</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">EPS</label>
    <input
      type="text"
      id="eps"
      placeholder="Nombre de la EPS"
      value={Nom_Eps}
      onChange={(e) => setNom_Eps(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Teléfono del Padre</label>
    <input
      type="text"
      id="parentPhone"
      placeholder="Teléfono del Padre"
      value={Tel_Padre}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 13) {
          setTel_Padre(value);
        }
      }}
      maxLength={13}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Género</label>
    <select name="" id="genero" value={Gen_Aprendiz} onChange={(e) => setGen_Aprendiz(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
      <option value="" className="">Selecione Uno</option>
      <option value="Masculino" className="">Masculino</option>
      <option value="Femenino" className="">Femenino</option>
      <option value="Otro" className="">Otro</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Correo</label>
    <input
      type="email"
      id="email"
      placeholder="Correo"
      value={Cor_Aprendiz}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 60) {
          setCor_Aprendiz(value);
        }
      }}
      maxLength={60}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Teléfono Aprendiz</label>
    <input
      type="text"
      id="phone"
      placeholder="Teléfono"
      value={Tel_Aprendiz}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 13) {
          setTel_Aprendiz(value);
        }
      }}
      maxLength={13}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Total Memorandos</label>
    <input
      type="text"
      id="phone"
      placeholder="memorandos"
      value={Tot_Memorandos}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 2) {
          setTot_Memorandos(value);
        }
      }}
      maxLength={2}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Total Inasistencias</label>
    <input
      type="text"
      id="phone"
      placeholder="Inasistencias"
      value={Tot_Inasistencias}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 2) {
          setTot_Inasistencias(value);
        }
      }}
      maxLength={2}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>








  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Patrocinio</label>
    <select
      id="patrocinio"
      value={Patrocinio}
      onChange={(e) => setPatrocinio(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    >
      <option value="">Seleccione</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Estado :</label>
    <select
      id="patrocinio"
      value={Estado}
      onChange={(e) => setEstado(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    >
      <option value="">Seleccione un Estado</option>
      <option value="activo">Activo</option>
      <option value="Inactivo">Inactivo</option>
    </select>
  </div>




  {Patrocinio === "si" && (
    <div className="mb-3">
      <label className="text-gray-700 uppercase font-bold">Nombre de la Empresa</label>
      <input
        type="text"
        id="companyName"
        placeholder="Nombre de la Empresa"
        value={Nom_Empresa}
        onChange={(e) => setNom_Empresa(e.target.value)}
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      />
    </div>
  )}

  <div className="mb-3">
    <label className="text-gray-700 uppercase font-bold">Centro de Convivencia</label>
    <select
      id="centroConvivencia"
      value={CentroConvivencia}
      onChange={(e) => setCentroConvivencia(e.target.value)}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    >
      <option value="">Seleccione</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="Foto_Aprendiz" className="text-gray-700 uppercase font-bold">Foto Del Aprendiz</label>
    <input
      type="file"
      id="Foto_Aprendiz"
      onChange={(e) => setFoto_Aprendiz(e.target.files[0])}
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
    />
  </div>

  <div className="flex justify-around">

    <input
      type="submit"
      id="button"
      value={buttonForm}
      
      className="bg-green-600 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-700 md:w-auto"
    />
    <input
      type="button"
      id="button"
      value="Limpiar"
      onClick={() => { clearForm(); updateTextButton("Enviar") }}
      
      className="bg-yellow-400 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-yellow-700 md:w-auto"
    />

  </div>
</form>
    </div>
  );
};

export default FormApprentices;
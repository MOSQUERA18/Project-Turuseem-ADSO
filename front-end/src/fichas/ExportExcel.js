// ExportToExcel.js

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Función para preparar los datos para Excel
export const prepareDataForExcel = (fichas, fichasList) => {
  return (fichas.length ? fichas : fichasList).map(ficha => ({
    Numero_de_Ficha: ficha.Id_Ficha,
    Fecha_Inicio_Etapa_Lectiva: ficha.Fec_InicioEtapaLectiva,
    Fecha_Fin_Etapa_Lectiva: ficha.Fec_FinEtapaLectiva,
    Cantidad_Aprendices: ficha.Can_Aprendices,
    Nombre_Programa_Formacion: ficha.programasFormacion.Nom_ProgramaFormacion, // Ajusta según tus datos
    Estado: ficha.Estado,
  }));
};

// Función para exportar los datos a Excel
export const exportToExcel = (fichas, fichasList) => {
  const data = prepareDataForExcel(fichas, fichasList);

  if (data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Fichas');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Fichas.xlsx');
};

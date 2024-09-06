// ExportToExcel.js

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Función para preparar los datos para Excel
export const prepareDataForExcel = (programa, programaList) => {
  return (programa.length ? programa : programaList).map(programa => ({
    ID: programa.Id_ProgramaFormacion,
    Nombre_Programa: programa.Nom_ProgramaFormacion,
    Tipo_Programa: programa.Tip_ProgramaFormacion,
    Area: programa.areas ? programa.areas.Nom_Area : "N/A", // Asume que tienes el nombre del área
  }));
};

// Función para exportar los datos a Excel
export const exportToExcel = (programa, programaList) => {
  const data = prepareDataForExcel(programa, programaList);
  
  if (data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Programa Formación');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Programa_Formacion.xlsx');
};

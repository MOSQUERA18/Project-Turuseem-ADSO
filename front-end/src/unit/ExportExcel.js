// ExportToExcel.js

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Función para preparar los datos para Excel
export const prepareDataForExcel = (unidad, unidadList) => {
  return (unidad.length ? unidad : unidadList).map(unidad => ({
    ID: unidad.Id_Unidad,
    Nombre: unidad.Nom_Unidad,
    HoraApertura: unidad.Hor_Apertura,
    HoraCierre: unidad.Hor_Cierre,
    Estado: unidad.Estado,
    Area: unidad.areas ? unidad.areas.Nom_Area : "N/A", // Asume que tienes el nombre del área
  }));
};

// Función para exportar los datos a Excel
export const exportToExcel = (unidad, unidadList) => {
  const data = prepareDataForExcel(unidad, unidadList);

  if (data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Unidades');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Unidades.xlsx');
};

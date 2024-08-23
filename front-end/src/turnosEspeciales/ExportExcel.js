// ExportToExcel.js

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Función para preparar los datos para Excel
export const prepareDataForExcel = (turnoEspecial, turnoEspecialList) => {
  return (turnoEspecial.length ? turnoEspecial : turnoEspecialList).map(turno => ({
    ID: turno.Id_TurnoEspecial,
    Fecha: turno.Fec_TurnoEspecial,
    HorarioInicio: turno.Hor_Inicio,
    HorarioFin: turno.Hor_Fin,
    Observaciones: turno.Obs_TurnoEspecial,
    TotalAsistentes: turno.Tot_AprendicesAsistieron,
    Ficha: turno.Id_Ficha,
    Imagen: turno.Img_Asistencia,
    Funcionario: turno.Id_Funcionario,
    Unidad: turno.Id_Unidad,
  }));
};

// Función para exportar los datos a Excel
export const exportToExcel = (turnoEspecial, turnoEspecialList) => {
  const data = prepareDataForExcel(turnoEspecial, turnoEspecialList);

  if (data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Turnos Especiales');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'TurnosEspeciales.xlsx');
};

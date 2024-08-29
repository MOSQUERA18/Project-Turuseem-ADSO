// ExportToExcel.js

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Función para preparar los datos para Excel
export const prepareDataForExcel = (funcionario, funcionarioList) => {
  return (funcionario.length ? funcionario : funcionarioList).map(funcionario => ({
    ID: funcionario.Id_Funcionario,
    Nombre_Funcionario: funcionario.Nom_Funcionario,
    Apellido_Funcionario: funcionario.Ape_Funcionario,
    Genero_Funcionario: funcionario.Genero,
    Telefono_Funcionario: funcionario.Tel_Funcionario,
    Estado_Funcionario: funcionario.Estado,
    Cargo_Funcionario: funcionario.Cargo,

  }));
};

// Función para exportar los datos a Excel
export const exportToExcel = (funcionario, funcionarioList) => {
  const data = prepareDataForExcel(funcionario, funcionarioList);
  
  if (data.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Funcionarios');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Funcionarios.xlsx');
};

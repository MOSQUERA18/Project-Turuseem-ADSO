import fs from "fs";
import csv from "csv";

// Encapsulé el procesamiento del archivo CSV en una función parseCsvFile.
const parseCsvFile = () => {
  return new Promise((resolve, reject) => {
    const result = [];

    fs.createReadStream("./sample.csv")
      .pipe(csv.parse({ trim: true, skip_empty_lines: true, columns: true }))
      .on("data", (row) => {
        result.push(row);
      })
      // Agregué un manejador de errores con .on("error", ...) para capturar errores de la transmisión de datos.
      .on("error", (error) => {
        reject(`Error al procesar el archivo CSV: ${error.message}`);
      })
      .on("end", () => {
        console.log(result);
        console.log("Csv parsing finished");
        resolve(result);
      });
  });
};

// Utilicé una Promise para manejar la asincronía de fs.createReadStream y el evento end.
parseCsvFile()
  .then((result) => {
    // Aquí puedes manejar el resultado del archivo CSV procesado si es necesario.
    console.log("Archivo CSV procesado con éxito.");
  })
  // Añadí un catch para capturar y manejar cualquier error que ocurra durante la ejecución de la Promise.
  .catch((error) => {
    console.error(error);
  });

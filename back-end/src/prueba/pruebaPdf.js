import fs from "fs";
import pdf from "html-pdf";

export const crearPdf = async (response, req) => {
  try {
    const rutaRaiz = process.cwd();
    const ruta = `${rutaRaiz}\\src\\prueba\\data.txt`;
    console.log(process.cwd());

    // Leer el archivo HTML
    const html = fs.readFileSync(ruta, "utf8");
    const options = { format: "Letter" };

    // Crear el PDF y guardar el archivo
      pdf.create(html, options).toFile("./data-linares.pdf", (err, res) => {
        if (err) {
          return res.status(500).json({error: err});
        }

      });
  // console.log(result);
    // Leer el archivo PDF y convertirlo a base64
    const data = fs.readFileSync(result.filename);
    const base64String = data.toString("base64");
    response.json({file: base64String})

    // const outputPath = "D:\\Project-Turuseem-ADSO\\back-end\\output.pdf";
    // await base64ToPdf(base64String, outputPath);

    // Eliminar el archivo PDF temporal
    // fs.unlink(result.filename, (err) => {
    //   if (err) {
    //     return console.error("Error al eliminar el archivo temporal:", err);
    //   }
    //   console.log("Archivo PDF temporal eliminado");
    // });
  } catch (err) {
    console.error("Error en la creación del PDF:", err)
  }
};

// const base64ToPdf = async (base64String, outputPath) => {
//   try {
//     // Decodificar la cadena base64 a un buffer
//     const pdfBuffer = Buffer.from(base64String, "base64");

//     // Escribir el buffer en un archivo
//     await new Promise((resolve, reject) => {
//       fs.writeFile(outputPath, pdfBuffer, (err) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve();
//       });
//     });

//     console.log("Archivo PDF creado con éxito:", outputPath);
//   } catch (err) {
//     console.error("Error al escribir el archivo:", err);
//   }
// };

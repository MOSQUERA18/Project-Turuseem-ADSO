<<<<<<< HEAD


const Manual = () => {
  return (
    <>
      <h1>Manual</h1>
    </>
  )
}

export default Manual
=======
import PDFViewer from "pdf-viewer-reactjs";

function Manual() {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <h1 className="font-extrabold text-4xl text-gray-500 uppercase mb-14">
          Manual de Consulta <span className="text-green-500">Turnos Rutinarios</span>
        </h1>
        <PDFViewer
          document={{
            url: `http://localhost:5173/PDFs/Manual-Consulta-TURUSEEM.pdf`,
          }}
          scale={1.5}
        />
      </div>
    </>
  );
}

export default Manual;
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea

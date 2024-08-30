import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Manual() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-extrabold text-4xl text-gray-500 uppercase mb-14">
        Manual de Consulta <span className="text-green-500">Turnos Rutinarios</span>
      </h1>
      <div style={{ height: '800px', width: '100%' }}>
        <Worker workerUrl="http://localhost:5173/public/workers/pdf.worker.min.js">
          <Viewer fileUrl="http://localhost:5173/PDFs/Manual-Consulta-TURUSEEM.pdf" plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}

export default Manual;

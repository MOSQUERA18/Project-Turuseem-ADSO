function Manual() {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <h1 className="font-extrabold text-3xl uppercase mb-5">
          Manual de Consulta{" "}
          <span className="text-green-700">Turnos Rutinarios</span>
        </h1>
        <iframe
          src="Public/PDFs/Manual-Consulta-TURUSEEM.pdf"
          height="700"
          allowFullScreen
          className="w-full border-none"
        ></iframe>
      </div>
    </>
  );
}

export default Manual;
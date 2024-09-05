function Manual() {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <h1 className="font-extrabold text-3xl uppercase mb-5">
          Manual de Consulta{" "}
          <span className="text-green-500">Turnos Rutinarios</span>
        </h1>
        <iframe
          src="Public/PDFs/Manual-Consulta-TURUSEEM.pdf"
          height="700"
          className="w-full"
        ></iframe>
      </div>
    </>
  );
}

export default Manual;

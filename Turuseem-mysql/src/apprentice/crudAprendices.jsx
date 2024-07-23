import { Link, Outlet } from "react-router-dom"


const CrudAprendices = () => {
    return (
        <>
            <header className="py-3 bg-white ">
                <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center">
                    <nav className="flex gap-5 flex-col lg:flex-row mt-2 lg:mt-0 items-center uppercase mb-5">
                        <Link to="registrar" className="px-10 hover:border-b-2 active:bg-green-400 hover:border-b-green-500 after:bg-green-400 font-semibold py-2">Registrar</Link>
                        <Link to="consultar" className="px-10 hover:border-b-2 active:bg-green-400 hover:border-b-green-500 font-semibold py-2">Consultar</Link>
                        <Link to="actualizar" className="px-10 hover:border-b-2 active:bg-green-400 hover:border-b-green-500 font-semibold py-2">Actualizar</Link>
                        <Link to="eliminar" className="px-10 hover:border-b-2 active:bg-green-400 hover:border-b-green-500 font-semibold py-2">Eliminar</Link>
                        <Link to="importCSV" className="px-10 hover:border-b-2 active:bg-indigo-400 hover:border-b-indigo-600 font-semibold py-2">Importar CSV</Link>
                        <Link to="exportPDF " className="px-10 hover:border-b-2 active:bg-indigo-400 hover:border-b-indigo-600 font-semibold py-2">Exportar PDF</Link>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    )
}

export default CrudAprendices


/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";

function ModalWindow({
  stateAddNewRow,
  setStateAddNewRow,
  form,
  toggleModal,
  isOpen,
}) {
  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => {
          setStateAddNewRow(!stateAddNewRow);
          console.log("toggleModal:", typeof toggleModal); // Verificar que sea una función
          if (typeof toggleModal === 'function') {
            toggleModal();
          }
        }}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <IoMdPersonAdd />
        Agregar
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50 backdrop-blur-sm"
        >
          <div className="relative p-4 w-full max-w-5xl h-auto min-h-[200px] max-h-[95vh] ">
            {" "}
            {/* overflow-y-auto */}
            {/* Contenido del modal */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <AiOutlineClose size={16} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Aquí se renderiza el formulario */}
              <div className="p-6">{form}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWindow;

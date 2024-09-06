/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect } from "react";

function ModalWindow({ stateAddNewRow, setStateAddNewRow, form, isModalOpen, setIsModalOpen, resetForm ,updateTextBottom}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen !== isModalOpen) {
      setIsOpen(isModalOpen);
    }
    // Limpiar el formulario cuando el modal se cierra
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen, isOpen, resetForm]);

  const toggleModal = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsModalOpen(newIsOpen);
    updateTextBottom("Enviar")
  
    // Solo reinicia el formulario cuando el modal se está cerrando
    if (!newIsOpen) {
      resetForm();
    }

  };
  return (
    <>
      {/* Botón para abrir el modal */}
      <button
  onClick={() => [setStateAddNewRow(!stateAddNewRow), toggleModal()]}
  className="flex items-center gap-2 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-lg transition-colors duration-300 ease-in-out"
  type="button"
  style={{ color: 'white' }}  // Esto asegura que el color del texto sea blanco
>
  <IoMdPersonAdd size={20} />
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
          <div className="relative p-4 w-full max-w-7xl max-h-full">
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
              <div className="p-6">
                {form}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWindow;

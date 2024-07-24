/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"


const ImportarCSV = ({URI}) => {
  const [ fileInput, setFileInput ] = useState(null)
  
  const readCsv = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(fileInput);
    axios.post(`${URI}import-csv`, toString(fileInput), config)
  }
  return (
    <div className=" ">
      <form
        id="apprenticeForm"
        action=""
        className="bg-white  rounded-2xl max-w-3xl w-full"
        onSubmit={readCsv}
      >
        <div className="flex items-end">
          {/* <div className="relative max-w-sm"> */}
            <input
              id="fileInput"
              type="file"
              className="custom-file-input w-full overflow-clip rounded-xl border border-slate-300 bg-slate-100/50 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-none file:px-4 file:py-2 file:font-medium file:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:text-slate-300 file:bg-green-400 dark:file:text-white dark:focus-visible:outline-blue-600 mt-2"
              onChange={(e) => setFileInput(e.target.files[0])}
            />
          {/* </div> */}
          <input
            type="submit"
            id="button"
            value="Enviar"
            className="bg-green-500 h-11 flex content-center px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-700 md:w-auto ml-5"
          />
        </div>
      </form>
    </div>
  );
};

export default ImportarCSV;

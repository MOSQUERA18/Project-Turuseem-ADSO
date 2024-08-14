import { useState } from "react";
import logoTuruseem from "../assets/LOGOTURUSEEM.png";
import { Link } from "react-router-dom";

//Icons
import { BsFillPeopleFill } from "react-icons/bs";
import { IoDocumentText, IoSettings } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaClipboardCheck } from "react-icons/fa6";

export default function VerticalNav() {
  // let menuArray = [true, false, false];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [menu, setMenu] = useState(menuArray);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(true);

  // const setMenuValue = (props) => {
  //   let newArr = [...menu];
  //   newArr[props] = !newArr[props];
  //   setMenu(newArr);
  // };

  return (
    <div>
      <div className=" bg-green-500 xl:hidden flex justify-between w-full p-6 items-center ">
        <div className="flex justify-between  items-center space-x-3">
          <img src={logoTuruseem} className="w-12 drop-shadow-2xl" />

          <p className="text-2xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            onClick={() => setShow(true)}
            className={`${
              show ? "hidden" : ""
            } focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="close"
            id="close"
            onClick={() => setShow(false)}
            className={`${
              show ? "" : "hidden"
            } focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="Main"
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-center items-start h-full  w-full sm:w-64 bg-green-500 flex-col`}
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <img src={logoTuruseem} className="w-12 drop-shadow-2xl" />
          <p className="text-2xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>
        <div className="mt-6 flex flex-col justify-end items-center  pl-4 w-full border-gray-600 border-b space-y-3 p-5 ">
          <button className="flex jusitfy-start items-center space-x-4 pl-3 w-full  focus:outline-none  focus:text-indigo-400  text-white border-y py-2 border-white rounded">
            <BsFillPeopleFill size={22} />
            <Link
              to="aprendices"
              className="text-white text-base uppercase font-bold"
            >
              Aprendices
            </Link>
          </button>
          <button className="flex jusitfy-start items-center w-full  space-x-4 pl-3 focus:outline-none text-white focus:text-indigo-400 rounded border-y py-2 border-white">
            <IoDocumentText size={22} />
            <Link
              to="memorandos"
              className="text-white text-base uppercase font-bold"
            >
              Memorandos
            </Link>
          </button>
          <button className="flex jusitfy-start items-center w-full  space-x-4 pl-3 focus:outline-none text-white focus:text-indigo-400 rounded border-y py-2 border-white ">
            <PiNotebookFill size={22} />
            <Link
              to="programa-formacion"
              className="text-white text-base uppercase font-bold"
            >
              Programa
            </Link>
          </button>
          <button className="flex jusitfy-start items-center w-full  space-x-4 pl-3 focus:outline-none text-white focus:text-indigo-400 rounded border-y py-2 border-white ">
            <SiHomeassistantcommunitystore size={22} />
            <Link
              to="unidades"
              className="text-white text-base uppercase font-bold"
            >
              Unidades
            </Link>
          </button>
          <button className="flex jusitfy-start items-center w-full  space-x-4 pl-3 focus:outline-none text-white focus:text-indigo-400 rounded border-y py-2 border-white">
            <FaClipboardCheck size={22} />
            <Link
              to="fichas"
              className="text-white text-base uppercase font-bold"
            >
              Fichas
            </Link>
          </button>
        </div>
        <div className="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-15 ">
          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center  space-x-2">
              <div>
                <img
                  className="rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN9fV4_xpG-p-D2DIb5JQe7OqzM6tL2DDGHw&s"
                  alt="avatar"
                />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-sm leading-5 text-white">
                  Sena Empresa La Granja
                </p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">
                  senaempresa@gmail.com
                </p>
              </div>
            </div>
            <IoSettings size={45} />
          </div>
        </div>
      </div>
    </div>
  );
}

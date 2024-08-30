/* eslint-disable react/prop-types */
<<<<<<< HEAD
=======
import Logo from '../assets/LOGOSENAEMPRESA.png';
import JuanLinares from "../assets/JuanLinares.jpg"
import mosquera from "../assets/mosquera.png"
import Kim from "../assets/Kim.jpeg"
import Natalia from "../assets/Natalia.jpeg"
import Lina from "../assets/Lina.jpeg"
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea

const ContactCard = ({ name, info, age, imageUrl, whatsappLink, socialLink }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-48 h-48 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <h5 className="text-xl font-semibold text-center">{info}</h5>
      <p className="text-gray-600">Edad: {age}</p>
      <div className="flex space-x-4 mt-4">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp.png"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </a>
        <a href={socialLink} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/color/48/000000/facebook.png"
            alt="Facebook"
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
};

const Contacto = () => {
  const contacts = [
    {
      name: 'Juan David Linares Barragán',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "18 Años",
<<<<<<< HEAD
      imageUrl: "Public/assets/JuanLinares.jpg",
=======
      imageUrl: JuanLinares,
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      whatsappLink: 'https://wa.me/573209455659',
      socialLink: 'https://facebook.com/Linares.Juan.5855',
    },
    {
      name: 'Marlon Kaleth Sarmiento Mosquera',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "18 Años",
<<<<<<< HEAD
      imageUrl: "Public/assets/mosquera.png",
=======
      imageUrl: mosquera,
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://www.facebook.com/marlon.mosquera.5855',
    },
    {
      name: 'Natalia Torres Rodriguez',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "20 Años",
<<<<<<< HEAD
      imageUrl: "Public/assets/Natalia.jpeg",
=======
      imageUrl: Natalia,
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://facebook.com/',
    },
    {
      name: 'Kimberly Sharlot Hernadez Acosta',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "20 Años",
<<<<<<< HEAD
      imageUrl: "Public/assets/Kim.jpeg",
=======
      imageUrl: Kim,
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://facebook.com/marialopez',
    },
    {
      name: 'Lina Julieth Carvajal Mendoza',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "26 Años",
<<<<<<< HEAD
      imageUrl: "Public/assets/Lina.jpeg",
=======
      imageUrl: Lina,
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://facebook.com/marialopez',
    },
    // Añadir más contactos según sea necesario
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {contacts.map((contact, index) => (
        <ContactCard key={index} {...contact} />
      ))}
    </div>
  );
};

export default Contacto;

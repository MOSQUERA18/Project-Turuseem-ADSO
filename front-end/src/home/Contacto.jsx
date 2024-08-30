/* eslint-disable react/prop-types */

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
      imageUrl: "Public/assets/JuanLinares.jpg",
      whatsappLink: 'https://wa.me/573209455659',
      socialLink: 'https://www.facebook.com/profile.php?id=100095190046582',
    },
    {
      name: 'Marlon Kaleth Sarmiento Mosquera',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "18 Años",
      imageUrl: "Public/assets/mosquera.png",
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://www.facebook.com/marlon.mosquera.5855',
    },
    {
      name: 'Natalia Torres Rodriguez',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "20 Años",
      imageUrl: "Public/assets/Natalia.jpeg",
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://www.facebook.com/profile.php?id=100024303797798',
    },
    {
      name: 'Kimberly Sharlot Hernadez Acosta',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "20 Años",
      imageUrl: "Public/assets/Kim.jpeg",
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://www.facebook.com/profile.php?id=100078628960697',
    },
    {
      name: 'Lina Julieth Carvajal Mendoza',
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: "26 Años",
      imageUrl: "Public/assets/Lina.jpeg",
      whatsappLink: 'https://wa.me/3209455659',
      socialLink: 'https://www.facebook.com/LJCM97',
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
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const encryptData = async (data) => {
    const { name } = data;
    const plaintextData = name;

    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken'))
      ?.split('=')[1]; // Obtén el token de las cookies

    const response = await fetch('https://mysite.com:8000/home/encrypt/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Envía el token CSRF
      },
      credentials: "include", // Asegúrate de enviar cookies en solicitudes CORS
      body: JSON.stringify({ plaintextData }),
    });

    if (!response.ok) {
      throw new Error('Failed to encrypt data');
    }

    const result = await response.json();
    return result.encryptedData;
  };

  const sendTypeAsset = async () => {
    const asset = document.getElementById("addAsset").value;

    // Crear el objeto de datos a enviar
    const data = {
      name: asset,
    };

    // Cifrar todo el cuerpo del objeto
    const encryptedData = await encryptData(data);

    // Hacer la solicitud POST al servidor con los datos cifrados
    const response = await fetch("https://mysite.com:8000/home/create_typeAsset/", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // Cambiar a text/plain si el cuerpo completo es cifrado
      },
      body: encryptedData,
    });

    // Manejar la respuesta del servidor
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <Navbar />

      <br />
      <div>
        <label htmlFor="addAsset">Crear un nuevo tipo de activo</label>
        <input type="text" name="addAsset" id="addAsset" style={{
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
          width: "200px",
          margin: "5px 0"
        }} />
        <button onClick={sendTypeAsset}>Agregar nota</button>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="2021-09-15"
            content="Meeting on 7th April Meeting on 7th April"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;

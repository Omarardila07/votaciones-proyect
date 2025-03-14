import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Go from "../iconos/go";

const HomeC = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [votoRealizado, setVotoRealizado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCandidatos = async () => {
      try {
        const candidatosRef = collection(db, "contralores");
        const snapshot = await getDocs(candidatosRef);
        const listaCandidatos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidatos(listaCandidatos);
      } catch (error) {
        console.error("Error al obtener candidatos:", error);
      }
    };
    obtenerCandidatos();
  }, []);

  useEffect(() => {
    const createBubbles = () => {
      const container = document.querySelector(".bubble-container");
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${3 + Math.random() * 4}s`;
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 7000);
      }
    };
    createBubbles();
    const interval = setInterval(createBubbles, 4000);
    return () => clearInterval(interval);
  }, []);

  const votar = async (id) => {
    if (votoRealizado) {
      alert("Ya has votado.");
      return;
    }
    try {
      const candidatoRef = doc(db, "contralores", id);
      await updateDoc(candidatoRef, { votos: increment(1) }); // ✅ Incremento atómico

      setCandidatos((prevCandidatos) =>
        prevCandidatos.map((c) =>
          c.id === id ? { ...c, votos: c.votos + 1 } : c
        )
      );
      setVotoRealizado(true);
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  const irAOtraPagina2 = () => {
    navigate("/");
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-6 bg-black text-white overflow-hidden">
      <div className="bubble-container absolute top-0 left-0 w-full h-full pointer-events-none z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-5xl font-bold mb-8 text-center">Contralores 10</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {candidatos.map(({ id, nombre, imagen, votos }) => (
            <div key={id} className="border p-6 rounded-lg shadow-lg bg-white text-black">
              <img src={imagen} alt={nombre} className="w-40 h-40 mx-auto mb-4 rounded-2xl shadow-md" />
              <h2 className="text-2xl font-semibold mb-2">{nombre}</h2>
              <button
                className="mt-4 px-6 py-3 border-2 border-black text-black font-semibold text-lg rounded-lg transition duration-300 hover:bg-black hover:text-white disabled:bg-gray-400"
                onClick={() => votar(id)}
                disabled={votoRealizado}
              >
                {votoRealizado ? "Voto registrado" : "Votar"}
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center items-center w-full mt-6 px-6 py-3 border-2 border-white text-white font-bold text-lg rounded-lg transition duration-300 hover:bg-white hover:text-black cursor-pointer" onClick={irAOtraPagina2}>
          <button>Siguiente</button>
          <Go />
        </div>
      </div>
      <style>
        {`
          .bubble-container {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .bubble {
            position: absolute;
            bottom: -10px;
            width: 15px;
            height: 15px;
            background-color: white;
            border-radius: 50%;
            opacity: 0.5;
            filter: blur(4px);
            animation: floatUp linear infinite;
          }
          @keyframes floatUp {
            from {
              transform: translateY(0);
              opacity: 0.5;
            }
            to {
              transform: translateY(-100vh);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomeC;
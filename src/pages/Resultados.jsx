import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const Resultados = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [contralores, setContralores] = useState([]);

  useEffect(() => {
    const candidatosRef = collection(db, "votaciones");
    const unsubscribeCandidatos = onSnapshot(candidatosRef, (snapshot) => {
      const listaCandidatos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCandidatos(listaCandidatos);
    });

    const contraloresRef = collection(db, "contralores");
    const unsubscribeContralores = onSnapshot(contraloresRef, (snapshot) => {
      const listaContralores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContralores(listaContralores);
    });

    return () => {
      unsubscribeCandidatos();
      unsubscribeContralores();
    };
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

  return (
    <div className="relative flex flex-col items-center min-h-screen p-6 bg-black text-white overflow-hidden">
      <div className="bubble-container absolute top-0 left-0 w-full h-full pointer-events-none z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-opacity-50 p-6 rounded-lg text-center">
        <h1 className="text-5xl font-bold mb-8">Resultados</h1>

        <h2 className="text-3xl font-semibold mt-6 mb-3">Representantes 11</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {candidatos.length > 0 ? (
            candidatos.map(({ id, nombre, imagen, votos }) => (
              <div key={id} className="border p-6 rounded-lg shadow-lg bg-white text-black">
                <img src={imagen} alt={nombre} className="w-40 h-40 mx-auto mb-4 rounded-2xl shadow-md" />
                <h3 className="text-xl font-semibold">{nombre}</h3>
                <p className="text-black text-4xl font-bold">Votos: {votos}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No hay candidatos registrados aún.</p>
          )}
        </div>

        <h2 className="text-3xl font-semibold mt-6 mb-3">Contralores 10</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {contralores.length > 0 ? (
            contralores.map(({ id, nombre, imagen, votos }) => (
              <div key={id} className="border p-6 rounded-lg shadow-lg bg-white text-black">
                <img src={imagen} alt={nombre} className="w-40 h-40 mx-auto mb-4 rounded-2xl shadow-md" />
                <h3 className="text-xl font-semibold">{nombre}</h3>
                <p className="text-black text-4xl font-bold">Votos: {votos}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No hay contralores registrados aún.</p>
          )}
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

export default Resultados;


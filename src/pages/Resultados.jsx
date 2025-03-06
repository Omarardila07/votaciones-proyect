import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const Resultados = () => {
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    const candidatosRef = collection(db, "votaciones");

    // Suscripción en tiempo real
    const unsubscribe = onSnapshot(candidatosRef, (snapshot) => {
      const listaCandidatos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCandidatos(listaCandidatos);
    });

    // Limpiar la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-4">Resultados</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidatos.map(({ id, nombre, imagen, votos }) => (
          <div key={id} className="border p-4 rounded-lg shadow-lg text-center">
            <img
              src={imagen}
              alt={nombre}
              className="w-40 h-40 mx-auto mb-2"
            />
            <h2 className="text-xl font-semibold">{nombre}</h2>
            <p className="text-gray-600 text-4xl">Votos: {votos}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultados;

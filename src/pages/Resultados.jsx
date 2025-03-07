import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const Resultados = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [contralores, setContralores] = useState([]);

  useEffect(() => {
    // Obtener los candidatos de la colección "votaciones"
    const candidatosRef = collection(db, "votaciones");
    const unsubscribeCandidatos = onSnapshot(candidatosRef, (snapshot) => {
      const listaCandidatos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCandidatos(listaCandidatos);
    });

    // Obtener los contralores de la colección "contralores"
    const contraloresRef = collection(db, "contralores");
    const unsubscribeContralores = onSnapshot(contraloresRef, (snapshot) => {
      const listaContralores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContralores(listaContralores);
    });

    // Limpiar suscripciones cuando el componente se desmonta
    return () => {
      unsubscribeCandidatos();
      unsubscribeContralores();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-4">Resultados</h1>

      {/* Sección de Candidatos */}
      <h2 className="text-3xl font-semibold mt-6 mb-3">Candidatos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidatos.length > 0 ? (
          candidatos.map(({ id, nombre, imagen, votos }) => (
            <div key={id} className="border p-4 rounded-lg shadow-lg text-center">
              <img src={imagen} alt={nombre} className="w-40 h-40 mx-auto mb-2" />
              <h3 className="text-xl font-semibold">{nombre}</h3>
              <p className="text-gray-600 text-4xl">Votos: {votos}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No hay candidatos registrados aún.</p>
        )}
      </div>

      {/* Sección de Contralores */}
      <h2 className="text-3xl font-semibold mt-6 mb-3">Contralores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contralores.length > 0 ? (
          contralores.map(({ id, nombre, imagen, votos }) => (
            <div key={id} className="border p-4 rounded-lg shadow-lg text-center">
              <img src={imagen} alt={nombre} className="w-40 h-40 mx-auto mb-2" />
              <h3 className="text-xl font-semibold">{nombre}</h3>
              <p className="text-gray-600 text-4xl">Votos: {votos}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No hay contralores registrados aún.</p>
        )}
      </div>
    </div>
  );
};

export default Resultados;


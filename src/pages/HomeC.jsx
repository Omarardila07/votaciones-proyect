import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const HomeC = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [votoRealizado, setVotoRealizado] = useState(false);

  useEffect(() => {
    const obtenerCandidatos = async () => {
      try {
        const candidatosRef = collection(db, "contralores");
        const snapshot = await getDocs(candidatosRef);
        const listaCandidatos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCandidatos(listaCandidatos); // No se ordena, mantiene el orden original de Firebase
      } catch (error) {
        console.error("Error al obtener candidatos:", error);
      }
    };

    obtenerCandidatos();
  }, []);

  const votar = async (id, votosActuales) => {
    if (votoRealizado) {
      alert("Ya has votado.");
      return;
    }

    try {
      const candidatoRef = doc(db, "contralores", id);
      await updateDoc(candidatoRef, { votos: votosActuales + 1 });

      setCandidatos((prevCandidatos) =>
        prevCandidatos.map((c) =>
          c.id === id ? { ...c, votos: votosActuales + 1 } : c
        )
      );

      setVotoRealizado(true);
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-4">Votaciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidatos.map(({ id, nombre, imagen, votos }) => (
          <div key={id} className="border p-4 rounded-lg shadow-lg text-center">
            <img
              src={imagen}
              alt={nombre}
              className="w-40 h-40 mx-auto mb-2 "
            />
            <h2 className="text-xl font-semibold">{nombre}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              onClick={() => votar(id, votos)}
              disabled={votoRealizado}
            >
              {votoRealizado ? "Voto registrado" : "Votar"}
            </button>
          </div>
        ))}
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Siguiente</button>
    </div>
  );
};

export default HomeC;


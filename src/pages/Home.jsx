import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const Home = () => {
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    const obtenerCandidatos = async () => {
      const querySnapshot = await getDocs(collection(db, "votaciones"));
      const candidatosLista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCandidatos(candidatosLista);
    };

    obtenerCandidatos();
  }, []);

  const votar = async (id, votos) => {
    const candidatoRef = doc(db, "votaciones", id);
    await updateDoc(candidatoRef, { votos: votos + 1 });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Votación</h1>
      {candidatos.map(candidato => (
        <div key={candidato.id} className="mb-4 p-4 border rounded shadow-md">
          <h2 className="text-xl">{candidato.candidato_3 || "Candidato"}</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => votar(candidato.id, candidato.votos)}
          >
            Votar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;

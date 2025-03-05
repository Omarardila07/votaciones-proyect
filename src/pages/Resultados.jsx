import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const Resultados = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "votaciones"), snapshot => {
      const resultadosLista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Datos de Firestore:", resultadosLista); // Verificar si hay datos
      setResultados(resultadosLista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Resultados</h1>
      {resultados.length > 0 ? (
        resultados.map(resultado => (
          <div key={resultado.id} className="mb-4 p-4 border rounded shadow-md">
            <h2 className="text-xl">{resultado.candidato_3 ?? "Candidato no definido"}</h2>
            <p className="text-lg font-semibold">Votos: {resultado.votos ?? 0}</p>
          </div>
        ))
      ) : (
        <p className="text-lg">No hay resultados disponibles.</p>
      )}
    </div>
  );
};

export default Resultados;

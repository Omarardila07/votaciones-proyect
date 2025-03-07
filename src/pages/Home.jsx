import { useNavigate } from "react-router-dom";
import img1 from "../Img/imgg.png";
import { useEffect } from "react";
import Welcome from "../iconos/welcome";
import Go from "../iconos/go";

const Home = () => {
  const navigate = useNavigate();

  const irAOtraPagina = () => {
    navigate("/HomeR");
  };

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
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 bg-black text-white overflow-hidden">
      <div className="bubble-container absolute top-0 left-0 w-full h-full pointer-events-none z-0"></div>
      <div className="relative z-10 backdrop-blur-md bg-opacity-50 p-6 rounded-lg w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row gap-3 text-center justify-center items-center">
          <h1 className="text-center font-bold text-4xl sm:text-7xl mb-4">Bienvenidos</h1>
          <Welcome />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-center justify-center items-center w-full">
          <div className="w-full sm:w-1/2">
            <img src={img1} className="w-full h-auto rounded-lg shadow-lg" alt="Elecciones" />
          </div>
          <div className="w-full sm:w-1/2 text-lg sm:text-2xl font-semibold leading-relaxed">
            <h2>
              Bienvenidos a las elecciones de la Institución Educativa César Pompeyo Mendoza
              Hinojosa 2025. Un proceso democrático, transparente y justo, donde cada voto
              cuenta. Que gane el mejor candidato y que esta elección represente la voz de todos.
            </h2>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center w-full mt-6 px-6 py-3 border-2 border-white text-white font-bold text-lg rounded-lg transition duration-300 hover:bg-white hover:text-black cursor-pointer" onClick={irAOtraPagina}>
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

export default Home;

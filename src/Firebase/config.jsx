// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCh5upcVNabew9rI3G3EJ9zCbPewDzX360",
  authDomain: "votaciones-proyect.firebaseapp.com",
  projectId: "votaciones-proyect",
  storageBucket: "votaciones-proyect.appspot.com", // Corrección aquí
  messagingSenderId: "848017664487",
  appId: "1:848017664487:web:04d9b4750d7f4d3a5cf542",
  measurementId: "G-FGQ9DYGT0C"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Base de datos Firestore
const auth = getAuth(app);  // Autenticación
const analytics = getAnalytics(app);  // Analítica

export { app, db, auth, analytics };

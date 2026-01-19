// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvNVowdKlpN-Ub6tgHXwQIFH9aXLK-vUs",
  authDomain: "project-lz-f531c.firebaseapp.com",
  projectId: "project-lz-f531c",
  storageBucket: "project-lz-f531c.firebasestorage.app",
  messagingSenderId: "1055428301737",
  appId: "1:1055428301737:web:23ef42f41dbafd4307eab8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore
const db = getFirestore(app);

// ✍️ Função para postar comentário
export async function postar(texto) {
  if (!texto.trim()) return;

  await addDoc(collection(db, "posts"), {
    texto: texto,
    data: Date.now()
  });
}

// 👁️ Escutar comentários em tempo real
export function ouvirPosts(callback) {
  const q = query(
    collection(db, "posts"),
    orderBy("data", "desc")
  );

  onSnapshot(q, (snapshot) => {
    const lista = [];
    snapshot.forEach((doc) => {
      lista.push(doc.data());
    });
    callback(lista);
  });
}
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5NvLvapX5GS015E0bg5IW2nuzIVTLpyo",
  authDomain: "venda-bem-solucoes.firebaseapp.com",
  projectId: "venda-bem-solucoes",
  storageBucket: "venda-bem-solucoes.appspot.com",
  messagingSenderId: "11778309922",
  appId: "1:11778309922:web:44d40ed843a5f96eacaf7b",
  measurementId: "G-Y6H5VKYKEC",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)
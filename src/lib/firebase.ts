import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_icBCGlh9ILy_ZRjTjmL2aKid_oZZV3A",
  authDomain: "ai-career-coach-bf06f.firebaseapp.com",
  projectId: "ai-career-coach-bf06f",
  storageBucket: "ai-career-coach-bf06f.firebasestorage.app",
  messagingSenderId: "752824946295", 
  appId: "1:752824946295:web:ee3efa743c7f7774a78072" 
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app;

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your_firebase_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ai-career-coach-bf06f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai-career-coach-bf06f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ai-career-coach-bf06f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "752824946295", 
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:752824946295:web:ee3efa743c7f7774a78072" 
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app;

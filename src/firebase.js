// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { query, where, orderBy, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDd3BOTfwY9-F2EfmrDDFxA45P0e9g3irM",
    authDomain: "me-mirror.firebaseapp.com",
    projectId: "me-mirror",
    storageBucket: "me-mirror.firebasestorage.app",
    messagingSenderId: "375440530618",
    appId: "1:375440530618:web:667bcb37b6bead5af4f683",
    measurementId: "G-WZ6NNTYPT8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  export const getTodayPrompt = async () => {
    const res = await fetch("https://memirror-gpt-g48u58f0n-snoopys-projects-b77154e9.vercel.app/api/prompt"); // ← your Vercel URL
    const data = await res.json();
    return data.prompt;
  };
  
  export const saveEntry = async (text) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not logged in');
    const docRef = await addDoc(collection(db, 'entries'), {
      uid: user.uid,
      text,
      date: new Date().toISOString(),
    });
    return docRef.id;
  };
  
  export const getUserEntries = async () => {
    const user = auth.currentUser;
    console.log("getUserEntries() - currentUser:", user);
    if (!user) throw new Error('Not logged in');
  
    const q = query(
      collection(db, 'entries'),
      where('uid', '==', user.uid),
      orderBy('date', 'desc')
    );
  
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Firestore query result:", result);
    return result;
  };

export { auth, db };

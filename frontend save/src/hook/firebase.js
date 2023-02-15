import FirebaseConfig from "../assets/serviceAccountKey.json";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// Initialize Firebase
// const app = initializeApp(FirebaseConfig);
// export const firestore = getFirestore(app)

const useFirebase = () => {
  initializeApp(FirebaseConfig);
};
export default useFirebase;
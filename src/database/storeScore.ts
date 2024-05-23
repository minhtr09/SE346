import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const addScoreToFirebase = async (score) => {
    try {
      const scoresCollection = collection(FIRESTORE_DB, "db_scores"); 
      const newScoreDoc = await addDoc(scoresCollection, {
        score, // Store the score in the document
        // Can add other fields
      });
      console.log("Score added to Firestore with ID:", newScoreDoc.id);
    } catch (error) {
      console.error("Error adding score to Firestore:", error);
    }
  };
import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase_config";

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
): Promise<void> => {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionName);

    // Add the document to the collection
    await addDoc(collectionRef, data);

    console.log("Document added successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

import { DocumentData, WithFieldValue, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase_config";

export const updateDocument = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> => {
  try {
    const docRef = doc(db, `${collectionName}/${docId}`);

    await setDoc(docRef, data, { merge: true });

    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

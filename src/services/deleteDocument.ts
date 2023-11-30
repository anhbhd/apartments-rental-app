import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase_config";

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);

    await deleteDoc(docRef);

    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

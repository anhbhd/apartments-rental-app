import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase_config";

export const getDocument = async <T>(collectionName: string, id: string) => {
  try {
    let snapshotData = await getDoc(doc(db, `${collectionName}/${id}`));

    // Check if data exists before spreading
    const data = snapshotData.exists()
      ? { ...snapshotData.data(), id: snapshotData.id }
      : null;

    return data as T;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase_config";

export async function getDataCollection<T>(
  collectionName: string
): Promise<[T[], number]> {
  const collectionRef = collection(db, collectionName);
  let dataList: T[] = [];

  try {
    const dataSnapshot = await getDocs(collectionRef);
    if (dataSnapshot) {
      dataSnapshot.docs.forEach((doc) => {
        dataList.push({
          ...(doc.data() as T),
          id: doc.id as string,
        });
      });
    }
    const totalItem: number = dataSnapshot.size;
    return [dataList, totalItem];
  } catch (error) {
    console.error("Error getting data collection:", error);
    throw error;
  }
}

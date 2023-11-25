import { DocumentData, QuerySnapshot } from "firebase/firestore";

export function mapCollectionToArrayObject<T>(
  snapshot: QuerySnapshot<DocumentData, DocumentData>
): T[] {
  const arrayResult: T[] = [];
  snapshot.docs.forEach((doc) =>
    arrayResult.push({
      ...(doc.data() as T),
      id: doc.id as string,
    })
  );
  return arrayResult;
}

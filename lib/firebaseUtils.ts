import { collection, query, orderBy, limit, getDocs, updateDoc, Timestamp, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Blog {
  id: string;
  title: string;
  author: string;
  post: string;
  img: string;
  date?: Timestamp | null;
}

// export const addNewBlog = async (blog: { title: string; author: string; post: string; img: string }) => {
//   await addDoc(collection(db, "blogs"), {
//     ...blog,
//     date: serverTimestamp(),
//   });
// };

const backfillDates = async () => {
  const blogsRef = collection(db, "blogs");
  const querySnapshot = await getDocs(blogsRef);

  querySnapshot.docs.forEach(async (doc) => {
    if (!doc.data().date) {
      await updateDoc(doc.ref, { date: serverTimestamp() });
      console.log(`Backfilled date for document with ID: ${doc.id}`);
    }
  });

  console.log("Backfilling complete");
};

const executeBackfill = async () => {
  await backfillDates();
};

executeBackfill()
  .then(() => console.log("Backfill complete"))
  .catch((error) => console.error("Error during backfill:", error));


export const fetchVideos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tipsvideos"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const fetchTeam = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "team"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching team data:", error);
    throw error;
  }
};

export const fetchLatestBlogs = async (): Promise<Blog[]> => {
  try {
    const blogsRef = collection(db, "blogs");
    const blogsQuery = query(blogsRef, orderBy("date", "desc"), limit(2));
    const querySnapshot = await getDocs(blogsQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        author: data.author || "",
        post: data.post || "",
        img: data.img || "",
        date: data.date instanceof Timestamp ? data.date : (undefined as Timestamp | undefined),
      };
    });
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    throw new Error("Failed to fetch blogs.");
  }
};
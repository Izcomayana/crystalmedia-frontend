import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

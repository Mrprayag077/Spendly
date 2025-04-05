import { database, signOut } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, update } from "firebase/database";

export const fetchSeatsData = async () => {
  try {
    const database = getDatabase();
    const seatsRef = ref(database, "/seats");
    const snapshot = await get(seatsRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No seats data available!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching seats data:", error);
    return null;
  }
};

export const updateSeatsInFirebase = async (updatedSeats: any[]) => {
  try {
    const updates: Record<string, any> = {};

    updatedSeats.forEach((seat) => {
      updates[`seats/${seat.id}`] = seat;
    });

    await update(ref(database, "/"), updates);
    console.log("Seats updated successfully in Firebase!");
  } catch (error) {
    console.error("Error updating seats in Firebase:", error);
  }
};

export const handleLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

import "server-only";
import { adminDb } from "@/app/lib/firebaseAdmin";
import { Trip } from "./trips";

/**
 * Fetch a single trip by slug and userId for security
 */
export async function getTripBySlug(userId: string, slug: string): Promise<Trip | null> {
  try {
    const snapshot = await adminDb
      .collection("trips")
      .where("userId", "==", userId)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      destination: data.destination || undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
      description: data.description || undefined,
    };
  } catch (error) {
    console.error("Error fetching trip by slug:", error);
    return null;
  }
}

export async function deleteTripBySlug(userId: string, slug: string): Promise<boolean> {
  try {
    const snapshot = await adminDb
      .collection("trips")
      .where("userId", "==", userId)
      .where("slug", "==", slug)
      .limit(1)
      .get(); 
    if (snapshot.empty) {
      return false;
    }
    const doc = snapshot.docs[0];
    await doc.ref.delete();
    return true;
  } catch (error) {
    console.error("Error deleting trip by slug:", error);
    return false;
  }
}

export async function getTripsByUserId(userId: string): Promise<Trip[]> {
  try {
    const snapshot = await adminDb
      .collection("trips")
      .where("userId", "==", userId)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        destination: data.destination || undefined,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
        description: data.description || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching trips by user ID:", error);
    return [];
  }
}
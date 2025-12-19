import { adminDb } from "@/app/lib/firebaseAdmin"


export interface Trip {
    id: string,
    title: string,
    slug: string,
    destination?: string,
    startDate?: string;
    endDate?: string;
    description?: string;
    
}

export async function getUserTrips(userId:string): Promise<Trip[]> {
"server only"
    try {
        const tripsRef = adminDb.collection("trips");

        const snapshot = await tripsRef
            .where("userId", "==", userId)
            .orderBy("createdAt", "desc")
            .get();

        const trips: Trip[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data() as Omit<Trip, "id"> & { createdAt?: Date };
            trips.push({
                id: doc.id,
                title: data.title,
                slug: data.slug,
                destination: data.destination || undefined,
                startDate: data.startDate || undefined,
                endDate: data.endDate || undefined,
                description: data.description || undefined,
            });
        });
    return trips;
    } catch (error) {
        console.error("Error fetching your trips: ", error);
        return [];
        
    }
    
}
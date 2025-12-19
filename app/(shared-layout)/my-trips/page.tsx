import { verifySession } from "@/app/lib/session";
import { TripCard } from "@/components/web/TripCard";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTripsByUserId } from "./trip-helper";



export default async function MyTripsPage() {
    const user = await verifySession()
    
    // console.log("user: ", user)
    if(!user) {
        redirect("/login")
    }    

    const trips = await getTripsByUserId(user.uid);

    return (
        
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold capitalize">Welcome, {user?.name}</h1>
                <Link href="/my-trips/new-trip">
                    <Button>Create New Trip</Button>
                </Link>
            </div>

            {trips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            slug={trip.slug}
                            title={trip.title}
                            destination={trip.destination}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                            description={trip.description}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center mt-78">
                    <p className="text-xl text-gray-600 mb-4">You don{"'"}t have any trips yet</p>
                    <Link href="/my-trips/new-trip">
                        <Button size="lg">Create Your First Trip</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
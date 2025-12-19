import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { getTripBySlug } from "../trip-helper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TripPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const user = await verifySession();
  if (!user) redirect("/login");

  const { slug } = await params;
  const trip = await getTripBySlug(user.uid, slug);

  if (!trip) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
        <Link href="/my-trips">
          <Button>Back to My Trips</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href="/my-trips" className="text-blue-600 hover:underline mb-4 block">
        ← Back to My Trips
      </Link>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
        
        {trip.destination && (
          <p className="text-lg text-gray-600 mb-4">📍 {trip.destination}</p>
        )}

        {(trip.startDate || trip.endDate) && (
          <p className="text-sm text-gray-500 mb-6">
            📅 {trip.startDate} {trip.endDate && `- ${trip.endDate}`}
          </p>
        )}

        {trip.description && (
          <div className="prose max-w-none mb-6">
            <p>{trip.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}


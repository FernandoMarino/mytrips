interface TripIdPageProps {
    params: Promise<{ tripId: string }>;
}

export default async function TripPage({ params }: TripIdPageProps) {
    const { tripId } = await params;
    return (
        <div>
            <h1>Hello from Trip Page</h1>
            <p>Trip ID: {tripId}</p>
        </div>
    );
}

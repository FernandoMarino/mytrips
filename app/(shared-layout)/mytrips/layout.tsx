export default function MyTripsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>Hello from My Trips Layout</h1>
            { children }
        </div>
    );
}

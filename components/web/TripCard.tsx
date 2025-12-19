import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

interface TripCardProps {
    id: string;
    slug: string;
    title: string;
    destination?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export function TripCard({ slug, title, destination, startDate, endDate, description }: TripCardProps) {
    return (
        <Card className="flex flex-col relative">
            <CardHeader className="flex items-start justify-between gap-2">
                <div>
                    <CardTitle>{title}</CardTitle>
                    {destination && <CardDescription>{destination}</CardDescription>}
                </div>
                <div className="ml-2">
                    <Link href={`/my-trips/${slug}/edit`} aria-label="Edit trip">
                        <Button size="sm" variant="ghost" className="p-2">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="grow flex flex-col">
                <div className="grow">
                    {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
                    {(startDate || endDate) && (
                        <p className="text-xs text-gray-500 mb-4">
                            {startDate} {endDate && `- ${endDate}`}
                        </p>
                    )}
                </div>
                <Link href={`/my-trips/${slug}`} className="w-full">
                    <Button variant="outline" className="w-full">View Trip</Button>
                </Link>
            </CardContent>
        </Card>
    );
}
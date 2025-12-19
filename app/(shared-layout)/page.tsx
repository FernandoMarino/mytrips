import Link from "next/link";
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await verifySession();
    if (user) redirect("/my-trips");

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-2xl p-8">
                <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-blue-500">my</span><span className="text-red-400">Trips</span><span className="text-blue-500">Plan</span></h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Plan and organize your trips — save destinations, dates and notes.
                    Create an account to start adding trips or log in if you already have one.
                </p>

                <div className="flex items-center justify-center gap-4">
                    <Link href="/sign-up">
                        <Button>Create Account</Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

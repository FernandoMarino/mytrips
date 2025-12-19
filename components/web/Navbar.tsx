import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toogle";
import { verifySession } from "@/app/lib/session";
import { handleLogout } from "@/app/(auth)/actions";


export async function Navbar() {
    const user = await verifySession();

    return (
        <nav className="w-full py-5 flex items-center justify-between ">
            <div className="flex items-center w-full gap-8 justify-between">
                <div>
                    <Link className="flex items-center" href="/">
                        {/* <Image src={logoMyTrips} width={150} alt="logoMyTrips" /> */}
                        <h1 className="text-3xl font-bold text-red-400 ">
                            my<span className="text-blue-500">Trips</span>Plan
                        </h1>
                    </Link>
                </div>
                
                <div className="flex items-center gap-2 ">
                    {/* <Link
                        className={buttonVariants({ variant: "ghost" })}
                        href="/"
                    >
                        Home
                    </Link> */}
                    {/* <Link
                        className={buttonVariants({ variant: "ghost" })}
                        href="/my-trips"
                    >
                        My Trips
                    </Link> */}
                    
                </div>
                {user ? (
                    <div className="flex items-center gap-2 ">
                        <span className="text-sm font-medium">
                            {user.email}
                        </span>
                        <form action={handleLogout}>
                            <button
                                className={buttonVariants({
                                    variant: "default",
                                })}
                            >
                                Logout
                            </button>
                        </form>
                        <ThemeToggle />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link className={buttonVariants()} href="/sign-up">
                            Create Account
                        </Link>
                        <Link
                            className={buttonVariants({ variant: "outline" })}
                            href="/login"
                        >
                            Login
                        </Link>
                        <ThemeToggle />
                    </div>
                )}
            </div>
        </nav>
    );
}

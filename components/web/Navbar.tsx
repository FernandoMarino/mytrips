import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toogle";
import Image from "next/image";
import logoMyTrips from "@/public/mytrips-logo.png"

export function Navbar () {
    return (
    <nav className="w-full py-5 flex items-center justify-between ">
        <div className="flex items-center gap-8">
            <Link className="flex items-center" href="/">
                {/* <Image src={logoMyTrips} width={150} /> */}
                <h1 className="text-3xl font-bold text-red-400 ">my<span className="text-blue-500">Trips</span>Plan</h1>
            </Link>

            <div className="flex items-center gap-2">
                <Link className={buttonVariants({variant:"ghost"})} href="/">Home</Link>
                <Link className={buttonVariants({variant:"ghost"})} href="/mytrips">My Trips</Link>
                <Link className={buttonVariants({variant:"ghost"})} href="/blog">Blog</Link>
                <Link className={buttonVariants({variant:"ghost"})} href="/create">Create</Link>
                
            </div>
            

        </div>
        <div className="flex items-center gap-2">
            <Link className={buttonVariants()} href="/auth/sign-up">Create Account</Link>
            <Link className={buttonVariants({variant: "outline"})} href="/auth/login">Login</Link>
            <ThemeToggle />
        </div>
        
    </nav>

    )
}
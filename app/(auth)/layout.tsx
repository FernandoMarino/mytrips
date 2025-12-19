"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }){
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm md:max-w-md mx-auto">

                    <div className="flex justify-between mb-5">
                        <Link href="/" className={buttonVariants({variant: "secondary"})}>
                            <ArrowLeft className="size-4"/>
                            Go Back
                        </Link>
                        <Link href={isLoginPage ? "/sign-up" : "/login"} className={buttonVariants({variant: "default"})} >
                            {isLoginPage ? "Sign Up" : "Login"}
                        </Link>
                    </div>
                    {children}
                </div>
        </div>
    )

}
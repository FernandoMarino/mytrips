import "server-only";
import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth } from "./firebaseAdmin";


export async function createSession(idToken: string) {
    const expiresIn = 60 * 60 * 24 * 1 * 1000;
    
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        expires: new Date(Date.now() + expiresIn),
    });
    
}

export async function removeSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

export async function verifySession(): Promise<DecodedIdToken | null> {
    console.log("Inicio verifySession");
    


    const cookieStore = await cookies();
    console.log("cookieStore criado com sucesso:");

    const sessionCookie = cookieStore.get("session")?.value;
    console.log("sessionCookie criado com sucesso:");

    if (!sessionCookie) return null;

    try {
        
        console.log("Inicio verifySessionCookie:");
        const decodeClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
    



        return decodeClaims;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Erro Desconhecido:", error);
        }
        console.error("Session verification failed:", error);
        return null;
    }
}

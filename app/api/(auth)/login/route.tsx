
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("Login API Route");

        const { email, password } = await request.json();

        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
        const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        const res = await fetch(authUrl, {
            method: "POST",
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log("resposta da API AuthURL:", data);

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error?.message || "Erro de login" },
                { status: 401 }
            );
        }

        // Return idToken to server action, which will create the session
        return NextResponse.json({
            success: true,
            idToken: data.idToken,
            email: data.email,
            uid: data.localId,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("API Route Error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

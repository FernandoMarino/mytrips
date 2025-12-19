import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("Login API Route");

        console.log(
            "Private key length:",
            process.env.FIREBASE_PRIVATE_KEY?.length
        );
        console.log(
            "Private key starts with:",
            process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30)
        );
        console.log(
            "Private key ends with:",
            process.env.FIREBASE_PRIVATE_KEY?.slice(-30)
        );

        const { email, password } = await request.json();

        const apiKey = process.env.FIREBASE_API_KEY;

        console.log("apiKey",apiKey);
        
        const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        const res = await fetch(authUrl, {
            method: "POST",
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error?.message || "Erro de login" },
                { status: 401 }
            );
        }

        // Retorna o idToken para o server action ou para quem chamar a funcao POST da API
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

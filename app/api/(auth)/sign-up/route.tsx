// import { admin } from "@/app/lib/firebaseAdmin";
import { adminAuth, adminDb } from "@/app/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";

export async function POST(request: NextRequest) {
    try {
        console.log("Sign-Up API Route");

        const { userName, email, password } = await request.json();

        
        const user = await adminAuth.createUser({
            email,
            password,
            displayName: userName,
        });

        await adminDb.collection("users").doc(user.uid).set({
            userName: user.displayName,
            email: user.email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return NextResponse.json({ success: true, uid: user.uid });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("API Route Error:",error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

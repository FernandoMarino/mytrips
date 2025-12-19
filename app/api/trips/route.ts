import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/session";
import { adminDb } from "@/app/lib/firebaseAdmin";
import { generateSlug } from "@/app/api/trips/slug";

export async function POST(request: NextRequest) {
  try {
    const user = await verifySession();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { title, destination, startDate, endDate, description } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = generateSlug(title);
    const docRef = await adminDb
      .collection("trips")
      .add({
        title,
        slug,
        destination: destination || null,
        startDate: startDate || null,
        endDate: endDate || null,
        description: description || null,
        userId: user.uid,
        createdAt: new Date(),
      });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Create trip error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

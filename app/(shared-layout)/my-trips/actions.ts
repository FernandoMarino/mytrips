"use server";

import { verifySession } from "@/app/lib/session";
import { adminDb } from "@/app/lib/firebaseAdmin";
import { redirect } from "next/navigation";
import z, { flattenError } from "zod";
import { generateSlug } from "@/app/api/trips/slug";

//   Criação do schema de validação do formulário utilizando zod
const tripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export async function createTrip(formData: FormData) {
  const user = await verifySession();
  if (!user) redirect("/login");
  const values = {
    title: formData.get("title")?.toString() ?? "",
    destination: formData.get("destination")?.toString() || null,
    startDate: formData.get("startDate")?.toString() || null,
    endDate: formData.get("endDate")?.toString() || null,
    description: formData.get("description")?.toString() || null,
  };

    //   Aplica validação de formulários utilizando o tripSchema como validador
  const validated = tripSchema.safeParse(values);
  if (!validated.success) {
    const flatErrors = flattenError(validated.error);
    return {
      success: false,
      values,
      fieldErrors: flatErrors.fieldErrors,
      formErrors: flatErrors.formErrors || [],
    };
  }

  const { title, destination, startDate, endDate, description } = validated.data;
  const slug = generateSlug(title);

  await adminDb
    .collection("trips")
    .add({
      title,
      slug,
      destination,
      startDate,
      endDate,
      description,
      userId: user.uid,
      createdAt: new Date(),
    });

  redirect("/my-trips");
}

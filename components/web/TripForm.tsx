"use client";

import { createTrip } from "@/app/(shared-layout)/my-trips/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";

type NewTripFormData = {
  success: boolean;
  values: {
    title: string;
    destination: string | null;
    startDate: string | null;
    endDate: string | null;
    description: string | null;
  };
  fieldErrors: Record<string, string[]>;
  formErrors: string[];
};

export default function TripForm() {
  const [, formAction] = useActionState(
    async (_prevState: NewTripFormData, formData: FormData) => {
      const result = await createTrip(formData);
      return result;
    },
    {
      success: false,
      values: {
        title: "",
        destination: null,
        startDate: null,
        endDate: null,
        description: null,
      },
      fieldErrors: {},
      formErrors: [],
    }
  );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Create New Trip</h1>
      <p className="text-gray-600 mb-8">Plan and organize your next adventure</p>

      <form action={formAction} method="post">
        <FieldGroup>
          <Field>
            <FieldLabel>Trip Title</FieldLabel>
            <FieldDescription>
              Give your trip a memorable name
            </FieldDescription>
            <Input
              name="title"
              placeholder="e.g., Summer in Europe"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Destination</FieldLabel>
            <FieldDescription>
              Where are you going?
            </FieldDescription>
            <Input
              name="destination"
              placeholder="e.g., Paris, France"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel>Start Date</FieldLabel>
              <FieldDescription>
                When does your trip begin?
              </FieldDescription>
              <Input name="startDate" type="date" />
            </Field>

            <Field>
              <FieldLabel>End Date</FieldLabel>
              <FieldDescription>
                When does your trip end?
              </FieldDescription>
              <Input name="endDate" type="date" />
            </Field>
          </div>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <FieldDescription>
              Add details about your trip
            </FieldDescription>
            <textarea
              name="description"
              placeholder="Describe your trip, activities, accommodations, etc."
              rows={5}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </Field>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Create Trip</Button>
            <Link href="/my-trips">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

"use client";

import { handleSignUp } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export type SignUpState = {
  success: boolean;
  error: string | null;
  values?: { userName: string; email: string; password: string };
  fieldErrors?: { userName?: string[]; email?: string[]; password?: string[] };
  formErrors?: string[];
};


export function SignUpForm() {
    const [state, action] = useActionState<
            SignUpState, // tipo do estado
            FormData // tipo do segundo argumento
        >(handleSignUp, {
        error: null,
        success: false,
        values: undefined,
        fieldErrors: undefined,
    });

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="mb-2">
                    <span className="text-2xl">Welcome to </span>
                    <h2 className="inline text-2xl font-bold text-red-400 ">
                        my<span className="text-blue-500">Trips</span>Plan
                    </h2>
                </CardTitle>
                <CardDescription>
                    Please create an account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Username</FieldLabel>
                            <Input
                                name="userName"
                                defaultValue={state?.values?.userName}
                                placeholder="John Doe"
                                type="text"
                                aria-invalid={
                                    state?.fieldErrors?.userName?.length ? true : false
                                }
                            />
                            {state?.fieldErrors?.userName && (
                                <FieldError>
                                    {state?.fieldErrors.userName}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <FieldDescription>
                                Example: john@doe.com
                            </FieldDescription>
                            <Input
                                name="email"
                                defaultValue={state?.values?.email}
                                placeholder=""
                                type="email"
                                aria-invalid={
                                    state?.fieldErrors?.email?.length ? true : false
                                }
                            />
                            {state?.fieldErrors?.email && (
                                <FieldError>
                                    {state?.fieldErrors.email}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <FieldDescription>
                                Must have at least 6 characters
                            </FieldDescription>
                            <Input
                                name="password"
                                defaultValue={state?.values?.password}
                                placeholder=""
                                type="password"
                                aria-invalid={
                                    state?.fieldErrors?.password?.length ? true : false
                                }
                            />

                            {state?.fieldErrors?.password && (
                                <FieldError>
                                    {state?.fieldErrors.password}
                                </FieldError>
                            )}
                        </Field>
                        <Button>Sign Up</Button>
                        {state.success && (
                            <p className="text-green-600 text-center">
                                Account created successfully! Redirecting to
                                login...
                            </p>
                        )}
                        {state.error && (
                            <p className="text-red-600 text-center">
                                {state.error}
                            </p>
                        )}
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

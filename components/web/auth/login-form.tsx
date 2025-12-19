"use client";

import { handleLogin } from "@/app/(auth)/actions";
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

export type LoginState = {
    error: string | null;
    success?: boolean;
    values?: { email?: string; password?: string };
    fieldErrors?: {
        email?: string[];
        password?: string[];
    };

    formErrors?: string[];
};

export function LoginForm() {
    const [state, action, isPending] = useActionState<
        LoginState, // tipo do estado
        FormData // tipo do segundo argumento
    >(handleLogin, {
        error: null,
        success: false,
        values: { email: "", password: "" },
        fieldErrors: { email: [], password: [] },
        formErrors: [],
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
                <CardDescription>Please log into your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action} method="POST">
                    <FieldGroup>
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
                                    state?.fieldErrors?.email?.length? true : false
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
                        <Button
                            disabled={isPending}
                            className={`${
                                isPending ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            Login
                        </Button>
                        {state.success && (
                            <p className="text-green-600 text-center">
                                Login is successfully! Redirecting to My Trips...
                            </p>
                        )}
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}

"use server";

import z from "zod";
import { loginSchema, signUpSchema } from "../schemas/auth";
import { redirect } from "next/navigation";
import { SignUpState } from "@/components/web/auth/sign-up-form";
import { LoginState } from "@/components/web/auth/login-form";
import { createSession, removeSession } from "@/app/lib/session";

export async function handleSignUp(
    
    prevState: SignUpState,
    formData: FormData
): Promise<SignUpState> {
    // 1. Validate fields
    console.log(`Start of signUp function`);

    const userNameInput = formData.get("userName")?.toString() || "";
    const emailInput = formData.get("email")?.toString() || "";
    const passwordInput = formData.get("password")?.toString() || "";

    const validatedResults = signUpSchema.safeParse({
        userName: userNameInput,
        email: emailInput,
        password: passwordInput,
    });
    console.log(`Signup form fields validated`);

    if (!validatedResults.success) {
        console.log(`Erro de form`);
        const flatErrors = z.flattenError(validatedResults.error);

        return {
            success: false,
            error: "Validation failed",
            values: {
                userName: userNameInput,
                email: emailInput,
                password: passwordInput,
            },
            fieldErrors: flatErrors.fieldErrors,
            formErrors: flatErrors.formErrors,
        };
    }

    // 2. Create user via POST request

    const { userName, email, password } = validatedResults.data;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

    console.log(`baseUrl: ${baseUrl}`);


    const res = await fetch(`${baseUrl}/api/sign-up`, {
        method: "POST",
        body: JSON.stringify({ userName, email, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const data = await res.json();
        console.log("Server Action Response 1", data);
        console.error("Server Action Response 2", data.error);
        return {
            error: data.error,
            success: false,
            values: { userName, email, password },
            fieldErrors: {},
            formErrors: [],
        };
    }
    // 3. Redirect to Login

    redirect("/login");
}

export async function handleLogin(prevState: LoginState, formData: FormData) {
    console.log(`Start of login function`);

    const validatedResults = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log(`Login form fields validated`);

    if (!validatedResults.success) {
        console.log(
            `Erro de form`,
            z.flattenError(validatedResults.error).fieldErrors
        );

        return {
            success: false,
            error: null,
            values: Object.fromEntries(formData.entries()),
            ...z.flattenError(validatedResults.error),
            formErrors: [],
        };
    }

    const { email, password } = validatedResults.data;

// Cria base URL para chamar rota login, sem chamar localhost

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

    console.log(`baseUrl: ${baseUrl}`);
    // Call the login API route to authenticate with Firebase
    const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const data = await res.json();
        console.log("Login API Response", data);
        return {
            error: data.error || "Erro de login",
            success: false,
            values: { email, password },
            fieldErrors: {},
            formErrors: [],
        };
    }

    const { idToken } = await res.json();

    // Create session cookie server-side from the returned idToken
    await createSession(idToken);

    // On successful login, redirect the user to the protected area
    redirect("/my-trips");

    return {
        error: null,
        success: true,
        values: { email, password },
        fieldErrors: {},
        formErrors: [],
    };
}

export async function handleLogout() {
    console.log("Start of logout function");
    await removeSession();
    redirect("/");
}
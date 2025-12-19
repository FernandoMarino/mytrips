import z from "zod"
export const signUpSchema = z.object({
    userName: z.string().min(3, { message: "Username must have a minimum of 3 characters" }).max(50, {message: "Name must have a maximum of 50 characters"}),
    email: z.email(),
    password: z.string().min(6, "Password must have at least 6 characters"),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})
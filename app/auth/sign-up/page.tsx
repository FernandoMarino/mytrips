'use client';

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(){
        console.log("yoooo")

    }
    

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="mb-2"><span className="text-2xl">Welcome to </span><h2 className="inline text-2xl font-bold text-red-400 ">my<span className="text-blue-500">Trips</span>Plan</h2></CardTitle>
                <CardDescription>
                    Please create an account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller 
                            name="name" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="John Doe" type="text" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="john@doe.com" type="email" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="******" type="password" {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                        <Button>Sign Up</Button>
                    </FieldGroup>
                    
                    
                </form>
            </CardContent>
        </Card>
    );
}

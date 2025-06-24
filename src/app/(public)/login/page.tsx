"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setGlobalError(""); // Clear previous errors
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...values,
      });

      if (result?.error) {
         setGlobalError("Erro ao fazer login. Tente novamente.");
        return;
      }

      router.push("/vagas/minhas-vagas");
      router.refresh();
    } catch (error) {
      setGlobalError("Ocorreu um erro inesperado. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Card className="w-full max-w-md m-auto mt-16 md:mt-24">
        <CardHeader>
          <img
            src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
            className="max-h-28 mb-3"
            alt="Shadcn UI Navbar"
          />
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite o e-mail"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button will go here */}
              <LoadingButton pending={form.formState.isSubmitting} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

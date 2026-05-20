"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../../lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setGlobalError("");
    try {
      const result = await signIn("credentials", { redirect: false, ...values });
      if (result?.error) {
        setGlobalError("E-mail ou senha incorretos. Tente novamente.");
        return;
      }
      router.push("/vagas/minhas-vagas");
      router.refresh();
    } catch {
      setGlobalError("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">VF</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h1>
          <p className="text-sm text-slate-500 mt-1">Entre na sua conta para continuar</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          {globalError && <ErrorMessage error={globalError} />}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm font-medium">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        autoComplete="off"
                        className="border-slate-200 focus:border-blue-950 focus:ring-blue-950/20"
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
                    <FormLabel className="text-slate-700 text-sm font-medium">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="border-slate-200 focus:border-blue-950 focus:ring-blue-950/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton pending={form.formState.isSubmitting} />
            </form>
          </Form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Não tem conta?{" "}
          <Link href="/register" className="text-blue-950 font-medium hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}

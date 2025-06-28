"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/app/actions/jobs-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Job } from "@/types/Job";

const requiredMessage = "Campo obrigatório*";

const formSchema = z.object({
  position: z.string({ required_error: requiredMessage }),
  type: z.enum(["FIXO", "FREELANCER"]),
  date: z
    .date({ required_error: "Data é obrigatória" })
    .transform((val) => val.toISOString().split("T")[0]),
  dailyValue: z
    .string({ required_error: requiredMessage })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 50, {
      message: "Valor mínimo de R$30,00",
    }),
  taxValues: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Valor inválido" })
    .optional(),
  startTime: z
    .string({ required_error: requiredMessage })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora inválida" }),
  endTime: z
    .string({ required_error: requiredMessage })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora inválida" }),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter no mínimo 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterJobPage() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "FREELANCER",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const response = await createJob(values as Job);
    if (response.error || response.status != 201) {
      toast.error(response.message);
      return;
    }

    toast.success("Vaga cadastrada com sucesso!");
    router.push("/vagas/minhas-vagas");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto lg:w-1/2 flex flex-col gap-3 rounded-lg shadow-2xl p-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl py-2 font-semibold">Cadastrar Nova Vaga</h2>
        </div>
        <Separator className="my-2.5" />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaga</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="motoboy">Moto entregador</SelectItem>
                      <SelectItem value="sushiman">Sushiman</SelectItem>
                      <SelectItem value="balconista">Balconista</SelectItem>
                      <SelectItem value="pizzaiolo">Pizzaiolo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  name="type"
                  defaultValue={form.getValues("type")}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seelcione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="FREELANCER">FREELANCER</SelectItem>
                      <SelectItem value="FIXO">FIXO</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-between pt-1">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione a data desejada</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2025-05-08")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dailyValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Diária</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={5}
                    placeholder="30,00"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxValues"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Taxas (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="30,00"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Hora ínicio</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="text-md font-normal focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="10:00" />
                      <div className="flex-1 ml-2">
                        <Clock size={14} />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <ScrollArea className="h-[15rem]">
                        {Array.from({ length: 96 }).map((_, i) => {
                          const hour = Math.floor(i / 4)
                            .toString()
                            .padStart(2, "0");

                          const minute = ((i % 4) * 15)
                            .toString()
                            .padStart(2, "0");
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
                              {hour}:{minute}
                            </SelectItem>
                          );
                        })}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Hora fim</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="text-md font-normal focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="18:00" />
                      <div className="flex-1 ml-2">
                        <Clock size={14} />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <ScrollArea className="h-[15rem]">
                        {Array.from({ length: 48 }, (_, i) => {
                          const hour = String(Math.floor(i / 2)).padStart(
                            2,
                            "0"
                          );
                          const minute = i % 2 === 0 ? "00" : "30";
                          const time = `${hour}:${minute}`;
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          );
                        })}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full col-span-2">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva em algumas palavras as atividades pertinentes a vaga ofertada."
                    className="h-24 resize-none bg-blue-50/40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between mt-4">
          <Button asChild variant="secondary">
            <Link href="/vagas/minhas-vagas" className="">
              Cancelar
            </Link>
          </Button>
          <Button
            type="submit"
            // disabled={!form.formState.isValid}
          >
            Publicar
          </Button>
        </div>
      </form>
    </Form>
  );
}

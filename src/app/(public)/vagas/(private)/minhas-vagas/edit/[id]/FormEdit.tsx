"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, formatDate } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Clock } from "lucide-react";
import Link from "next/link";
import ModalCloseJob from "@/components/modal-close-job";
import { ptBR } from "date-fns/locale/pt-BR";
import { editJob } from "@/app/actions/jobs-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Job } from "@/types/Job";

const formSchema = z.object({
  position: z.string(),
  type: z.enum(["FIXO", "FREELANCER"]),
  date: z.string({ message: "Job é obrigatória" }),
  dailyValue: z
    .number()
    .min(40, { message: "Valor deve ser maior que R$ 40,00" }),
  taxValues: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Valor inválido" })
    .optional(),
  startTime: z.string(),
  endTime: z.string(),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter no mínimo 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const FormEdit = ({ job }: { job: Job }) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "FREELANCER",
      dailyValue: 40,
    },
    values: {
      position: job?.position,
      type: job?.type as "FIXO" | "FREELANCER",
      date: job?.date,
      dailyValue: job?.dailyValue ? Number(job.dailyValue) : 0,
      taxValues: job?.taxValues ? job.taxValues : undefined,
      startTime: job?.startTime,
      endTime: job?.endTime,
      description: job?.description,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted with values:", values);
    const response = await editJob(Number(job?.id), values as Job);
    console.log("Response from editJob:", response);
    if (response.error) {
      toast.error(response.message || "Erro ao editar vaga");
      return;
    }
    toast.success("Vaga editada com sucesso!");
    router.push("/vagas/minhas-vagas");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto lg:w-1/2 flex flex-col gap-3 rounded-md shadow-2xl p-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl py-2 font-semibold">
            EDITAR VAGA - {job?.id}
          </h2>
          <ModalCloseJob jobId={Number(job.id)} />
        </div>

        <hr className="border-2 my-2" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vaga</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  defaultValue={field.value}
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
                <FormLabel>Job</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        defaultValue={field.value}
                        onChange={field.onChange}
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? formatDate(new Date(field.value), "dd/MM/yyyy", {
                              locale: ptBR,
                            })
                          : "Selecione uma job"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(selectedDay) => {
                        if (field.value === selectedDay?.toISOString()) {
                          return;
                        }
                        field.onChange(
                          selectedDay ? selectedDay.toISOString() : null
                        );
                      }}
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
                    value={field.value}
                    type="number"
                    step={5}
                    placeholder="30,00"
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    defaultValue={field.value}
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
                    defaultValue={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="text-md font-normal focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="10:00" />
                      <div className="flex-1 ml-4">
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
                    defaultValue={field.value}
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
                    defaultValue={field.value}
                    placeholder="Descreva em algumas palavras as atividades pertinentes a vaga ofertada."
                    className="h-24 resize-none bg-blue-50/40"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <hr className="border-2 my-2" />

        {/* if there is a button in form, it will close the modal */}
        <div className="flex justify-between mt-4">
          <Button asChild variant="secondary">
            <Link href="/vagas/minhas-vagas" className="">
              Cancelar
            </Link>
          </Button>

          <div className="flex flex-col gap-1">
            <span className="text-sm">
              Publicado em:{" "}
              {formatDate(job?.createdAt as string, "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </span>
            <span className="text-sm">
              Última edição:{" "}
              {formatDate(job?.updatedAt as string, "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </span>
          </div>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEdit;

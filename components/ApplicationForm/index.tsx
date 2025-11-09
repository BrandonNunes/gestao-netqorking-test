"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome must be at least 3 characters.")
    .max(100, "Nome must be at most 100 characters."),
  email: z
    .email("Email must be a valid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),
  empresa: z
    .string()
    .min(3, "Empresa must be at least 3 characters.")
    .max(100, "Empresa must be at most 100 characters."),
  motivo_participacao: z
    .string()
    .min(20, "Motivo de participação must be at least 20 characters.")
    .max(100, "Motivo de participação must be at most 100 characters."),
});

export default function ApplicationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      empresa: "",
      motivo_participacao: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Solicitação enviada com sucesso!");
          form.reset();
        } else {
          return res.json().then((json) => {
            toast.error(json.message, { position: "top-right" });
          });
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);

        toast.error("Erro de conexão. Tente novamente.");
      });
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="nome"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input
                  {...field}
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  required
                  placeholder="exemplo@dominio.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="empresa"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="empresa">Empresa</FieldLabel>
                <Input
                  {...field}
                  id="empresa"
                  type="text"
                  placeholder="Sua empresa"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="motivo_participacao"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="motivo_participacao">
                  Por que você quer participar?
                </FieldLabel>
                <Textarea
                  {...field}
                  id="motivo_participacao"
                  placeholder="..."
                  rows={4}
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-end mt-4">
        <Button type="submit" className="cursor-pointer">
          Enviar
        </Button>
      </div>
    </form>
  );
}

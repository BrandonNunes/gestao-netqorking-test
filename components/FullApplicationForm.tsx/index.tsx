"use client";

import { Application } from "@/lib/generated/prisma/browser";
import Link from "next/link";
import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { formatBRPhone, formatCpfCnpj } from "@/utils/masks";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  id_intencao: z.number("ID da intenção é obrigatório").int().positive(),
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
  telefone: z
    .string()
    .min(10, "Telefone must be at least 10 characters.")
    .max(15, "Telefone must be at most 15 characters."),
  rede_social: z
    .string()
    .min(3, "Rede social must be at least 3 characters.")
    .max(100, "Rede social must be at most 100 characters."),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ must be at least 11 characters.")
    .max(14, "CPF/CNPJ must be at most 14 characters."),
  descricao_habilidades: z
    .string()
    .min(3, "Descrição de habilidades must be at least 3 characters.")
    .max(300, "Descrição de habilidades must be at most 100 characters."),
});

export default function FullApplicationForm({
  invite_code,
}: {
  invite_code: string;
}) {
  const [application, setApplication] = React.useState<Application | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const getData = async () => {
    const res = await fetch(`/api/applications/${invite_code}`);
    if (!res.ok) {
      toast.error("Erro ao buscar dados da aplicação. código inválido.");
      return;
    }
    const data = await res.json();
    form.setValue("nome", data.nome);
    form.setValue("email", data.email);
    form.setValue("empresa", data.empresa);
    form.setValue("id_intencao", data.id);
    setApplication(data);
  };
  React.useEffect(() => {
    getData();
  }, [invite_code]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Processado com sucesso!");
          form.reset();
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
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

  if (!application || application.registro_finalizado) {
    return (
      <div className="p-4">
        <h4 className="text-red-500">Código inválido ou já registrado:</h4>
        <Link className="text-blue-500" href="/">
          Clique aqui para voltar para o início
        </Link>
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-2xl font-bold">
        Bem-vindo(a) <span className="text-blue-500">{application.nome}</span>
      </h3>
      <form
        className="w-full max-w-md py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
              name="telefone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="telefone">
                    Telefone (whatsapp)
                  </FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(formatBRPhone(e.target.value));
                    }}
                    id="telefone"
                    type="tel"
                    placeholder="Seu telefone"
                    required
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
              name="rede_social"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rede_social">
                    Rede social (instagram, linkedin, etc.)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="rede_social"
                    type="text"
                    placeholder="Sua rede social"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cpf_cnpj"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cpf_cnpj">CPF/CNPJ</FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(formatCpfCnpj(e.target.value));
                    }}
                    id="cpf_cnpj"
                    type="text"
                    placeholder="Seu CPF/CNPJ"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="descricao_habilidades"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="descricao_habilidades">
                    Descrição de habilidades
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="descricao_habilidades"
                    placeholder="Descreva suas habilidades"
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
    </div>
  );
}

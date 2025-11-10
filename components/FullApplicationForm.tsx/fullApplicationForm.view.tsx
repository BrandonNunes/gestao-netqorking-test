"use client";

import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { formatBRPhone, formatCpfCnpj } from "@/utils/masks";
import { Textarea } from "../ui/textarea";

import useFullApplicationFormModel from "./fullApplicationForm.model";

export default function FullApplicationFormView(
  props: ReturnType<typeof useFullApplicationFormModel>
) {
  const { application, form, onSubmit } = props;

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

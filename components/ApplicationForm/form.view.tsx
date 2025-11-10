"use client";
import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useApplicationFormModel from "./form.model";

export default function ApplicationFormView({
  form,
  onSubmit,
}: ReturnType<typeof useApplicationFormModel>) {
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

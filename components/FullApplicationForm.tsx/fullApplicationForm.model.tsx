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
import { fullApplicationformSchema } from "./schemas";

export default function useFullApplicationFormModel({
  invite_code,
}: {
  invite_code: string;
}) {
  const [application, setApplication] = React.useState<Application | null>(
    null
  );
  const form = useForm<z.infer<typeof fullApplicationformSchema>>({
    resolver: zodResolver(fullApplicationformSchema),
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

  function onSubmit(data: z.infer<typeof fullApplicationformSchema>) {
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

  return {
    application,
    form,
    onSubmit,
  };
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formApplicationSchema } from "./schemas";
import { toast } from "sonner";

export default function useApplicationFormModel() {
  const form = useForm<z.infer<typeof formApplicationSchema>>({
    resolver: zodResolver(formApplicationSchema),
    defaultValues: {
      nome: "",
      email: "",
      empresa: "",
      motivo_participacao: "",
    },
  });
  function onSubmit(data: z.infer<typeof formApplicationSchema>) {
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
  return {
    form,
    onSubmit,
  };
}

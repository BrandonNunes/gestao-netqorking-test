"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/lib/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminPage() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const loadData = async () => {
    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
  };
  const approveApplication = async (id: number, approved: boolean) => {
    // eslint-disable-next-line react-hooks/purity
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const body = approved
      ? { id, aprovado: approved, codigo_convite: randomCode }
      : { id, recusado: !approved };
    const res = await fetch(`/api/applications`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      loadData();
    } else {
      toast.error(data.message, { position: "top-right" });
    }
  };
  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="w-full h-full overflow-auto">
      <Table className="w-1/2">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Empresa</TableHead>
            <TableHead className="text-right max-w-[300px]">
              Motivo de participação
            </TableHead>
            <TableHead className="text-right">Data</TableHead>
            <TableHead className="text-right">Situação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{application.nome}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell className="text-right">
                {application.empresa}
              </TableCell>
              <TableCell className="text-right ">
                {application.motivo_participacao}
              </TableCell>
              <TableCell className="text-right">
                {new Date(application.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {application.aprovado ? (
                  <span className="bg-green-500 text-white px-2 rounded-full">
                    Aprovado
                  </span>
                ) : application.recusado ? (
                  <span className="bg-red-500 text-white px-2 rounded-full">
                    Rejeitado
                  </span>
                ) : (
                  <span className="bg-yellow-500 text-white px-2 rounded-full">
                    Pendente
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {!application.aprovado && !application.recusado && (
                  <>
                    <Button
                      className="bg-blue-500 text-white px-2 rounded-full"
                      onClick={() => approveApplication(application.id, true)}
                    >
                      Aprovar
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-2 rounded-full"
                      onClick={() => approveApplication(application.id, false)}
                    >
                      Rejeitar
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

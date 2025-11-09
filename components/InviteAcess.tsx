"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export default function InviteAccess() {
  const [inviteCode, setInviteCode] = React.useState("");
  return (
    <div>
      <h4>Tenho um código de convite</h4>
      <small className="text-sm leading-none font-medium border-b text-zinc-500 mb-4">
        Se você tiver um código de convite, insira-o abaixo para se registrar.
      </small>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          id="invite_code"
          name="invite_code"
          placeholder="Insira seu código de convite"
          className="w-[300px]"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <Button className="cursor-pointer" disabled={!inviteCode}>
          <Link href={`/registers?invite_code=${inviteCode}`}>
            Usar código de convite
          </Link>
        </Button>
      </div>
    </div>
  );
}

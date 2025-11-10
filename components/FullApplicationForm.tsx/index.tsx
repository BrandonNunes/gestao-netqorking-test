"use client";

import useFullApplicationFormModel from "./fullApplicationForm.model";
import FullApplicationFormView from "./fullApplicationForm.view";

export default function FullApplicationForm({
  invite_code,
}: {
  invite_code: string;
}) {
  const model = useFullApplicationFormModel({ invite_code });
  return <FullApplicationFormView {...model} />;
}

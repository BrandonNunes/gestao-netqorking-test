"use client";
import ApplicationFormView from "./form.view";
import useApplicationFormModel from "./form.model";

export default function ApplicationForm() {
  const model = useApplicationFormModel();
  return <ApplicationFormView {...model} />;
}

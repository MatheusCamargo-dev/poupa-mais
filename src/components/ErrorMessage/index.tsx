'use client';

import { FieldError } from "react-hook-form";

type ErrorMessage = {
  errorMessage: FieldError | { message: string}
};
export default function ErrorMessage(props: ErrorMessage) {
  const { errorMessage } = props;
  return <p className="text-red-500 p-0 text-sm">{errorMessage?.message}</p>;
}

'use client';

import { useActionState, startTransition } from "react";
import * as actions from "@/actions"

export default function SnippetCreatePage() {
  // por baixo dos panos o useFormState usa o actions.createSnippet e retorna uma versão atulizada da função no parametro "action"
  const [formState, action] = useActionState(actions.createSnippet, {
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a new Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">Title</label>
          <input name="title" type="text" className="border rounded p-2 w-full" id="title" />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">Code</label>
          <textarea name="code" className="border rounded p-2 w-full" id="code" />
        </div>

        {
          formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400 text-red-400">{formState.message}</div> : null
        }

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>)
}
'use client';

import * as actions from "@/actions"
import { useActionState } from "react";

export default function SnippetCreatePage() {
  // por baixo dos panos o useFormState usa o actions.createSnippet e retorna uma versão atulizada da função no parametro "action"
  const [state, formAction] = useActionState(actions.createSnippet, { message: "" });

  return (
    <form action={formAction}>
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
          state.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400 text-red-400">{state.message}</div> : null
        }

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>)
}
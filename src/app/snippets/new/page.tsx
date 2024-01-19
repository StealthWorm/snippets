import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This need to be a server action !
    'use server';

    // Check the users inputs to make sure they're valid
    const title = formData.get('title') as string; //comes from 'name' property of the input
    const code = formData.get('code') as string;

    // Create new record into database
    const snippet = await db.snippet.create({
      data: {
        title,
        code
      }
    })

    // Redirect the user to the Home page
    // Redirect is allowed with server and client functions and components, while router.push() is available only in client
    redirect('/');
  }

  return (
    <form action={createSnippet}>
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

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>)
}
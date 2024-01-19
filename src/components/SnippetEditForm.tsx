'use client';

import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = "") {
    setCode(value);
  }

  // cria uma versão pré-carregada da server action, chamando  a função com alguns argumentos ja atribuidos
  // como a pagina de edição ja traz os dados originais, deixamos eles carregados na função previamente 
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div className="p-4">
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">Save</button>
      </form>
    </div>
  )
}
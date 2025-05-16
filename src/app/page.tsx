import Link from "next/link"
import { db } from "@/db"

export default async function Home() {
  const snippets = await db.snippet.findMany()

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded hover:bg-gray-100 transition-colors"
      >
        <div>
          {snippet.title}
        </div>
        <div className="text-sm text-gray-500 hover:text-gray-700 hover:font-bold transition-colors">
          View
        </div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href={`/snippets/new`} className="border p-2 rounded hover:bg-green-100 transition-colors">New</Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  )
}

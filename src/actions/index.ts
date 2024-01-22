'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// using this way (sending the formSate), we can validate the form data without sending JS to the browser
export async function createSnippet(
    formSate: { message: string },
    formData: FormData
) {
    try {// Check the users inputs to make sure they're valid
        const title = formData.get('title') as string; //comes from 'name' property of the input
        const code = formData.get('code') as string;

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be longer'
            }
        }

        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be longer'
            }
        }

        // Create new record into database
        await db.snippet.create({
            data: {
                title,
                code
            }
        })
    } catch (err: unknown) {
        //! Error handling with Next: sempre que possivel queremos voltar informações diretas para o usuário, ao invés de erros genéricos
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Something went wrong...'
            }
        }
    }

    revalidatePath('/');
    redirect('/')
}

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });

    revalidatePath('/');
    redirect('/');
}
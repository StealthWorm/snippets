//* essa pagina é renderizada sempre que é encontrado um erro do lado do servidor, 
//* ja que, por padrão, as paginas no Next são Server Side
//* OBRIGA a criação de um Client Component

'use client';

interface ErrorProps {
  error: Error,
  reset: () => void; // uma ação que geralmente envolve um botao para redirecionar ou tentar novamente
}

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div>
      {error.message}
    </div>
  )
}


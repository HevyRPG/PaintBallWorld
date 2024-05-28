import React from 'react'

export default function ErrorPage() {
  const errorMessage = 'Page not found.'

  return (
    <div
      id="error-page"
      className="text-destructive h-screen flex flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-20 h-20 text-err"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clipRule="evenodd"
        />
      </svg>

      <h1 className="text-4xl text-destructive-foreground mb-4 font-bold">
        O nie!
      </h1>
      <p className="mb-2 text-xl text-destructive-foreground">
        Znalazłeś miejsce do którego nikt nie zagląda.
      </p>
      <p className="mb-2 text-destructive-foreground">Błąd:</p>
      <p className="italic text-destructive-foreground">{errorMessage}</p>
    </div>
  )
}

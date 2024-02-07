import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  const errorMessage = error?.statusText || error?.message || 'Unknown error'

  return (
    <div
      id="error-page"
      className="text-white h-screen flex flex-col items-center justify-center"
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

      <h1 className="text-4xl mb-4 font-bold">O nie!</h1>
      <p className="mb-2 text-xl">
        Znalazłeś miejsce do którego nikt nie zagląda.
      </p>
      <p className="mb-2">Błąd:</p>
      <p className="italic">{errorMessage}</p>
    </div>
  )
}
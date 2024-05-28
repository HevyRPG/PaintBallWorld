import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

const ContactOwnerModal = forwardRef(function Modal(
  { selectedField, email },
  ref
) {
  const dialog = useRef()

  const handleCloseModal = () => {
    dialog.current.close()
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal()
      },
      close: handleCloseModal,
    }
  })

  console.log(selectedField?.id)

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">
          Kontakt z {selectedField?.ownerName}
        </h1>
        <p className="text-gray-600 mt-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          dolorem vel cupiditate laudantium dicta.
        </p>
        <form>
          <div className="mt-8 space-y-6">
            <div>
              <label className="text-sm text-gray-700 block mb-1 font-medium">
                Tytuł
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Godziny otwarcia"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1 font-medium">
                Treść
              </label>
              <textarea
                type="text"
                name="email"
                id="email"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Czy tor jest wolny w poniedziałek?"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1 font-medium">
                Twój email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 w-full"
                readOnly
                placeholder={email}
              />
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button
              onClick={handleCloseModal}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')
  )
})
export default ContactOwnerModal

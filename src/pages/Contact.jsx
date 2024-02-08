const ContactPage = () => {
  return (
    <>
    <div class='p-16'>
      <div class="p-8 rounded border border-gray-200 bg-white">
        <h1 class="font-medium text-3xl">Napisz do nas</h1>
        <p class="text-gray-600 mt-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          dolorem vel cupiditate laudantium dicta.
        </p>
        <form>
          <div class="mt-8 grid lg:grid-cols-2 gap-4">
            <div>
              <label
                for="name"
                class="text-sm text-gray-700 block mb-1 font-medium"
              >
                Imie i nazwisko
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                for="email"
                class="text-sm text-gray-700 block mb-1 font-medium"
              >
                Email Adress
              </label>
              <input
                type="text"
                name="email"
                id="email"
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="yourmail@provider.com"
              />
            </div>
            <div>
              <label
                for="job"
                class="text-sm text-gray-700 block mb-1 font-medium"
              >
                Tytuł
              </label>
              <input
                type="text"
                name="job"
                id="job"
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="..."
              />
            </div>
            <div>
              <label
                for="brithday"
                class="text-sm text-gray-700 block mb-1 font-medium"
              >
                Opis
              </label>
              <input
                type="text"
                name="brithday"
                id="brithday"
                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="..."
              />
            </div>
          </div>
          <div class="space-x-4 mt-8">
            <button
              type="submit"
              class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
            <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default ContactPage;

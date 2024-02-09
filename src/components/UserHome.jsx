export default function UserHome({ data }) {
  return (
    <>
      <div class="w-1/3 p-16">
        <div class="p-8 bg-white shadow mt-12">
          <div class="grid">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div class="relative">
              <div class="w-36 h-36 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={data.photo} />
              </div>
            </div>
          </div>
          <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">{data.name}</h1>
            <p class="font-light text-gray-400 mt-3">@{data.username}</p>
            <p class="mt-8 text-gray-500">`{data.feedback}`</p>
          </div>
        </div>
      </div>
    </>
  );
}

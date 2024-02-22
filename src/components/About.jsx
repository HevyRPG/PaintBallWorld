export default function About() {
  return (
    <>
      <div className="flex justify-center">
        <div className="container max-w-screen-2xl lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-300 pb-4">
                Trochę o nas
              </h1>
              <p className="text-xl font-normal  leading-6 text-gray-400 ">
                Projekt powstał przy luźnej rozmowie na temat pracy
                inżynierskiej. Szukaliśmy jakiegoś pomysłu, no i się trafił.
                Paintball.{' '}
              </p>
            </div>
            <div className="w-full lg:w-8/12 ">
              <img
                className="w-5/6 h-full ml-16"
                src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                alt="A group of People"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-28">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-300 pb-4">
                Dlaczego paintball?
              </h1>
              <p className="text-xl font-normal leading-6 text-gray-400 ">
                Myślę że każdy z nas kojarzy ten temat, chociażby z wyjazdów
                integracyjnych (mniej lub bardziej udanych). Od czasu do czasu
                lubimy sobie pojechać, postrzelać, wylatać się. Świetny pomysł
                na spędzanie czasu przy świeżym powietrzu! (chyba że maska jest
                z wypożyczalni, wtedy to różnie).
              </p>
            </div>
            <div className="w-full lg:w-8/12 ">
              <img
                className="w-5/6 h-full ml-16"
                src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                alt="A group of People"
              />
            </div>
          </div>
          <div>
            <div className="container flex justify-center mx-auto pt-24 ">
              <div>
                <p className="text-gray-200 text-xl text-center font-normal py-6">
                  TWÓRCY
                </p>
                <h1 className="xl:text-4xl text-3xl text-center text-gray-400 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
                  Jakimś cudem udało się to ogarnąć z pomocą tych dżentelmenów:
                </h1>
              </div>
            </div>
            <div className="w-full bg-gray-100 px-10 pt-10 rounded-xl">
              <div className="container mx-auto">
                <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                  <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                      <div className="absolute -mt-20 w-full flex justify-center">
                        <div className="h-32 w-32">
                          <img
                            src="https://avatar.iran.liara.run/public/13"
                            className="rounded-full object-cover h-full w-full shadow-md"
                          />
                        </div>
                      </div>
                      <div className="px-6 mt-16">
                        <div className="font-bold text-3xl text-center text-primary-foreground pb-1">
                          Robert
                        </div>
                        <p className="text-gray-800 text-sm text-center">
                          Frontend
                        </p>
                        <p className="text-center text-gray-600 text-base pt-3 font-normal mb-6">
                          Froncik
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                      <div className="absolute -mt-20 w-full flex justify-center">
                        <div className="h-32 w-32">
                          <img
                            src="https://avatar.iran.liara.run/public/26"
                            className="rounded-full object-cover h-full w-full shadow-md"
                          />
                        </div>
                      </div>
                      <div className="px-6 mt-16">
                        <div className="font-bold text-3xl text-center text-primary-foreground pb-1">
                          Mateusz
                        </div>
                        <p className="text-gray-800 text-sm text-center">
                          Frontend
                        </p>
                        <p className="text-center text-gray-600 text-base pt-3 font-normal mb-6">
                          Coś tam front robie
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                      <div className="absolute -mt-20 w-full flex justify-center">
                        <div className="h-32 w-32">
                          <img
                            src="https://avatar.iran.liara.run/public/29"
                            className="rounded-full object-cover h-full w-full shadow-md"
                          />
                        </div>
                      </div>
                      <div className="px-6 mt-16">
                        <div className="font-bold text-3xl text-center text-primary-foreground pb-1">
                          Błażej
                        </div>
                        <p className="text-gray-800 text-sm text-center">
                          Backend
                        </p>
                        <p className="text-center text-gray-600 text-base pt-3 font-normal mb-6">
                          Backend Backend Backend Backend Backend Backend
                          Backend Backend Backend Backend Backend Backend
                          Backend Backend Backend Backend Backend Backend
                          Backend Backend Backend BackendBackend Backend Backend
                          Backend
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container mx-auto flex justify-center items-center">
                  <img
                    className="h-16 w-16 grayscale mb-6"
                    src="./logosm.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

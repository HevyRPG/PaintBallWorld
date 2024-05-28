import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'

const login_false = (
  <>
    <p className="text-xl italic  mb-8">
      Wejdź do świata, w którym strategia, praca zespołowa i akcja łączą się w
      ekscytującą przygodę z paintballem.
    </p>
    <Link to="/register">
      <Button variant="secondary" size="lg">
        Zacznij teraz
      </Button>
    </Link>
  </>
)

const login_true = (
  <>
    <p className="text-xl italic  mb-8">
      Sprawdź, jakie pola są dostępne w Twojej okolicy!
    </p>
    <Link to="/calendar">
      <Button variant="secondary" size="lg">
        Sprawdź dostępne pola
      </Button>
    </Link>
  </>
)

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <main className="mx-auto max-w-screen-2xl bg-background text-primary-foreground">
      <section className="text-center py-20 px-4 bg-background text-primary">
        <div className="sm:max-w-md md:max-w-md 2xl:max-w-3xl   mx-auto">
          <img src="logosm.png" alt="logo" />
          <h1 className="text-6xl text-secondary-foreground font-bold mb-4">
            Witamy na{' '}
            <span className="italic font-bold text-primary">
              PaintballWorld
            </span>
            !
          </h1>
          {!isLoggedIn ? login_false : login_true}
        </div>
      </section>

      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-primary">Dynamiczne</span> areny
              </h3>
              <p>
                Od gęstych lasów po taktyczne krajobrazy miejskie, każda arena
                oferuje unikalne wyzwanie.
              </p>
            </div>

            <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Wszystko w <span className="text-primary">jednym</span> miejscu
              </h3>
              <p className="text-xl font-semibold">
                Znajdź, zapisz się i <span className="text-primary">graj!</span>
              </p>
            </div>

            <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-primary">Społeczność</span> i wydarzenia
              </h3>
              <p>
                Dołącz do prężnej społeczności entuzjastów i bierz udział w
                ekscytujących wydarzeniach i turniejach.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-background text-accent-foreground">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Gotowy, aby zacząć?</h2>
          {!isLoggedIn ? login_false : login_true}
        </div>
      </section>
    </main>
  )
}

export default HomePage

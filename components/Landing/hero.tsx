export function Hero() {
    return (
      <section className="pt-44 pb-12">
        <div className="container flex flex-col items-center text-center">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Embrace The Future of Gardening with <span className="text-emerald-500">Plant Tracker Today!</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            With our easy to use system, you can effortlessly monitor the health of your plants, receive valuable
            information about their growth progress.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <button className="rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-200">
              Enterprise Solution
            </button>
            <button className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
              Sign Up
            </button>
          </div>
        </div>
      </section>
    )
  }
  
  
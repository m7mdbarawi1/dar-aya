import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="bg-white text-black">
      {/* SECTION 1 — HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* Decorative corners */}
        <div className="absolute left-8 top-8 h-20 w-20 border-l border-t border-[#C9A227] sm:left-12 sm:top-12" />
        <div className="absolute bottom-8 right-8 h-20 w-20 border-b border-r border-[#C9A227] sm:bottom-12 sm:right-12" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-[#C9A227]">
            Luxury Wedding & Gifts
          </span>

          <h1 className="text-6xl font-light tracking-[0.18em] sm:text-7xl md:text-8xl">
            DAR AYA
          </h1>

          <div className="mt-7 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 max-w-md text-sm leading-7 tracking-wide text-black/70 sm:text-base">
            Elegant details, meaningful gifts, and unforgettable moments
            created especially for you.
          </p>

          <Link
            href="/home"
            className="mt-10 border border-black bg-black px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-[#C9A227] hover:text-black"
          >
            Explore Dar Aya
          </Link>
        </div>
      </section>

      {/* SECTION 2 — WHAT WE OFFER */}
      <section className="flex min-h-screen items-center border-t border-black/10 px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-[#C9A227]">
              The Dar Aya Experience
            </span>

            <h2 className="mt-5 text-4xl font-light tracking-[0.12em] sm:text-5xl">
              MADE FOR YOUR MOMENTS
            </h2>

            <div className="mx-auto mt-6 h-px w-12 bg-[#C9A227]" />
          </div>

          <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
            <div className="bg-white p-10 text-center sm:p-14">
              <span className="text-3xl font-light text-[#C9A227]">
                I
              </span>

              <h3 className="mt-6 text-lg font-medium uppercase tracking-[0.15em]">
                Weddings
              </h3>

              <p className="mt-5 text-sm leading-7 text-black/60">
                Thoughtfully planned details and elegant touches designed
                to make your celebration truly yours.
              </p>
            </div>

            <div className="bg-white p-10 text-center sm:p-14">
              <span className="text-3xl font-light text-[#C9A227]">
                II
              </span>

              <h3 className="mt-6 text-lg font-medium uppercase tracking-[0.15em]">
                Gifts
              </h3>

              <p className="mt-5 text-sm leading-7 text-black/60">
                Meaningful gifts, beautifully presented and personalized
                for the people and moments that matter.
              </p>
            </div>

            <div className="bg-white p-10 text-center sm:p-14">
              <span className="text-3xl font-light text-[#C9A227]">
                III
              </span>

              <h3 className="mt-6 text-lg font-medium uppercase tracking-[0.15em]">
                Personalization
              </h3>

              <p className="mt-5 text-sm leading-7 text-black/60">
                From the smallest detail to the final presentation,
                everything can be created especially for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CLOSING CTA */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
        {/* Decorative corners */}
        <div className="absolute left-8 top-8 h-20 w-20 border-l border-t border-[#C9A227] sm:left-12 sm:top-12" />
        <div className="absolute bottom-8 right-8 h-20 w-20 border-b border-r border-[#C9A227] sm:bottom-12 sm:right-12" />

        <div className="relative z-10 max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.45em] text-[#C9A227]">
            Your Story Starts Here
          </span>

          <h2 className="mt-7 text-5xl font-light tracking-[0.15em] sm:text-6xl md:text-7xl">
            DAR AYA
          </h2>

          <div className="mx-auto mt-8 h-px w-16 bg-[#C9A227]" />

          <p className="mx-auto mt-8 max-w-lg text-sm leading-8 tracking-wide text-white/70 sm:text-base">
            Discover a world of elegant wedding details, thoughtful gifts,
            and beautifully personalized moments.
          </p>

          <Link
            href="/home"
            className="mt-10 inline-block border border-[#C9A227] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-[#C9A227] hover:text-black"
          >
            Enter Dar Aya
          </Link>
        </div>
      </section>
    </main>
  );
}
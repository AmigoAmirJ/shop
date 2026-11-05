import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Quality First",
    description:
      "We focus on providing carefully selected digital products with reliable quality and a great user experience.",
  },
  {
    number: "02",
    title: "Modern Technology",
    description:
      "Our collection follows the latest technology trends, bringing modern devices and innovative products together.",
  },
  {
    number: "03",
    title: "Customer Experience",
    description:
      "We believe shopping should be simple, secure, and enjoyable. Every part of our platform is designed with that in mind.",
  },
  {
    number: "04",
    title: "Always Improving",
    description:
      "Technology never stands still, and neither do we. We continuously work to improve our products and services.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-40 md:pb-32 md:pt-48">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            About Our Company
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Technology for
            <span className="block text-zinc-500">
              a better tomorrow.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-muted md:text-lg">
            Welcome to our world of technology. We bring together modern
            digital products, innovative ideas, and a passion for making
            everyday life smarter and easier.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Explore Products
            </Link>

            <Link
              href="/"
              className="rounded-full border border-border px-7 py-3 text-sm font-medium transition hover:border-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent">
            Who We Are
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            More than just
            <span className="text-zinc-500"> a store.</span>
          </h2>
        </div>

        <div className="space-y-6 text-sm leading-8 text-muted md:text-base">
          <p>
            We are a digital technology store built around one simple idea:
            making modern technology more accessible to everyone.
          </p>

          <p>
            From powerful computers and smart devices to everyday digital
            accessories, our goal is to create a place where discovering
            technology feels easy and exciting.
          </p>

          <p>
            We combine a clean shopping experience with a carefully organized
            product collection, helping customers find the technology that
            fits their needs.
          </p>
        </div>
      </section>

      {/* Highlight */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.25em] text-accent">
              Our Mission
            </p>

            <h2 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
              Making technology simple, accessible, and inspiring.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-muted md:text-base">
              We want to help people discover useful technology, make
              confident choices, and enjoy a better digital lifestyle.
              Every product and every improvement is a step toward that goal.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-accent">
            What Matters to Us
          </p>

          <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
            Our Core Values
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
            The principles behind everything we do and every experience
            we create.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-border bg-surface p-8 transition duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="text-sm font-medium text-accent">
                {feature.number}
              </span>

              <h3 className="mt-8 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-accent">
            Discover Technology
          </p>

          <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
            Explore Our World
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Computers & Laptops",
              "Gaming Technology",
              "Smart Devices",
              "Digital Accessories",
            ].map((category, index) => (
              <div
                key={category}
                className="rounded-2xl border border-border bg-bg p-6 transition hover:border-accent/50"
              >
                <span className="text-xs text-accent">
                  CATEGORY 0{index + 1}
                </span>

                <h3 className="mt-8 text-lg font-medium">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">
          Start Exploring
        </p>

        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Find the technology that moves you forward.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
          Discover modern products and take the next step toward a smarter
          digital experience.
        </p>

        <Link
          href="/products"
          className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105"
        >
          Browse Products
        </Link>
      </section>

    </main>
  );
}
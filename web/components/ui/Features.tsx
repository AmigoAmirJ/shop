import Reveal from "@/components/effects/Reveal";

const items = [
  { title: "Feature one", text: "Short description of the benefit." },
  { title: "Feature two", text: "Short description of the benefit." },
  { title: "Feature three", text: "Short description of the benefit." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="h-full rounded-card border border-border bg-surface p-6">
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Document verification",
    description:
      "Check document references against a trusted issuer registry.",
    status: "Registry-based checks",
    available: true,
    icon: "▤",
  },
  
  {
    number: "02",
    title: "News credibility",
    description:
      "Examine articles for credibility-related warning signals and evidence.",
    status: "Textual signal analysis",
    available: true,
    icon: "◉",
  },

  {
    number: "03",
    title: "Image screening",
    description:
      "Screen images for potential signs of manipulation.",
    status: "Planned",
    available: true,
    icon: "▧",
  },
];

const steps = [
  {
    number: "01",
    title: "Examine",
    description: "Inspect the available document, article, or image.",
  },
  {
    number: "02",
    title: "Explain",
    description: "Understand which checks were performed and what they found.",
  },
  {
    number: "03",
    title: "Report",
    description: "Review results, evidence, limitations, and next steps.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#172b23]">
      {/* Navigation */}
      <header className="relative z-10 border-b border-border/70 bg-background/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="VeriTrust home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/15">
              V
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-tight">
                VeriTrust
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.19em] text-muted">
                Digital authenticity
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <a
              href="#verification-tools"
              className="hidden rounded-lg px-4 py-2.5 text-sm text-muted transition hover:bg-white hover:text-foreground sm:inline-flex"
            >
              Explore platform
            </a>
            <Link
              href="/verify/document"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#10382c] hover:shadow-md"
            >
              Open workspace <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              
"radial-gradient(ellipse at 78% 20%, rgba(39,108,79,0.16), transparent 38%), radial-gradient(ellipse at 15% 80%, rgba(226,232,213,0.32), transparent 42%), linear-gradient(rgba(23,74,58,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,74,58,0.04) 1px, transparent 1px)",

            backgroundSize: "auto, auto, 32px 32px, 32px 32px",
          }}
        />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3.5 py-2 text-xs font-medium text-primary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              A clearer view of digital trust
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.07] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Before you trust it,
              <span className="mt-2 block text-primary">
                verify it.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
              One workspace to examine document references, explore news
              credibility signals, and screen images for potential manipulation.
              Start with evidence. Understand the limitations.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/verify/document"
                className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-[#10382c] hover:shadow-xl"
              >
                Verify a document <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/80 px-6 py-3.5 text-sm font-medium transition hover:border-primary/30 hover:bg-white"
              >
                How it works <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">✓</span> Evidence-led approach
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">✓</span> Transparent limitations
              </span>
            </div>
          </div>

          {/* Workspace preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -inset-5 -z-10 rounded-[2rem] bg-[#dfe8dc]/70 blur-2xl"
            />

            <div className="overflow-hidden rounded-2xl border border-[#d8ded5] bg-white shadow-2xl shadow-[#173d32]/10">
              <div className="flex items-center justify-between border-b border-border bg-[#fafbf8] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                    V
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Trust workspace</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Unified verification platform
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-border bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted">
                  Preview
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      Platform overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Examine what matters.
                    </h2>
                  </div>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-[#edf3ed] text-xl text-primary sm:flex">
                    ◈
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {modules.map((module) => (
                    <div key={module.number}>
                      {module.available ? (
                        <Link
                          href={
  module.title === "News credibility"
    ? "/news"
    : module.title === "Image screening"
      ? "/image"
      : "/verify/document"
}
                          className="group flex items-start gap-4 rounded-xl border border-primary/20 bg-[#f7faf6] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[#eff5ee] hover:shadow-md"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-lg text-white shadow-sm">
                            {module.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold">
                                {module.title}
                              </h3>
                              <span className="rounded-full bg-[#dfeee0] px-2 py-0.5 text-[10px] font-semibold text-[#276543]">
                                Available
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {module.description}
                            </p>
                            <p className="mt-2 text-xs font-medium text-primary">
                              Open workspace →
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-white p-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f0e9] text-lg text-muted">
                            {module.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold">
                                {module.title}
                              </h3>
                              <span className="rounded-full bg-[#f1f0eb] px-2 py-0.5 text-[10px] font-medium text-muted">
                                Planned
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#e8e4d8] bg-[#faf8f1] p-4">
                  <span className="mt-0.5 text-lg text-[#936a38]">ⓘ</span>
                  <div>
                    <p className="text-xs font-semibold">Evidence over assumptions</p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      Results should explain the checks performed, the findings,
                      and what remains uncertain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border bg-[#fafbf8] px-5 py-3.5 text-[10px] text-muted sm:px-6">
                <span>VERITRUST / OVERVIEW</span>
                <span>Built for transparent checks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section
        id="verification-tools"
        className="border-y border-border bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The platform
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Three ways to examine digital trust.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted">
              Start with document verification. Additional modules are shown
              for the planned platform scope and are not yet available.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {modules.map((module) => {
              const content = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3ed] text-xl text-primary transition group-hover:bg-primary group-hover:text-white">
                      {module.icon}
                    </span>
                    <span className="text-xs font-medium text-muted">
                      {module.number}
                    </span>
                  </div>
                  <div className="mt-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {module.title}
                      </h3>
                      {!module.available && (
                        <span className="rounded-full bg-[#f1f0eb] px-2 py-1 text-[10px] font-medium text-muted">
                          Planned
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {module.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                    <span
                      className={
                        module.available
                          ? "font-medium text-primary"
                          : "text-muted"
                      }
                    >
                      {module.available ? "Open workspace" : module.status}
                    </span>
                    <span aria-hidden="true" className="text-base">
                      {module.available ? "↗" : "—"}
                    </span>
                  </div>
                </>
              );

              return (
                <div key={module.number}>
                  {module.available ? (
                    <Link
                      href={module.title === "News credibility" ? "/news" : "/verify/document"}
                      className=
"group flex h-full min-h-[260px] flex-col rounded-2xl border border-[#e1e7dd] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8ca995] hover:shadow-xl hover:shadow-[#173d32]/10"

                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="flex h-full min-h-[245px] flex-col rounded-2xl border border-border bg-white p-6">
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10"
      >
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Trust the evidence, not just the result.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              Verification is a process of examining available evidence—not
              a promise that every result is correct.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[48px_1fr] gap-4 py-5 sm:grid-cols-[60px_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3ed] text-sm font-semibold text-primary">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 overflow-hidden rounded-2xl bg-[#173d32] px-6 py-9 text-white sm:px-10 sm:py-11 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c2d8c6]">
              Start with a reference
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to verify a document?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
              Check a sample reference in the VeriTrust document workspace.
            </p>
          </div>
          <Link
            href="/verify/document"
            className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#173d32] transition hover:-translate-y-0.5 hover:bg-[#edf3ed] md:self-center"
          >
            Open document verification <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold tracking-tight text-foreground">
            VeriTrust
          </p>
          <p>Digital authenticity, examined with care.</p>
          <p>Demo environment · Sample registry</p>
        </div>
      </footer>
    </main>
  );
}
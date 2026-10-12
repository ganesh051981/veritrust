
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Overview",
    href: "/",
    number: "01",
    description: "Platform overview",
    available: true,
  },
  {
    label: "Document verification",
    href: "/verify/document",
    number: "02",
    description: "Issuer registry checks",
    available: true,
  },
  {
    label: "News credibility",
href: "/news",
number: "03",
description: "Evidence-led analysis",
available: true,
  },
  {
    label: "Image screening",
href: "/image",
number: "04",
description: "Image file screening",
available: true,
  },
];

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Keep the public landing page as its own experience.
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className="relative z-10 flex w-full shrink-0 flex-col border-b border-white/10 bg-[#173d32] text-white lg:sticky lg:top-0 lg:h-screen lg:w-[264px] lg:border-b-0 lg:border-r lg:border-[#315648]">
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-5 sm:px-7 lg:px-6"
          aria-label="VeriTrust home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lg font-semibold shadow-inner">
            V
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight">
              VeriTrust
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-[#c4d4c9]">
              Trust workspace
            </span>
          </span>
        </Link>

        <div className="mx-5 border-t border-white/10 lg:mx-4" />

        <div className="px-5 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b1c8ba] lg:px-4">
          Workspace
        </div>

        <nav
          aria-label="Main navigation"
          className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-3"
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (!item.available) {
              return (
                <div
                  key={item.href}
                  aria-disabled="true"
                  title="This module is planned for a future step."
                  className="flex min-w-[160px] shrink-0 cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 opacity-50 lg:min-w-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[10px] font-medium text-[#c4d4c9]">
                    {item.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[10px] text-[#c4d4c9]">
                      Coming next
                    </span>
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex min-w-[160px] shrink-0 items-center gap-3 rounded-xl border px-3 py-3 lg:min-w-0 ${
                  active
                    ? "border-white/15 bg-white/10 shadow-sm"
                    : "border-transparent hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold ${
                    active
                      ? "bg-[#dbe8d9] text-[#173d32]"
                      : "border border-white/10 text-[#c4d4c9]"
                  }`}
                >
                  {item.number}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#c4d4c9]">
                    {item.description}
                  </span>
                </span>
                {active && (
                  <span
                    className="ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#c18a56] lg:block"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 mt-auto hidden border-t border-white/10 pt-4 lg:block">
          <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#c18a56]" />
              <span className="text-xs font-medium">Demo environment</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-[#c4d4c9]">
              Results depend on the checks available in each module.
            </p>
          </div>
          <p className="px-1 pb-4 text-[10px] text-[#a9c0b2]">
            VERITRUST · EVIDENCE FIRST
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { findDocumentRecord } from "@/lib/document-registry";

export default function DocumentVerificationPage() {
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<{
    status: "verified" | "revoked" | "not-found";
    message: string;
    documentName?: string;
    issuer?: string;
  } | null>(null);

  function handleVerify() {
    if (!reference.trim()) {
      setResult({
        status: "not-found",
        message: "Enter a document reference before running a check.",
      });
      return;
    }

    const record = findDocumentRecord(reference);

    if (!record) {
      setResult({
        status: "not-found",
        message: "No matching reference exists in the demonstration registry.",
      });
      return;
    }

    if (record.status === "revoked") {
      setResult({
        status: "revoked",
        message: "The registry marks this record as revoked.",
        documentName: record.documentName,
        issuer: record.issuer,
      });
      return;
    }

    setResult({
      status: "verified",
      message: "The reference matches an active registry record.",
      documentName: record.documentName,
      issuer: record.issuer,
    });
  }

  const statusStyles = {
    verified: {
      panel: "border-emerald-200 bg-emerald-50/70",
      label: "text-emerald-800",
      title: "Active registry match",
      symbol: "✓",
    },
    revoked: {
      panel: "border-red-200 bg-red-50/70",
      label: "text-red-800",
      title: "Record revoked",
      symbol: "!",
    },
    "not-found": {
      panel: "border-amber-200 bg-amber-50/70",
      label: "text-amber-900",
      title: "Unable to verify",
      symbol: "?",
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
        
      

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="flex items-center gap-2 text-[13px] text-[#838981]">
          <a href="/" className="transition hover:text-[#174a3a]">
            Home
          </a>
          <span>/</span>
          <span className="text-[#3d463e]">Document verification</span>
        </nav>

        <section className="mt-9 flex flex-col justify-between gap-5 border-b border-[#e3e6df] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#527260]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#174a3a]" />
              Verification module
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-[42px]">
              Document verification
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#747b73] sm:text-[15px]">
              Check a document reference against the issuer records available
              to this workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-[#e2e5df] bg-white px-3 py-2 md:self-auto">
            <span className="text-[#174a3a]">◇</span>
            <span className="text-xs font-medium text-[#606960]">
              Registry lookup
            </span>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:gap-8">
          <section className="overflow-hidden rounded-2xl border border-[#e2e5df] bg-white shadow-[0_2px_8px_rgba(25,40,25,0.025)]">
            <div className="border-b border-[#eceee9] px-6 py-5 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#8a9088]">
                Input
              </p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">
                Find a document record
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-[#777e76]">
                Enter the reference printed on the document.
              </p>
            </div>

            <div className="p-6 sm:p-7">
              <label
                htmlFor="document-reference"
                className="text-[13px] font-medium text-[#353e36]"
              >
                Document reference
              </label>

              <input
                id="document-reference"
                type="text"
                value={reference}
                onChange={(event) => {
                  setReference(event.target.value);
                  setResult(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleVerify();
                }}
                placeholder="VT-DOC-1001"
                className="mt-2.5 w-full rounded-xl border border-[#dfe3dc] bg-[#fbfcfa] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a3a9a1] focus:border-[#477b60] focus:bg-white focus:ring-4 focus:ring-[#174a3a]/[0.07]"
              />

              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#858b83]">
                <span className="mt-px">ⓘ</span>
                <p>Reference matching ignores letter case and extra spaces.</p>
              </div>

              <button
                type="button"
                onClick={handleVerify}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#174a3a] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#10392c] focus:outline-none focus:ring-4 focus:ring-[#174a3a]/20 sm:w-auto"
              >
                Run verification <span aria-hidden="true">→</span>
              </button>

              <div className="mt-7 border-t border-[#eceee9] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#838a82]">
                  Try a sample reference
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["VT-DOC-1001", "VT-DOC-1002", "VT-DOC-1003"].map(
                    (sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => {
                          setReference(sample);
                          setResult(null);
                        }}
                        className="rounded-lg border border-[#e1e5de] bg-white px-3 py-2 font-mono text-xs text-[#536057] transition hover:border-[#9aafa0] hover:bg-[#f6f8f5]"
                      >
                        {sample}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e2e5df] bg-white shadow-[0_2px_8px_rgba(25,40,25,0.025)]">
            <div className="border-b border-[#eceee9] px-6 py-5 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#8a9088]">
                Output
              </p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">
                Verification report
              </h2>
              <p className="mt-1.5 text-sm text-[#777e76]">
                Your result and supporting details appear here.
              </p>
            </div>

            <div className="p-6 sm:p-7">
              {!result ? (
                <div className="flex min-h-[245px] flex-col items-center justify-center rounded-xl border border-dashed border-[#dfe3dc] bg-[#fafbf9] px-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e2e6df] bg-white text-xl text-[#65816e]">
                    ⌕
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">
                    No verification run yet
                  </h3>
                  <p className="mt-2 max-w-[250px] text-xs leading-6 text-[#858b83]">
                    Enter a reference and run a check to generate a report.
                  </p>
                </div>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl border p-5 ${statusStyles[result.status].panel}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-semibold ${statusStyles[result.status].label}`}
                    >
                      {statusStyles[result.status].symbol}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${statusStyles[result.status].label}`}
                      >
                        {statusStyles[result.status].title}
                      </p>
                      <p className="mt-1 text-xs text-[#777e76]">
                        Registry lookup completed
                      </p>
                    </div>
                  </div>

                  
<p className="mt-5 text-sm leading-6 text-[#485249]">
  {result.message}
</p>

<div className="mt-5 rounded-xl border border-black/10 bg-white/70 p-4">
  <div className="flex items-center justify-between gap-3">
    <h3 className="text-xs font-semibold text-[#303b32]">
      Checks performed
    </h3>
    <span className="rounded-full bg-[#edf1eb] px-2.5 py-1 text-[10px] font-medium text-[#526454]">
      1 check
    </span>
  </div>

  <div className="mt-4 flex items-start gap-3">
    <span
      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        result.status === "verified"
          ? "bg-emerald-100 text-emerald-800"
          : result.status === "revoked"
            ? "bg-red-100 text-red-800"
            : "bg-amber-100 text-amber-800"
      }`}
    >
      {result.status === "verified"
        ? "✓"
        : result.status === "revoked"
          ? "!"
          : "?"}
    </span>

    <div>
      <p className="text-sm font-medium text-[#303b32]">
        Sample registry reference match
      </p>
      <p className="mt-1 text-xs leading-5 text-[#777e76]">
        {result.status === "verified"
          ? "A matching record was found and is marked active."
          : result.status === "revoked"
            ? "A matching record was found, but it is marked revoked."
            : "No matching record was found in the local demonstration registry."}
      </p>
    </div>
  </div>

  <div className="mt-4 border-t border-black/10 pt-3">
    <p className="text-[11px] font-medium uppercase tracking-wider text-[#7d847c]">
      Evidence source
    </p>
    <p className="mt-1 text-xs text-[#485249]">
      Local demonstration registry
    </p>
  </div>
</div>


                  {result.documentName && (
                    <div className="mt-5 space-y-3 border-t border-black/10 pt-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#7d847c]">
                          Document
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {result.documentName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#7d847c]">
                          Issuer
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {result.issuer}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#7d847c]">
                          Reference
                        </p>
                        <p className="mt-1 font-mono text-sm">
                          {reference.trim().toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-5 rounded-xl bg-[#f7f8f6] p-4">
                <p className="text-xs font-semibold text-[#485249]">
                  Important limitation
                </p>
                <p className="mt-1.5 text-xs leading-6 text-[#777e76]">
                  This demo checks a local sample registry. A match does not
                  independently prove that the original document is genuine.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 flex flex-col gap-2 border-t border-[#e3e6df] pt-5 text-xs text-[#858b83] sm:flex-row sm:items-center sm:justify-between">
          <p>VeriTrust / Document verification</p>
          <p>Demonstration registry · Not an official issuer service</p>
        </footer>
      </div>
    </main>
  );
}

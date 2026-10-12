"use client";

import { useState } from "react";

export default function ImageScreeningPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  
const [loading, setLoading] = useState(false);
const [predictions, setPredictions] = useState<
  { label: string; score: number }[] | null
>(null);
const [analysisNote, setAnalysisNote] = useState("");


  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];

    setMessage("");
    setChecked(false);
    setPreview("");
    setFile(null);

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setMessage("Image must be smaller than 10 MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }
  
async function handleScreenImage() {
  if (!file || loading) return;

  setLoading(true);
  setMessage("");
  setChecked(false);
  setPredictions(null);
  setAnalysisNote("");

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/image-screen", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Image screening failed.");
    }

    if (!Array.isArray(result.predictions)) {
      throw new Error("The AI service returned an unexpected result.");
    }

    setPredictions(result.predictions);
    setAnalysisNote(result.note || "");
    setChecked(true);
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Unable to screen this image. Please try again."
    );
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#20251f] md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#68765e]">
          VERITRUST / IMAGE SCREENING
        </p>

        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Image screening
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687067]">
              Inspect an image file and review its basic file information.
              This demo does not confirm whether an image is genuine or AI-generated.
            </p>
          </div>
          <span className="w-fit rounded-full border border-[#dce3d5] bg-white px-3 py-1.5 text-xs text-[#526449]">
            Demo environment
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <section className="rounded-2xl border border-[#e3e7df] bg-white p-6 md:col-span-3">
            <h2 className="text-lg font-semibold">Upload an image</h2>
            <p className="mt-2 text-sm text-[#737b70]">
              Supported formats depend on your browser. Maximum file size: 10 MB.
            </p>

            <label className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d5ddcf] bg-[#fafbf8] p-6 text-center transition hover:border-[#829574]">
              <span className="text-3xl">▧</span>
              <span className="mt-3 text-sm font-semibold">
                Choose an image from your device
              </span>
              <span className="mt-1 text-xs text-[#81877d]">
                JPG, PNG, WEBP and other browser-supported image types
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            {message && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {message}
              </p>
            )}

            {preview && file && (
              <div className="mt-5">
                <div className="overflow-hidden rounded-xl border border-[#e3e7df] bg-[#f7f8f5]">
                  <img
                    src={preview}
                    alt="Selected image preview"
                    className="max-h-80 w-full object-contain"
                  />
                </div>
                <p className="mt-3 break-all text-sm font-medium">{file.name}</p>
                <p className="mt-1 text-xs text-[#737b70]">
                  {(file.size / 1024).toFixed(1)} KB · {file.type || "Unknown image type"}
                </p>

                <button
                  onClick={handleScreenImage}
                  disabled={loading}
                  className="mt-5 w-full rounded-xl bg-[#253b2a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#354d39]"
                >
                  {loading ? "Analyzing image..." : "Screen image with AI"}
                </button>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-[#e3e7df] bg-white p-6 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#78816f]">
              Screening report
            </p>
            {!checked ? (
              <>
                <h2 className="mt-4 text-lg font-semibold">Awaiting image</h2>
                <p className="mt-2 text-sm leading-6 text-[#737b70]">
                  Select an image to preview it and run the basic file checks.
                </p>
              </>
            ) : file ? (
              <>
                <div className="mt-5 inline-flex rounded-full bg-[#eaf2e6] px-3 py-1.5 text-xs font-semibold text-[#365b35]">
                  File readable
                </div>
                <h2 className="mt-4 text-xl font-semibold">Basic checks complete</h2>
                
{predictions && (
  <div className="mt-4 rounded-xl border border-[#dce3d5] bg-[#f7f8f5] p-4">
    <p className="text-sm font-semibold">AI model predictions</p>

    {predictions.map((prediction, index) => (
      <div key={`${prediction.label}-${index}`} className="mt-3">
        <div className="flex justify-between gap-3 text-sm">
          <span className="break-all">{prediction.label}</span>
          <span className="font-semibold">
            {(prediction.score * 100).toFixed(1)}%
          </span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#e3e7df]">
          <div
            className="h-full rounded-full bg-[#526f49]"
            style={{
              width: `${Math.max(0, Math.min(100, prediction.score * 100))}%`,
            }}
          />
        </div>
      </div>
    ))}

    <p className="mt-4 text-xs leading-5 text-[#737b70]">
      {analysisNote}
    </p>
  </div>
)}

                <p className="mt-2 text-sm leading-6 text-[#737b70]">
                  The browser accepted this image and generated a preview. This is not an authenticity verdict.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-[#f7f8f5] p-3">
                    <p className="text-xs text-[#737b70]">File type</p>
                    <p className="mt-1 text-sm font-medium">{file.type || "Not provided"}</p>
                  </div>
                  <div className="rounded-xl bg-[#f7f8f5] p-3">
                    <p className="text-xs text-[#737b70]">File size</p>
                    <p className="mt-1 text-sm font-medium">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#eadfbd] bg-[#fffaf0] p-3">
                    <p className="text-sm font-semibold text-[#755b22]">
                      Authenticity Assessment
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7a6b4a]">
                      The AI model estimated the likelihood of AI-generated content. Results can be inaccurate and do not establish authenticity or detect every type of manipulation.
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        </div>

        <p className="mt-6 text-xs leading-5 text-[#858b81]">
          Privacy note: when you run AI screening, the selected image is sent to the configured inference service for analysis.
        </p>
      </div>
    </main>
  );
}
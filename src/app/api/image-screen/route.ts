import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Please upload a valid image." },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be smaller than 10 MB." },
        { status: 413 }
      );
    }

    const detectorUrl = "http://127.0.0.1:8000";

    const detectorForm = new FormData();
    detectorForm.append("file", file, file.name);

    const response = await fetch(`${detectorUrl}/detect`, {
      method: "POST",
      body: detectorForm,
      cache: "no-store",
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      console.error(
        "Local detector error:",
        response.status,
        await response.text()
      );

      return NextResponse.json(
        { error: "The local AI detector could not analyze this image." },
        { status: 502 }
      );
    }

    const result = await response.json();

if (
  !result ||
  typeof result.label !== "string" ||
  typeof result.probability_ai !== "number" ||
  typeof result.probability_real !== "number"
) {
  return NextResponse.json(
    { error: "The local detector returned an unexpected result." },
    { status: 502 }
  );
}

return NextResponse.json({
  model: "Local UnivFD detector",
  predictions: [
    { label: "AI-generated", score: result.probability_ai },
    { label: "Real", score: result.probability_real },
  ],
  note:
    "Predictions are probabilistic indicators, not proof of authenticity.",
});
  } catch (error) {
    console.error("Image screening request failed:", error);

    return NextResponse.json(
      {
        error:
          "Could not connect to the local AI detector. Check that its API server is running.",
      },
      { status: 502 }
    );
  }
}
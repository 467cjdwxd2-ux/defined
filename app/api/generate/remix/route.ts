import { NextRequest, NextResponse } from "next/server";
import { remixDefinition } from "@/lib/openai";
import type { Definition } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const {
      definition,
      mode,
    }: {
      definition: Definition;
      mode: "roast" | "sweeter" | "more-chaotic" | "devastating" | "pet-edition";
    } = await req.json();

    if (!definition) {
      return NextResponse.json(
        { error: "Definition is required" },
        { status: 400 }
      );
    }

    const remixed = await remixDefinition(definition, mode);
    return NextResponse.json({ definition: remixed });
  } catch (error: any) {
    console.error("Remix error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remix" },
      { status: 500 }
    );
  }
}

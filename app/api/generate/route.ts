import { NextRequest, NextResponse } from "next/server";
import { generateDefinitions } from "@/lib/openai";
import { saveDefinition } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { GeneratorInput } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body: GeneratorInput = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const definitions = await generateDefinitions(body);

    // Try to get current user to associate definitions (non-blocking)
    try {
      const supabase = await createServerSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Save all definitions to DB in background
      Promise.all(
        definitions.map((def) => saveDefinition(def, user?.id))
      ).catch(console.error);
    } catch {
      // Non-critical — don't fail the request
    }

    return NextResponse.json({ definitions });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate definitions" },
      { status: 500 }
    );
  }
}

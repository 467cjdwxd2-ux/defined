import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Get current user (optional)
    let userId: string | undefined;
    try {
      const supabase = await createServerSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch {}

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await createCheckoutSession(
      items,
      userId,
      `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      `${appUrl}/generate`
    );

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout" },
      { status: 500 }
    );
  }
}

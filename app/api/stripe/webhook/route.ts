import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent, retrieveSession } from "@/lib/stripe";
import { createOrder, updateOrder } from "@/lib/supabase";
import { createPrintifyOrder } from "@/lib/printify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const fullSession = await retrieveSession(session.id);

        // Create order in DB
        await createOrder({
          id: session.id,
          userId: session.metadata?.userId || undefined,
          status: "processing",
          total: (session.amount_total || 0) / 100,
          stripeSessionId: session.id,
          createdAt: new Date().toISOString(),
        });

        // Extract shipping details from Stripe session
        if (fullSession.shipping_details?.address) {
          const addr = fullSession.shipping_details.address;
          const name =
            fullSession.shipping_details.name?.split(" ") || [];

          try {
            // Submit to Printify (in production, pull cart items from session metadata)
            // For now, log the intent
            console.log("Would submit Printify order for session:", session.id, {
              address: addr,
              name,
            });
          } catch (printifyErr) {
            console.error("Printify order failed:", printifyErr);
            // Don't fail the webhook — log and alert
          }
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.error("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

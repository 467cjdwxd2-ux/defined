import Stripe from "stripe";
import type { CartItem } from "@/types";
import { PRODUCT_LABELS } from "@/types";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function createCheckoutSession(
  items: CartItem[],
  userId?: string,
  successUrl?: string,
  cancelUrl?: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `"${item.definition.name}" ${PRODUCT_LABELS[item.product.type]}`,
          description: item.definition.definitions
            .slice(0, 2)
            .map((d) => d.text)
            .join(" · "),
          metadata: {
            definitionId: item.definitionId,
            productType: item.product.type,
            theme: item.product.theme,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url:
      successUrl || `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl || `${appUrl}/generate`,
    metadata: {
      userId: userId || "",
      itemCount: items.length.toString(),
    },
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
    },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    custom_text: {
      submit: {
        message:
          "Your custom definition product will be printed and shipped within 3-5 business days. 🎉",
      },
    },
  });

  return session;
}

export async function retrieveSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}

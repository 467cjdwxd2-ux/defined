import type { CartItem, Definition, AestheticTheme } from "@/types";

const PRINTIFY_API_URL = "https://api.printify.com/v1";
const API_KEY = process.env.PRINTIFY_API_KEY!;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID!;

// Blueprint IDs for Printify products (these are real Printify blueprint IDs)
export const PRODUCT_BLUEPRINTS = {
  hoodie: 146,       // Unisex Heavy Blend Hooded Sweatshirt
  tshirt: 6,         // Unisex Softstyle T-Shirt
  mug: 68,           // White Glossy Mug
  tote: 77,          // Tote Bag
  journal: 446,      // Premium Matte Notebook
  sticker: 358,      // Kiss-Cut Sticker
} as const;

async function printifyFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${PRINTIFY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function getProducts() {
  const res = await printifyFetch(`/shops/${SHOP_ID}/products.json`);
  return res.json();
}

export async function getBlueprint(blueprintId: number) {
  const res = await printifyFetch(`/catalog/blueprints/${blueprintId}.json`);
  return res.json();
}

export async function getPrintProviders(blueprintId: number) {
  const res = await printifyFetch(
    `/catalog/blueprints/${blueprintId}/print_providers.json`
  );
  return res.json();
}

function generateDefinitionText(definition: Definition): string {
  const entries = definition.definitions.slice(0, 3);
  return entries.map((e) => `${e.number}. ${e.text}`).join("\n");
}

function getThemeColors(theme: AestheticTheme): {
  background: string;
  text: string;
  accent: string;
} {
  const themes: Record<
    AestheticTheme,
    { background: string; text: string; accent: string }
  > = {
    minimal: { background: "#FFFFFF", text: "#1a1a1a", accent: "#8338ec" },
    retro: { background: "#F5E6D3", text: "#2D1B00", accent: "#FF6B35" },
    y2k: { background: "#FF69B4", text: "#FFFFFF", accent: "#00FFFF" },
    grunge: { background: "#1a1a1a", text: "#E0E0E0", accent: "#FF4500" },
    "soft-life": { background: "#FDF4FF", text: "#4A1942", accent: "#D946EF" },
    cottagecore: { background: "#F0EDE1", text: "#3D2B1F", accent: "#6B8F71" },
    "luxury-neutral": {
      background: "#F8F5F0",
      text: "#1C1C1C",
      accent: "#C9A84C",
    },
    "chaotic-meme": { background: "#000000", text: "#FFFFFF", accent: "#FF006E" },
  };
  return themes[theme] || themes.minimal;
}

// In a real implementation, this would upload artwork to Printify's media library
// and create a product with the definition text rendered as an image
export async function createPrintifyProduct(
  item: CartItem
): Promise<{ productId: string; variantId: number }> {
  const { definition, product } = item;
  const blueprintId =
    PRODUCT_BLUEPRINTS[product.type as keyof typeof PRODUCT_BLUEPRINTS];

  // This is a simplified version - in production you'd:
  // 1. Generate a design image with the definition text
  // 2. Upload it to Printify's media library
  // 3. Create a product with the design applied

  const designText = generateDefinitionText(definition);
  const colors = getThemeColors(product.theme);

  // Mock response for development - replace with actual Printify API calls
  console.log("Creating Printify product:", {
    name: `"${definition.name}" ${product.type}`,
    blueprintId,
    designText,
    colors,
  });

  return {
    productId: `mock-product-${Date.now()}`,
    variantId: 1,
  };
}

export async function createPrintifyOrder(
  stripeSessionId: string,
  items: CartItem[],
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    country: string;
    region: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
  }
) {
  const lineItems = items.map((item) => ({
    product_id: item.printifyProductId,
    variant_id: item.printifyVariantId,
    quantity: item.quantity,
  }));

  const orderData = {
    external_id: stripeSessionId,
    label: `Defined Order - ${stripeSessionId.slice(-8)}`,
    line_items: lineItems,
    shipping_method: 1,
    is_printify_express: false,
    send_shipping_notification: true,
    address_to: {
      first_name: shippingAddress.firstName,
      last_name: shippingAddress.lastName,
      email: shippingAddress.email,
      phone: shippingAddress.phone || "",
      country: shippingAddress.country,
      region: shippingAddress.region,
      address1: shippingAddress.address1,
      address2: shippingAddress.address2 || "",
      city: shippingAddress.city,
      zip: shippingAddress.zip,
    },
  };

  const res = await printifyFetch(`/shops/${SHOP_ID}/orders.json`, {
    method: "POST",
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Printify order failed: ${error}`);
  }

  return res.json();
}

export async function getPrintifyOrder(orderId: string) {
  const res = await printifyFetch(`/shops/${SHOP_ID}/orders/${orderId}.json`);
  return res.json();
}

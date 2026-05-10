import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import type { Definition, Order, UserProfile } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser client (public)
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server client (uses cookies for auth)
export async function createServerSupabaseClient() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
          );
        } catch {}
      },
    },
  });
}

// Admin client (bypasses RLS)
export function createAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ─── Definition helpers ────────────────────────────────────────────────────

export async function saveDefinition(definition: Definition, userId?: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("definitions")
    .upsert({
      id: definition.id,
      name: definition.name,
      part_of_speech: definition.partOfSpeech,
      pronunciation: definition.pronunciation,
      origin: definition.origin,
      definitions: definition.definitions,
      tone: definition.tone,
      relationship: definition.relationship,
      user_id: userId || null,
      created_at: definition.createdAt,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDefinitionById(id: string): Promise<Definition | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("definitions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    partOfSpeech: data.part_of_speech,
    pronunciation: data.pronunciation,
    origin: data.origin,
    definitions: data.definitions,
    tone: data.tone,
    relationship: data.relationship,
    createdAt: data.created_at,
  };
}

export async function getDefinitionsByName(name: string): Promise<Definition[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("definitions")
    .select("*")
    .ilike("name", name)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !data) return [];

  return data.map((d) => ({
    id: d.id,
    name: d.name,
    partOfSpeech: d.part_of_speech,
    pronunciation: d.pronunciation,
    origin: d.origin,
    definitions: d.definitions,
    tone: d.tone,
    relationship: d.relationship,
    createdAt: d.created_at,
  }));
}

export async function getTrendingDefinitions(limit = 6): Promise<Definition[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("definitions")
    .select("*")
    .order("share_count", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((d) => ({
    id: d.id,
    name: d.name,
    partOfSpeech: d.part_of_speech,
    pronunciation: d.pronunciation,
    origin: d.origin,
    definitions: d.definitions,
    tone: d.tone,
    relationship: d.relationship,
    createdAt: d.created_at,
  }));
}

export async function incrementShareCount(definitionId: string) {
  const admin = createAdminClient();
  await admin.rpc("increment_share_count", { def_id: definitionId });
}

// ─── Order helpers ──────────────────────────────────────────────────────────

export async function createOrder(order: Partial<Order>) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrder(id: string, updates: Partial<Order>) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Analytics helpers ──────────────────────────────────────────────────────

export async function getAdminAnalytics() {
  const admin = createAdminClient();

  const [
    { count: totalDefinitions },
    { data: trendingTones },
    { data: topNames },
    { data: recentOrders },
  ] = await Promise.all([
    admin.from("definitions").select("*", { count: "exact", head: true }),
    admin.rpc("trending_tones"),
    admin.rpc("top_names"),
    admin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  return { totalDefinitions, trendingTones, topNames, recentOrders };
}

import { redirect } from "next/navigation";

// Pet definitions use the same /define/[name] page
// This route redirects with a relationship hint for SEO
export default async function PetPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  redirect(`/define/${name}?relationship=pet`);
}

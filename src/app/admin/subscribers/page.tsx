import SubscribersClient from "@/components/admin/SubscribersClient";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSubscribersPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black">Subscribers</h1>
          <p className="text-sm text-brand-charcoal/60 mt-1">{subscribers?.length ?? 0} email leads captured</p>
        </div>
      </div>
      <SubscribersClient subscribers={subscribers ?? []} />
    </div>
  );
}

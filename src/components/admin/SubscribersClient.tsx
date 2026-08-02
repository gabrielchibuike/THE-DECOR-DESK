"use client";

import { Download } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  source_page: string | null;
  created_at: string;
}

export default function SubscribersClient({ subscribers }: { subscribers: Subscriber[] }) {
  const exportCSV = () => {
    const header = "Email,Source,Signup Date\n";
    const rows = subscribers
      .map((s) => `"${s.email}","${s.source_page ?? ""}","${new Date(s.created_at).toLocaleDateString()}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 border border-brand-taupe-light bg-brand-warmwhite text-brand-charcoal text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-cream transition disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-brand-taupe-light bg-brand-cream/50 text-[10px] font-semibold uppercase tracking-widest text-brand-charcoal/60">
          <span className="col-span-5">Email</span>
          <span className="col-span-4">Source</span>
          <span className="col-span-3">Signed Up</span>
        </div>
        <div className="divide-y divide-brand-taupe-light/40">
          {subscribers.map((sub) => (
            <div key={sub.id} className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-brand-cream/30 transition-colors">
              <div className="col-span-5 text-sm font-medium text-brand-black">{sub.email}</div>
              <div className="col-span-4 text-xs text-brand-charcoal/60">{sub.source_page ?? "—"}</div>
              <div className="col-span-3 text-xs text-brand-charcoal/60">{new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
            </div>
          ))}
          {subscribers.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-brand-charcoal/50">No subscribers yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

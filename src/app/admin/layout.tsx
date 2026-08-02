import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in, render child route (e.g. login form) directly without sidebar shell.
  // Middleware handles route protection for all other /admin/* routes.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-brand-cream flex">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto font-sans">
        {children}
      </main>
    </div>
  );
}

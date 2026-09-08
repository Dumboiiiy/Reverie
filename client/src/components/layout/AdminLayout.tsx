import { Link, Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/common/sidebar";
import { UserButton } from "@clerk/react";
import { Store } from "lucide-react";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-secondary/45">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border px-4 backdrop-blur lg:px-6">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-white/10 transition"
            >
              <Store className="h-4 w-4" />
              <span>Back to Store</span>
            </Link>

            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
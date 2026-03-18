import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, Users } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">

        <div className="p-6 font-bold text-xl">
          Admin Panel
        </div>

        <nav className="flex flex-col gap-2 px-4">

          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <ShoppingCart size={18} />
            Orders
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <Package size={18} />
            Products
          </Link>

          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
          >
            <Users size={18} />
            Customers
          </Link>

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}
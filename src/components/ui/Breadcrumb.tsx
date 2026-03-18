import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-neutral-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="hover:text-neutral-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight size={16} className="text-neutral-400" />}
        </div>
      ))}
    </nav>
  );
}

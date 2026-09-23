"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin", label: "📊 Dashboard" },
    { href: "/admin/packages", label: "🎒 Packages" },
    { href: "/admin/blogs", label: "📝 Blogs" },
    { href: "/admin/leads", label: "📥 Leads" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <h2 className={styles.brandTitle}>Hassle Free Travels</h2>
        <div className={styles.brandSub}>Package CMS &amp; Leads</div>
      </div>

      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <button
          type="button"
          onClick={handleLogout}
          className={styles.logoutBtn}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

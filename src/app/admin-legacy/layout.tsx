import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin Panel | Hassle Free Travels",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

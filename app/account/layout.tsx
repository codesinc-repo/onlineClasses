import { AccountGuard } from "@/components/AccountGuard";
import { AccountSidebar } from "@/components/AccountSidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <AccountGuard>
      <section className="py-10 md:py-14">
        <div className="container grid gap-8 lg:grid-cols-[240px_1fr]">
          <AccountSidebar />
          <div>{children}</div>
        </div>
      </section>
    </AccountGuard>
  );
}

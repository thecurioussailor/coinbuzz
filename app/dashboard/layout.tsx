import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3555] via-[#040B1B] to-[#1A3555]">
      <div className="mx-auto max-w-[1400px] p-3 md:p-4">
        <div className="flex gap-3 md:gap-8">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Navbar />
            <div className="mt-3 md:mt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
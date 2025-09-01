"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo, IconGrid, IconChart, IconWallet, IconUsers, IconSettings, IconInfo, IconPower } from "@/components/Icons";
import { GiAbstract048 } from "react-icons/gi";
import { RiDashboardFill, RiLineChartFill, RiWalletFill, RiGroupFill, RiSettingsFill, RiInformationFill } from "react-icons/ri";

type Item = {
  href: string;
  label: string;
  Icon: React.ElementType;
};

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", Icon: RiDashboardFill },
  { href: "/#", label: "Markets", Icon: RiLineChartFill },
  { href: "/#", label: "Wallet", Icon: RiWalletFill },
  { href: "/#", label: "Community", Icon: RiGroupFill },
  { href: "/#", label: "Settings", Icon: RiSettingsFill },
  { href: "/#", label: "Help", Icon: RiInformationFill },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[84px] shrink-0">
      <div className="h-full w-full flex flex-col items-center">
        <div className="h-20 w-20 mt-1 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-400/20 ring-1 ring-purple-400/30 grid place-items-center text-white">
            <GiAbstract048 className="h-10 w-10" />
        </div>
        <div className="mt-10 py-4 flex flex-col gap-4 w-full h-full rounded-full bg-white/[0.03] ring-1 ring-white/10 backdrop-blur items-center">
          {items.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative grid place-items-center h-16 w-16 rounded-full transition-all
                ${active ? "bg-gradient-to-b from-orange-500/30 to-purple-500/30 ring-1 ring-white/20" : "bg-white/[0.02] hover:bg-white/[0.04] ring-1 ring-white/10"}`}
                title={label}
              >
                <Icon className={`h-6 w-6 ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}/>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
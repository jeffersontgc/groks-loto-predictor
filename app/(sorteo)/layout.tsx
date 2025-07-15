import React from "react";
import Link from "next/link";
import { MdHomeFilled } from "react-icons/md";
import { TbGoGame } from "react-icons/tb";
import { MdSettingsSuggest } from "react-icons/md";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navs = [
    {
      name: "Inicio",
      href: "/",
      icon: MdHomeFilled,
    },
    {
      name: "Sorteos",
      href: "/sorteos",
      icon: TbGoGame,
    },
    {
      name: "Sugerir Números",
      href: "/suggestNumbers",
      icon: MdSettingsSuggest,
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900">
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-2 py-4 bg-gray-900">
            {navs.map((nav) => (
              <Link
                key={nav.name}
                href={nav.href}
                className="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <nav.icon className="mr-3" />
                {nav.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

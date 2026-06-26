"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Menu, X, Play, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log("Current User:", user);

  const navItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/plans" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        }
      }
    });
  };

  const dashBoardLink = {
    seeker: "/dashboard/seeker",
    recruiter: '/dashboard/recruiter',

  }

  if (user?.email) {
    navItems.push({
      label: 'Dashboard',
      href: dashBoardLink[user?.role || 'seeker']

    })
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111111] px-3 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-xl">

        {/* LEFT - Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg">
              <Play
                className="ml-0.5 h-4 w-4 fill-white text-white"
                strokeWidth={1.5}
              />
            </div>
            <div className="leading-none">
              <h1 className="text-lg font-bold tracking-tight text-white">
                HireSphere
              </h1>
              <p className="text-sm font-medium leading-none text-white/60">
                Platform
              </p>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 px-6 py-3">
            {navItems.map((item) => (
              <React.Fragment key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
                <div className="h-5 w-px bg-white/10" />
              </React.Fragment>
            ))}

            {/* Auth Layout State */}
            {isPending ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : user ? (
              <>
                <span className="text-sm font-medium text-white">
                  Hi, {user.name}
                </span>
                <div className="h-5 w-px bg-white/10" />
                <Button
                  onClick={handleSignOut}
                  size="sm"
                  variant="light"
                  className="text-red-400 hover:text-red-300 font-medium"
                  startContent={<LogOut size={16} />}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Sign In
                </Link>
                <Link href={"/signup"}>
                  <Button
                    as={Link}
                    href="/signup"
                    radius="lg"
                    className="h-10 bg-white px-5 text-sm font-semibold text-black shadow-lg"
                  >
                    Get Started
                  </Button></Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-white transition hover:bg-white/5 md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/5 bg-[#18181b] p-5 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            {isPending ? (
              <span className="px-4 py-3 text-sm text-gray-400">Loading...</span>
            ) : user ? (
              <div className="flex flex-col gap-2 px-4 py-2">
                <span className="text-sm font-medium text-white">
                  Logged in as: {user.name}
                </span>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="mt-2 w-full bg-red-500/20 text-red-400 font-semibold"
                  radius="lg"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-violet-400 transition hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  as={Link}
                  href="/signup"
                  className="mt-2 w-full bg-white font-semibold text-black"
                  radius="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
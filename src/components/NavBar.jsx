"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X, Play } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Company",
      href: "/company",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111111] px-3 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/5 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
        
        {/* LEFT */}
        <div className="flex items-center gap-10">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg">
              <Play
                className="ml-0.5 h-4 w-4 fill-white text-white"
                strokeWidth={1.5}
              />
            </div>

            <div className="leading-none">
              <h1 className="text-lg font-bold tracking-tight text-white">
                HireSphere
              </h1>

              <p className="text-sm font-medium leading-none text-white">
                Platform
              </p>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-8 rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-4">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {item.label}
                </Link>

                {index === 2 ? null : (
                  <div className="h-5 w-px bg-white/10" />
                )}
              </React.Fragment>
            ))}

            <div className="h-5 w-px bg-white/10" />

            <Link
              href="/signup"
              className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/signup"
              radius="lg"
              className="ml-2 h-11 bg-white px-6 text-sm font-semibold text-black shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-white transition hover:bg-white/5 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
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

            <Link
              href="/login"
              className="rounded-xl px-4 py-3 text-sm font-medium text-violet-400 transition hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/register"
              className="mt-2 w-full bg-white font-semibold text-black "
              radius="lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
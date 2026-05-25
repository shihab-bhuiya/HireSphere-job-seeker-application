"use client";

import React from "react";
import Link from "next/link";
import {
  FacebookIcon,
  LinkedinIcon,
  PinIcon,
  Play,
} from "lucide-react";
import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0d] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-white/5 bg-black px-8 py-14">
        
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Left Content */}
          <div className="space-y-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Play
                  className="ml-0.5 h-4 w-4 fill-white text-white"
                  strokeWidth={1.5}
                />
              </div>

              <div className="leading-none">
                <h1 className="text-lg font-bold text-white">
                  HireSphere
                </h1>

                <p className="text-sm font-medium text-white">
                  Platform
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="max-w-xs text-sm leading-7 text-gray-400">
              The AI-native career platform. Built for people
              who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-violet-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
              >
                <PinIcon className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-violet-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Job discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Navigations
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Help center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Career library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-500">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/brand"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center md:flex-row">
          
          <p className="text-sm text-gray-500">
            Copyright 2026 — HireSphere
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Terms & Policy
            </Link>

            <span className="text-gray-700">•</span>

            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";
import React from 'react';
import { Card } from "@heroui/react";

/**
 * Reusable Individual Stats Card using HeroUI v3 Compound Pattern
 */
const StatsCard = ({ title, value, icon: Icon }) => (
  <Card 
    // In HeroUI v3, styling variants, radius, and shadows are handled directly via Tailwind
    className="bg-[#18181b] border border-neutral-800 text-white rounded-lg flex-1"
  >
    {/* Card.Content replaces CardBody in v3 */}
    <Card.Content className="p-6 flex flex-col gap-4">
      
      {/* Icon Container */}
      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
        {Icon && <Icon size={18} />}
      </div>

      {/* Content layout */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
          {title}
        </p>
        <p className="text-2xl font-semibold tracking-tight text-neutral-100">
          {value}
        </p>
      </div>
      
    </Card.Content>
  </Card>
);

/**
 * Main Feedable Wrapper
 * @param {Array} statsData - Array of objects containing { title, value, icon }
 */
export default function DashboardStats({ statsData = [] }) {
  if (!statsData.length) return null;

  return (
    <div className="w-full">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
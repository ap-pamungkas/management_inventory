"use client";

import React, { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className={`p-3.5 rounded-xl ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

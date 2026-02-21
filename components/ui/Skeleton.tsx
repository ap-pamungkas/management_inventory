"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-slate-200 rounded ${className}`}
        />
      ))}
    </>
  );
}

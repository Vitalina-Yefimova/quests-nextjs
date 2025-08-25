"use client";

interface DividerVectorProps {
  className?: string;
}

export default function DividerVector({ className = "" }: DividerVectorProps) {
  return <div className={className} />;
}
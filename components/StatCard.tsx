"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-sm transition-colors hover:border-sky-400/30 hover:bg-[var(--surface-hover)]"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1.5 truncate text-lg font-semibold text-[var(--text-primary)]">
        {value}
      </p>
    </motion.div>
  );
}

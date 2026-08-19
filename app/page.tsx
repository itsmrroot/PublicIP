"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  RefreshCw,
  MapPin,
  Building2,
  Clock,
  Hash,
  Globe2,
  Wifi,
} from "lucide-react";
import { fetchIpInfo } from "@/lib/fetchIpInfo";
import { IPInfo } from "@/lib/types";
import StatCard from "@/components/StatCard";
import MapErrorBoundary from "@/components/MapErrorBoundary";

const IPMap = dynamic(() => import("@/components/IPMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

export default function Home() {
  const [info, setInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIpInfo();
      setInfo(data);
    } catch (e) {
      setError("Couldn't locate your IP right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCopy = () => {
    if (!info) return;
    navigator.clipboard.writeText(info.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 animate-blob rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -right-32 top-40 h-96 w-96 animate-blob rounded-full bg-violet-500/20 blur-3xl [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-emerald-500/10 blur-3xl [animation-delay:6s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-12 sm:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 shadow-lg shadow-sky-500/20">
              <Globe2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              WhereAmI
            </span>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </motion.header>

        {/* Hero / IP display */}
        <section className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-400"
          >
            Your public IP address
          </motion.p>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto h-16 w-72 max-w-full animate-pulse rounded-2xl bg-white/5"
              />
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-400"
              >
                {error}
              </motion.div>
            ) : (
              <motion.div
                key="ip"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <h1 className="bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text font-mono text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                  {info?.ip}
                </h1>
                <button
                  onClick={handleCopy}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:bg-white/10"
                  aria-label="Copy IP address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {info && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-gray-400"
            >
              {info.flagEmoji} {info.city}, {info.region}, {info.country}
            </motion.p>
          )}
        </section>

        {/* Stats grid */}
        {info && !loading && (
          <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard icon={MapPin} label="City" value={info.city} delay={0.05} />
            <StatCard icon={Globe2} label="Region" value={info.region} delay={0.1} />
            <StatCard icon={Hash} label="Postal" value={info.postal} delay={0.15} />
            <StatCard icon={Clock} label="Timezone" value={info.timezone} delay={0.2} />
            <StatCard icon={Building2} label="ISP" value={info.isp} delay={0.25} />
            <StatCard icon={Wifi} label="ASN" value={info.asn} delay={0.3} />
          </section>
        )}

        {/* Map */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative h-[420px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/40 sm:h-[480px]"
        >
          {info && !loading ? (
            <MapErrorBoundary>
              <IPMap info={info} />
            </MapErrorBoundary>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <MapPin className="h-6 w-6 animate-pulse-slow" />
                <span className="text-sm">
                  {error ? "Map unavailable" : "Locating you on the map…"}
                </span>
              </div>
            </div>
          )}
        </motion.section>

        <footer className="mt-8 text-center text-xs text-gray-600">
          Location is approximate, derived from your IP address via public
          geolocation services.
        </footer>
      </div>
    </main>
  );
}

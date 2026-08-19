"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

export default class MapErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("Map failed to render:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-2 text-red-500 dark:text-red-400">
          <AlertTriangle className="h-6 w-6" />
          <span className="text-sm">Map failed to load</span>
          <span className="max-w-md text-center text-xs text-red-500/70 dark:text-red-400/70">
            {this.state.error.message}
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

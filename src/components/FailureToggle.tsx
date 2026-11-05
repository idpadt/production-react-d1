"use client";

import { useSyncExternalStore } from "react";

// Classroom switch: when on, every write on the server fails on purpose.
// The value lives in a cookie so the server can read it too.

function subscribe(onChange: () => void) {
  window.addEventListener("pg-fail-change", onChange);
  return () => window.removeEventListener("pg-fail-change", onChange);
}

const readCookie = () => document.cookie.includes("pg-fail=1");

export default function FailureToggle() {
  const on = useSyncExternalStore(subscribe, readCookie, () => false);

  function toggle(next: boolean) {
    document.cookie = `pg-fail=${next ? "1" : "0"}; path=/; samesite=lax`;
    window.dispatchEvent(new Event("pg-fail-change"));
  }

  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => toggle(e.target.checked)}
        className="accent-brand"
      />
      Simulasi gagal server
    </label>
  );
}

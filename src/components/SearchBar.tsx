"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchUsersAPI, type SearchUser } from "@/src/services/search.api";

type SearchBarProps = {
  className?: string;
  dropdownPlacement?: "top" | "bottom";
};

export default function SearchBar({
  className = "",
  dropdownPlacement = "bottom",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setError(null);
      setLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchUsersAPI(trimmedQuery);
        setUsers(result);
        setOpen(true);
      } catch (error) {
        setUsers([]);
        setError(
          error instanceof Error ? error.message : "Unable to search users."
        );
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setUsers([]);
    setError(null);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full max-w-xs ${className}`}>
      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 transition focus-within:border-cyan-300/40">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />

        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search users"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500"
        />

        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            className="text-slate-400 transition hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {open && query.trim() ? (
        <div
          className={`absolute left-0 right-0 z-30 max-h-72 overflow-y-auto rounded-md border border-white/10 bg-[#081019] shadow-[0_20px_70px_rgba(0,0,0,0.35)] ${
            dropdownPlacement === "top"
              ? "bottom-full mb-2"
              : "top-full mt-2"
          }`}
        >
          {loading ? (
            <p className="px-4 py-3 text-sm text-slate-400">Searching...</p>
          ) : error ? (
            <p className="px-4 py-3 text-sm text-rose-300">{error}</p>
          ) : users.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-400">No users found.</p>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-800 text-xs text-white">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={`${user.username}'s profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.username[0]?.toUpperCase() || "?"
                  )}
                </div>

                <span className="min-w-0 truncate text-sm font-medium text-slate-100">
                  @{user.username}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

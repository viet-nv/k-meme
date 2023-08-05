"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { authors } from "../constants";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const author = searchParams.get("author") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams({
        query,
        author,
      });
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="w-full mb-4 flex gap-4">
      <input
        value={query}
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("query", e.target.value),
          );
        }}
        className="p-3 rounded-xl w-full flex-[2]"
        placeholder="Search content..."
      />

      <select
        className="p-3 rounded-xl flex-[1]"
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("author", e.target.value),
          );
        }}
      >
        <option value="">All</option>
        {authors.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

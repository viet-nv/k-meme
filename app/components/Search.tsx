"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { authors } from "../constants";
import '../globals.css';

function useDebounce(effect: any, dependencies: any, delay: number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const author = searchParams.get("author") || "";

  const [searchVal, setSearchVal] = useState(query);

  useDebounce(
    () => {
      router.push(pathname + "?" + createQueryString("query", searchVal));
    },
    [searchVal],
    300,
  );

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
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
        className="p-3 rounded-xl w-full flex-[2]"
        id="inputBox"
        placeholder="Search content..."
      />

      <select
        className="p-3 rounded-xl flex-[1]"
        id="inputBox"
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("author", e.target.value),
          );
        }}
      >
        <option value="">All</option>
        {authors.map((item) => (
          <option id="inputBox" value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

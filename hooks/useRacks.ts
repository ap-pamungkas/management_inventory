"use client";

import { useState, useEffect, useCallback } from "react";
import type { Rack } from "@/types/rack";
import toast from "react-hot-toast";

export const useRacks = () => {
  const [data, setData] = useState<Rack[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchRacks = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
      });

      const response = await fetch(`/api/rack?${query.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data rak");

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRacks();
    }, 300); // Simple debounce for search

    return () => clearTimeout(timer);
  }, [fetchRacks]);

  return {
    data,
    total,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    isLoading,
    refresh: fetchRacks,
    totalPages:
      limit === 1000000 ? 1 : Math.ceil(total / (limit === 0 ? total : limit)),
  };
};

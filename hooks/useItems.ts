"use client";

import { useState, useEffect, useCallback } from "react";
import type { Item } from "@/types/item";
import toast from "react-hot-toast";

export const useItems = () => {
  const [data, setData] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit === 1000000 ? "all" : limit.toString(),
        search: search,
      });

      const response = await fetch(`/api/item?${query.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data barang");

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
      fetchItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchItems]);

  useEffect(() => {
    setPage(1);
  }, [search]);

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
    refresh: fetchItems,
    totalPages:
      limit === 1000000 ? 1 : Math.ceil(total / (limit === 0 ? total : limit)),
  };
};

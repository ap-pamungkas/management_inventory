"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export const useUsers = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | "all">(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
      });

      const response = await fetch(`/api/user?${query.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      toast.error("Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages =
    limit === "all" ? 1 : Math.ceil(total / (limit === 0 ? total : limit));

  return {
    data,
    total,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch: (value: string) => {
      setSearch(value);
      setPage(1);
    },
    isLoading,
    refresh: fetchUsers,
    totalPages,
  };
};

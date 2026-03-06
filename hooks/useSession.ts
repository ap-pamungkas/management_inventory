"use client";

import { useState, useEffect } from "react";

export interface UserSession {
  id: number;
  username: string;
  name: string;
  role: string;
}

export const useSession = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return { user, isLoading, refresh: fetchSession };
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2, Lock, User, Box } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      toast.success(result.message);
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-neutral-950 text-white font-[family-name:var(--font-geist-sans)]">
      {/* Left Design - Hidden on small screens */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -ml-48 -mb-48"></div>

          {/* Abstract Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Box className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Stora</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Warehouse management <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                reimagined.
              </span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-md">
              A comprehensive solution for tracking, organizing, and optimizing
              your assets with smart positioning.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 max-w-md">
            <p className="text-sm text-neutral-400 italic">
              "Smart organization is the foundation of every successful
              operation."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500"></div>
              <div>
                <p className="text-sm font-semibold text-white">Stora OS</p>
                <p className="text-xs text-neutral-500">Professional Edition</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3 text-slate-900 border-b-2 border-indigo-600 pb-2">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic">
                STORA.
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-400 font-medium font-[family-name:var(--font-geist-sans)]">
              Enter your credentials to access the Stora dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    {...register("username")}
                    type="text"
                    className={`w-full bg-slate-50 border ${errors.username ? "border-red-500" : "border-slate-100"} focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 font-[family-name:var(--font-geist-sans)]`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1 ml-1 font-bold">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    className={`w-full bg-slate-50 border ${errors.password ? "border-red-500" : "border-slate-100"} focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/5 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 font-[family-name:var(--font-geist-sans)]`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 ml-1 font-bold">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2 font-bold">
                  Sign In to Stora
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-[0.2em] pt-4">
            Secured by Stora Shield &copy; 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}

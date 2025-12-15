import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.email) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.password) return "Please enter your password.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the token/jwttoke, gmail (email), and name, then go to dashboard
        localStorage.setItem("token", data.jwttoke); // persist token
        localStorage.setItem("gmail", data.email || form.email); // persist email (gmail)
        localStorage.setItem("name", data.name || "User"); // persist name (fallback to "User" if not present)
        navigate("/dashboard");
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      setError("Network error. Please check if the server is running.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1024] via-[#0a122c] to-[#0c1b37] flex items-center justify-center px-6 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 flex gap-6"
      >
        {/* Left: illustrative column (hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center gap-6 px-4">
          <div className="text-white">
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-indigo-200/80">
              <span className="inline-block h-2 w-2 rounded-full bg-pink-400" />
              TaskBox
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight mt-1">Welcome back</h3>
            <p className="mt-2 text-sm text-white/80">Sign in to continue. Fast, secure, and designed to impress.</p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">UI</div>
              <div>
                <div className="text-sm font-semibold text-white">Pixel-perfect UI</div>
                <div className="text-xs text-white/70">Animations, gradients & micro-interactions</div>
              </div>
            </div>
          </div>

          <div className="mt-1 w-full rounded-lg shadow-md overflow-hidden border border-white/10">
            <svg viewBox="0 0 300 180" className="w-full block">
              <rect rx="16" width="100%" height="100%" fill="#071026" />
              <g transform="translate(24,30)" fill="#ffffff" opacity="0.9">
                <rect y="0" width="80" height="12" rx="6" />
                <rect y="28" width="220" height="10" rx="5" />
                <rect y="52" width="180" height="10" rx="5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right: form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.h2 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.04 }} className="text-white text-2xl font-bold mb-1">
            Sign in to your account
          </motion.h2>
          <p className="text-sm text-white/80 mb-6">Enter your credentials below. We’ll keep you signed in on this device.</p>

          {error && <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-200 border border-red-600/30">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Email</label>
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@company.com"
                  className="w-full py-3 pl-4 pr-12 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-indigo-400/80 shadow-inner shadow-black/10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-sm">@</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full py-3 pl-4 pr-12 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-indigo-400/80 shadow-inner shadow-black/10"
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/80">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-white/80">
              <label className="inline-flex items-center gap-2">
                <input name="remember" checked={form.remember} onChange={handleChange} type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/6" />
                <span>Remember me</span>
              </label>

              <a href="/forgot-password" className="text-indigo-300 hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.01] transform transition focus:outline-none focus:ring-2 focus:ring-pink-400/60">
              Sign in
            </button>

            <div className="text-center text-sm text-white/70">or continue with</div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="w-full py-2 rounded-xl border border-white/10 bg-white/6 flex items-center justify-center gap-2 hover:scale-105 transition text-white/90">
                Google
              </button>
              <button type="button" className="w-full py-2 rounded-xl border border-white/10 bg-white/6 flex items-center justify-center gap-2 hover:scale-105 transition text-white/90">
                GitHub
              </button>
            </div>

            <div className="text-center text-sm text-white/70 mt-2">
              Don’t have an account? <a href="/register" className="text-indigo-300 font-medium hover:underline">Create one</a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

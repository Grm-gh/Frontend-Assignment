import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", accept: false });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.name) return "Please enter your full name.";
    if (!form.email) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.accept) return "You must agree to the terms to continue.";
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
    setLoading(true);
    
    try {
      const url = "http://localhost:5000/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check if the server is running.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1024] via-[#0a122c] to-[#0c1b37] flex items-center justify-center px-6 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-500/18 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative w-full max-w-3xl bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:flex md:gap-6">
        <div className="md:w-1/2 flex flex-col justify-center px-4 py-6">
          <h2 className="text-3xl font-extrabold text-white mb-2">Create your account</h2>
          <p className="text-sm text-white/80">Start your free trial. No credit card required.</p>

          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-3 bg-white/6 rounded-xl p-3 border border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold">✨</div>
              <div>
                <div className="text-sm text-white font-semibold">Everything you need</div>
                <div className="text-xs text-white/70">Design system, auth & demo data</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/6 rounded-xl p-3 border border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white font-bold">⚡</div>
              <div>
                <div className="text-sm text-white font-semibold">Fast setup</div>
                <div className="text-xs text-white/70">Get started in minutes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 px-4 py-6">
          {error && <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-200 border border-red-600/30">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full py-3 px-4 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-emerald-400/80 shadow-inner shadow-black/10" />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@company.com" className="w-full py-3 px-4 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-emerald-400/80 shadow-inner shadow-black/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-white/80 mb-2">Password</label>
                <div className="relative">
                  <input name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full py-3 px-4 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-emerald-400/80 shadow-inner shadow-black/10" />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/80">{showPassword ? "Hide" : "Show"}</button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">Confirm</label>
                <input name="confirm" value={form.confirm} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Confirm password" className="w-full py-3 px-4 rounded-xl bg-white/8 border border-white/10 placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-emerald-400/80 shadow-inner shadow-black/10" />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" name="accept" checked={form.accept} onChange={handleChange} className="w-4 h-4 rounded border-white/30 bg-white/6" />
              <span>I agree to the <a className="text-indigo-300 underline" href="#">terms</a> and privacy policy.</span>
            </label>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400/60">
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="text-center text-sm text-white/70">or continue with</div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="w-full py-2 rounded-xl border border-white/10 bg-white/6 flex items-center justify-center gap-2 hover:scale-105 transition text-white/90">Google</button>
              <button type="button" className="w-full py-2 rounded-xl border border-white/10 bg-white/6 flex items-center justify-center gap-2 hover:scale-105 transition text-white/90">GitHub</button>
            </div>

            <div className="text-center text-sm text-white/70 mt-2">Already have an account? <a href="/login" className="text-indigo-300 font-medium hover:underline">Sign in</a></div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

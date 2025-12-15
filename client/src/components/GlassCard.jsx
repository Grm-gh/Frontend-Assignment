import React from "react";
import { motion } from "framer-motion";

export default function GlassPanel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="
        relative 
        w-[420px]
        bg-white/10 
        backdrop-blur-2xl 
        border border-white/20 
        rounded-3xl 
        p-8 
        shadow-[0_0_60px_-15px_rgba(0,0,0,0.6)]
      "
    >
      {/* subtle glowing edge */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise rounded-3xl pointer-events-none" />

      {children}
    </motion.div>
  );
}

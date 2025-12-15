import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const dark = false;
  const displayName = localStorage.getItem("name") || localStorage.getItem("userName") || "User Name";
  const displayEmail = localStorage.getItem("gmail") || localStorage.getItem("userEmail") || "user@email.com";

  const navigate = useNavigate();

  const addTask = () => {
    if (!title) return;
    setTasks([{ id: Date.now(), title, description }, ...tasks]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const logout = () => {
    localStorage.removeItem("token"); // optional
    navigate("/login");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-100 dark:from-[#12141b] dark:via-[#181c28] dark:to-[#151622] text-gray-900 dark:text-gray-100 flex transition-colors overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl" />
        </div>
        {/* Sidebar */}
        <aside className="w-72 bg-white/80 dark:bg-[#222337]/80 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col shadow-2xl backdrop-blur-lg">
          <div className="p-8 border-b dark:border-gray-800 bg-gradient-to-r from-blue-500/20 to-purple-900/10 rounded-tr-3xl">
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <span className="inline-block w-6 h-6 bg-indigo-500 rounded-lg mr-2 shadow-md animate-bounce" />
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
                TASKBOX
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-lg border-2 border-white dark:border-gray-700">
              U
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {displayEmail}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-2 mx-8">
            <button
              onClick={logout}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:scale-105 transition active:scale-95"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 md:px-12 py-10 md:py-16 flex flex-col gap-6 min-h-screen overflow-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-200/80 mb-1">Dashboard</p>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 drop-shadow-md tracking-tight">
                Welcome back, {displayName.split(" ")[0]}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Stay on top of your tasks with a clean, minimal workspace.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="flex-1 px-5 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:border-indigo-400 shadow-sm dark:bg-[#27293d] dark:border-gray-700 bg-white/70 backdrop-blur-md placeholder-gray-500"
              />
            </div>
          </motion.div>

          {/* Add Task */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 dark:bg-[#23253b]/80 rounded-2xl shadow-xl p-6 mb-6 border border-indigo-100 dark:border-[#292c43] flex flex-col md:flex-row items-stretch gap-3 md:gap-5"
          >
            <div className="flex-1 flex flex-col gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-indigo-400 dark:bg-[#292c43] dark:border-[#373b57] bg-white/70 placeholder-gray-800 dark:placeholder-gray-300 font-semibold shadow"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-pink-300 dark:bg-[#292c43] dark:border-[#373b57] bg-white/70 placeholder-gray-800 dark:placeholder-gray-300 resize-none shadow"
                rows={2}
              />
            </div>
            <button
              onClick={addTask}
              className="px-6 py-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-pink-500 to-amber-400 text-white shadow font-bold text-lg hover:scale-105 active:scale-95 transition"
            >
              <span className="inline-block mr-2">➕</span> Add Task
            </button>
          </motion.div>

          {/* Tasks */}
          <div className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3">
            <AnimatePresence>
              {filteredTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="col-span-full text-center py-24 text-gray-400 dark:text-gray-500 text-lg font-medium flex flex-col items-center"
                >
                  <span className="text-5xl mb-6 select-none animate-spin-slow">🗒️</span>
                  No tasks found.
                </motion.div>
              ) : (
                filteredTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    layout
                    whileHover={{ scale: 1.025, boxShadow: "0 8px 26px 0 rgba(99,102,241,0.23)" }}
                    className="bg-white/90 dark:bg-gradient-to-br dark:from-[#23253b] dark:to-[#2b2e42] border-2 border-indigo-100 dark:border-[#292c43] rounded-2xl shadow-xl p-6 flex flex-col justify-between min-h-[148px] group transition"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1 truncate flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-300 mr-1 animate-pulse" />
                        {task.title}
                      </h3>
                      <p className="text-base text-gray-800 dark:text-gray-300 mt-0.5 truncate">
                        {task.description || (
                          <span className="italic text-gray-400 dark:text-gray-600">No description</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="mt-4 ml-auto flex items-center text-xs text-red-500 hover:bg-pink-100 dark:hover:bg-pink-500/10 px-3 py-1.5 rounded-full font-semibold transition-all gap-1"
                    >
                      <span className="text-base">🗑️</span> Delete
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto w-full text-center pt-12 text-sm text-gray-400 dark:text-gray-600 select-none opacity-80 font-medium tracking-tight">
            <span>&copy; {new Date().getFullYear()} TaskBox • Built with <span className="text-pink-400">❤️</span></span>
          </div>
        </main>
      </div>
      <style>{
        `.animate-spin-slow { animation: spin 4s linear infinite; }
         @keyframes spin { to { transform: rotate(360deg) } }
        `
      }</style>
    </div>
  );
}

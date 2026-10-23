"use client";
import Link from "next/link";
import { motion } from "motion/react";

const line = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/30 blur-[140px]"
        animate={{ scale: [1, 1.15, 1], x: ["-50%", "-40%", "-50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 max-w-3xl text-center">
        <motion.h1
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="text-5xl font-semibold tracking-tight sm:text-7xl"
        >
          Your headline goes here
        </motion.h1>
        <motion.p
          custom={1}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-6 text-lg text-muted"
        >
          One sentence about what you sell and who it is for.
        </motion.p>
        <motion.div custom={2} variants={line} initial="hidden" animate="show" className="mt-10">
          <Link
            href="/products"
            className="inline-block rounded-full bg-white px-7 py-3 font-medium text-black transition hover:scale-105"
          >
            Browse products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
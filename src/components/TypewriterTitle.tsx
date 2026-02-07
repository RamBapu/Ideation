"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = ["Supercharged Productivity.", "AI-Powered Insights."];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const charVariant = {
  hidden: {
    opacity: 0,
    y: "0.25em",
  },
  visible: {
    opacity: 1,
    y: "0em",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export default function TypewriterTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [index]);

  const text = texts[index];

  return (
    <h1 className="text-4xl font-bold">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-label={text}
          role="heading"
          className="inline-block">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={charVariant}
              className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

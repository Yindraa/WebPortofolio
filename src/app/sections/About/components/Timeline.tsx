"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineData } from "../data";

// Mendefinisikan tipe untuk item timeline
interface TimelineItemProps {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// 1. BUAT KOMPONEN BARU UNTUK SETIAP ITEM TIMELINE
const TimelineItemComponent: React.FC<{
  item: TimelineItemProps;
  index: number;
}> = ({ item, index }) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.5 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`flex items-center gap-8 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={{
          opacity: itemInView ? 1 : 0,
          x: itemInView ? 0 : isLeft ? -50 : 50,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1"
        whileHover={{
          y: -5,
          scale: 1.03,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <div
          className={`bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 group cursor-pointer ${
            isLeft ? "text-left" : "text-right"
          }`}
        >
          <div
            className={`flex items-center gap-3 mb-3 ${
              isLeft ? "justify-start" : "justify-end"
            }`}
          >
            <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">{item.year}</span>
          </div>
          <h4 className="text-xl font-semibold text-foreground mb-2">
            {item.title}
          </h4>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      </motion.div>
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: itemInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-4 h-4 bg-background border-4 border-primary rounded-full"
        />
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref}>
      <h3 className="text-3xl font-bold text-center mb-16 text-foreground">
        My Timeline
      </h3>
      <div className="relative">
        {/* Garis tengah timeline */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
        />
        <div className="space-y-12">
          {/* 2. GUNAKAN KOMPONEN BARU DI DALAM .MAP() */}
          {timelineData.map((item, index) => (
            <TimelineItemComponent key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

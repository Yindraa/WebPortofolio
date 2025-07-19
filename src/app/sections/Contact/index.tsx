// src/app/sections/Contact/index.tsx

"use client";

import type React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "./components/ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m currently available for freelance work and open to
            discussing new projects. Let&apos;s build something amazing
            together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Kolom Kiri: Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-accent rounded-lg group-hover:bg-primary transition-colors">
                  <Mail className="text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">
                    your.email@example.com
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent rounded-lg">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-muted-foreground">+62 123-4567-890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent rounded-lg">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Manado, Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

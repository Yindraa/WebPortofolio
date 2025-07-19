"use client";

import type React from "react";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FUNGSI INI DIUBAH TOTAL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xzzvzlre", {
        // GANTI DENGAN URL ANDA
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Send me a message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input fields tetap sama */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none transition-shadow"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none transition-shadow"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none transition-shadow resize-none"
            placeholder="Hi, I'd like to talk about..."
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={18} />
            )}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-600 flex items-center gap-2"
            >
              <CheckCircle size={16} /> Message sent successfully!
            </motion.p>
          )}
          {submitStatus === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-600 flex items-center gap-2"
            >
              <AlertTriangle size={16} /> Failed to send. Please try again.
            </motion.p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

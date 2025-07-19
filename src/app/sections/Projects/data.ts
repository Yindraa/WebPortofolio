// src/app/sections/Projects/data.ts

import type { Project } from "../../../types/portofolio";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Website",
    category: "Web App", // Kategori ditambahkan
    description:
      "A full-stack e-commerce platform built with Next.js, featuring user authentication, product management, and payment integration.",
    longDescription:
      "This project is a comprehensive e-commerce solution designed to provide a seamless shopping experience. It includes features like user registration and login, a dynamic product catalog with search and filtering, a shopping cart, and secure checkout process integrated with Stripe. The admin dashboard allows for easy management of products, orders, and users.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Stripe",
    ],
    githubUrl: "https://github.com/Yindraa",
    liveUrl: "#",
    imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce",
    galleryImages: [
      "https://placehold.co/600x400/3b82f6/ffffff?text=Product+Page",
      "https://placehold.co/600x400/3b82f6/ffffff?text=Shopping+Cart",
      "https://placehold.co/600x400/3b82f6/ffffff?text=Checkout",
    ],
  },
  {
    id: "2",
    title: "Task Management App",
    category: "Web App", // Kategori ditambahkan
    description:
      "A collaborative task management application with real-time updates and drag-and-drop functionality.",
    longDescription:
      "Inspired by platforms like Trello, this application allows teams to manage their projects and tasks effectively. It features real-time updates using Socket.io, enabling multiple users to see changes instantly. The drag-and-drop interface makes organizing tasks intuitive, and users can create boards, lists, and cards to structure their workflow.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Express"],
    githubUrl: "https://github.com/Yindraa",
    liveUrl: "#",
    imageUrl: "https://placehold.co/600x400/8b5cf6/ffffff?text=Task+Manager",
    galleryImages: [
      "https://placehold.co/600x400/8b5cf6/ffffff?text=Task+Board",
      "https://placehold.co/600x400/8b5cf6/ffffff?text=Card+Details",
      "https://placehold.co/600x400/8b5cf6/ffffff?text=Team+View",
    ],
  },
  {
    id: "3",
    title: "Weather Dashboard",
    category: "Web App", // Kategori ditambahkan
    description:
      "A responsive weather dashboard that displays current weather conditions and forecasts.",
    longDescription:
      "This weather dashboard provides users with up-to-date weather information in a visually appealing format. It fetches data from a third-party weather API and displays it using dynamic charts created with Chart.js. Users can search for any city in the world to get its current weather, hourly forecast, and a 7-day forecast.",
    technologies: ["React", "Chart.js", "Weather API", "CSS Modules"],
    githubUrl: "https://github.com/Yindraa",
    liveUrl: "#",
    imageUrl: "https://placehold.co/600x400/10b981/ffffff?text=Weather+App",
    galleryImages: [
      "https://placehold.co/600x400/10b981/ffffff?text=7-Day+Forecast",
      "https://placehold.co/600x400/10b981/ffffff?text=Hourly+Chart",
      "https://placehold.co/600x400/10b981/ffffff?text=City+Search",
    ],
  },
  {
    id: "4",
    title: "Fitness Tracker App",
    category: "Mobile App", // Kategori ditambahkan
    description:
      "A mobile application to track workouts, set fitness goals, and monitor progress over time.",
    longDescription:
      "This mobile app, built with React Native, helps users maintain a healthy lifestyle. It includes features for logging exercises, tracking calories, visualizing progress with charts, and setting personal fitness goals. It also integrates with native device features for a seamless experience.",
    technologies: ["React Native", "Firebase", "Chart.js", "Expo"],
    githubUrl: "https://github.com/Yindraa",
    liveUrl: "#",
    imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Fitness+App",
    galleryImages: [
      "https://placehold.co/600x400/f59e0b/ffffff?text=Dashboard",
      "https://placehold.co/600x400/f59e0b/ffffff?text=Workout+Log",
      "https://placehold.co/600x400/f59e0b/ffffff?text=Progress+Chart",
    ],
  },
  // Tambahkan lebih banyak proyek di sini dengan kategori yang berbeda
];

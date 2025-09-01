import React from "react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJsonwebtokens,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";

export default function AboutPage() {
  const techStack = [
    {
      name: "MongoDB",
      icon: <SiMongodb className="w-10 h-10 text-green-600" />,
    },
    {
      name: "Express.js",
      icon: (
        <SiExpress className="w-10 h-10 text-gray-800 dark:text-gray-200" />
      ),
    },
    { name: "React", icon: <SiReact className="w-10 h-10 text-blue-500" /> },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="w-10 h-10 text-green-500" />,
    },
    {
      name: "JWT",
      icon: <SiJsonwebtokens className="w-10 h-10 text-yellow-500" />,
    },
    {
      name: "TailwindCSS",
      icon: <SiTailwindcss className="w-10 h-10 text-sky-400" />,
    },
    {
      name: "GitHub",
      icon: <SiGithub className="w-10 h-10 text-gray-900 dark:text-gray-100" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800  dark:text-gray-100 transition-colors">
      {/* Hero Section */}
      <div className="flex ">
        <div>
          <section className="text-center py-16 px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              About This Project
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto py-10">
              This Task Manager is built with the powerful{" "}
              <span className="font-bold">MERN stack</span> and modern tools.
              It’s designed to help you stay productive, manage tasks, and
              collaborate with ease — while ensuring performance, scalability,
              and security.
            </p>
          </section>
        </div>
        <div>
          {/* About Features */}
          <section className="px-6 md:px-12 lg:px-24 py-12">
            <h2 className="text-2xl font-bold text-center mb-8">
               Project Highlights
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              <p>
                Built with{" "}
                <span className="font-bold">
                  MongoDB, Express, React, Node.js
                </span>{" "}
                (MERN stack).
              </p>
              <p>
                {" "}
                User authentication & authorization powered by{" "}
                <span className="font-bold">JWT (JSON Web Tokens)</span>.
              </p>
              <p>
                {" "}
                REST API with secure routes for tasks, users, and assignments.
              </p>
              <p>
                {" "}
                Beautiful UI built using{" "}
                <span className="font-bold">TailwindCSS</span> with light/dark
                mode support.
              </p>
              <p>
                {" "}
                Fully responsive — works on desktop, tablet, and mobile devices.
              </p>
              <p>
                {" "}
                Scalable architecture — ready to integrate with future features
                like payroll, leaves, and CRM modules.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Tech Stack Section */}
      <section className="px-6 md:px-12 lg:px-24 py-12">
        <h2 className="text-2xl font-bold text-center mb-8"> Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">{tech.icon}</div>
              <p className="font-semibold">{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-5 bg-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl pt-1 font-bold mb-4">
          Want to Explore More?
        </h2>
        <p className="mb-6 text-lg">
          Check out the source code and contribute to this project.
        </p>
        <a
          href="https://github.com/lakshrajkumar26/vexocore-it-crud"
          className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
        >
          View on GitHub
        </a>
      </section>
    </div>
  );
}

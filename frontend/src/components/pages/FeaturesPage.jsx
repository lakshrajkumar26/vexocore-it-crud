import React from "react";
import { CheckCircle, Clock, Star, Users, Shield, Smartphone } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Smart Task Management",
      desc: "Create, edit, and organize tasks seamlessly with instant updates.",
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Deadlines & Reminders",
      desc: "Stay on track with deadlines, notifications, and smart reminders.",
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Prioritize with Importance",
      desc: "Mark tasks as important and focus only on what matters.",
      icon: <Star className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Team Collaboration",
      desc: "Assign tasks, track progress, and collaborate with your team in real time.",
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Secure & Private",
      desc: "Your data is protected with authentication & secure storage.",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Works Anywhere",
      desc: "Responsive design with full support for desktop and mobile devices.",
      icon: <Smartphone className="w-8 h-8 text-pink-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 hover:text-blue-500">
          Everything You Need to Manage Tasks 
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          From personal todos to team projects — manage everything in one modern, intuitive platform.
        </p>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                {f.icon}
                <h3 className="text-xl font-semibold">{f.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get more done?
        </h2>
        <p className="mb-6 text-lg">Boost your productivity with our modern task manager today.</p>
        <button className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, BarChart, Zap } from "lucide-react";

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: <Zap className="w-5 h-5 text-[#065E32]" />,
      name: "Essential Cookies",
      description: "Required for the website to function correctly. These handle logins, security, and preferences.",
      required: true,
    },
    {
      icon: <BarChart className="w-5 h-5 text-[#44B74C]" />,
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with the site, so we can improve the user experience.",
      required: false,
    },
    {
      icon: <Settings className="w-5 h-5 text-[#065E32]" />,
      name: "Preference Cookies",
      description: "Allow the website to remember choices you've made, such as language settings or theme preferences.",
      required: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#065E32] rounded-[3rem] p-12 text-center text-white mb-16 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 font-heading">
            Cookie Policy
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
            We use cookies to enhance your journey toward better health. Transparency is part of our commitment to you.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold text-[#065E32] dark:text-white mb-4 font-heading">Types of Cookies We Use</h2>
        {cookieTypes.map((type, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] dark:bg-zinc-900 flex items-center justify-center">
                {type.icon}
              </div>
              <div>
                <h4 className="font-bold text-foreground font-heading">{type.name}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
            {type.required ? (
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#065E32] bg-[#065E32]/10 px-2 py-1 rounded">Required</span>
            ) : (
              <div className="w-10 h-5 bg-gray-200 dark:bg-zinc-800 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          You can manage your cookie preferences at any time through your browser settings.
          <br />
          For more information, please contact us at privacy@nutrisync.com
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Leaf } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Meal Plans", href: "/dashboard/meal-plans" },
    { name: "AI Assistant", href: "/dashboard/ai" },
    { name: "Pricing", href: "#pricing" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-[#065E32]/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center group w-fit">
              <Image
                src={logo}
                alt="NutriSync"
                width={120}
                height={120}
                className="object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering your health journey with AI-driven nutrition plans,
              smart tracking, and a community dedicated to wellness.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-heading">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#44B74C] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-heading">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#44B74C] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-heading">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#44B74C] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#065E32]/10 gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriSync. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Leaf className="w-3 h-3 text-[#44B74C]" /> for a
            healthier world.
          </div>
        </div>
      </div>
    </footer>
  );
}

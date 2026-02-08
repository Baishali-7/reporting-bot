import { Bot, Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex items-center gap-3 transition-all duration-300 hover:opacity-90">
            <span className="text-lg font-bold text-white">
              REPORTING
              <span className="text-amber-400">Bot</span>
            </span>
          </div>

          {/* Disclaimer */}
          <div className="space-y-1">
            <p className="text-sm text-slate-400">
              This is a{" "}
              <span className="text-amber-400 font-medium">
                demonstration website
              </span>
              .
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} REPORTING.bot
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

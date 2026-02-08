import { motion } from "framer-motion";
import {
  Bot,
  Users,
  Cpu,
  Clock,
  ShieldAlert,
  FileCheck,
  DollarSign,
  Check,
  X,
  Minus,
} from "lucide-react";

const rows = [
  {
    category: "Report Preparation Time",
    icon: Clock,
    manual: { value: "5-10 business days", score: "bad" },
    traditional: { value: "2-3 business days", score: "mid" },
    Reportingbot: { value: "< 2 hours", score: "good" },
  },
  {
    category: "Error Rate",
    icon: ShieldAlert,
    manual: { value: "8-15% average", score: "bad" },
    traditional: { value: "2-5%", score: "mid" },
    Reportingbot: { value: "< 0.3%", score: "good" },
  },
  {
    category: "Audit Readiness",
    icon: FileCheck,
    manual: { value: "Low — manual trails", score: "bad" },
    traditional: { value: "Medium — partial logs", score: "mid" },
    Reportingbot: { value: "High — full audit trail", score: "good" },
  },
  {
    category: "Annual Operational Cost",
    icon: DollarSign,
    manual: { value: "$500K - $2M+", score: "bad" },
    traditional: { value: "$200K - $800K", score: "mid" },
    Reportingbot: { value: "$50K - $200K", score: "good" },
  },
  {
    category: "Multi-Jurisdiction Support",
    icon: Cpu,
    manual: { value: "Very difficult", score: "bad" },
    traditional: { value: "Limited regions", score: "mid" },
    Reportingbot: { value: "30+ jurisdictions", score: "good" },
  },
  {
    category: "Regulatory Updates",
    icon: ShieldAlert,
    manual: { value: "Manual tracking", score: "bad" },
    traditional: { value: "Periodic updates", score: "mid" },
    Reportingbot: { value: "Real-time automated", score: "good" },
  },
];

const scoreIcon = (score) => {
  if (score === "good") return <Check className="w-3.5 h-3.5 text-green-600" />;
  if (score === "mid") return <Minus className="w-3.5 h-3.5 text-yellow-600" />;
  return <X className="w-3.5 h-3.5 text-red-600" />;
};

export function CompetitiveComparison() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-50 text-amber-700 text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            Practical Comparison
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Why{" "}
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Automation
            </span>{" "}
            Wins
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real outcomes compared: manual processes, traditional regtech tools,
            and Reporting.bot's bot-driven approach.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden min-w-[640px]">
            {/* Header */}
            <div className="grid grid-cols-4 gap-0 border-b border-gray-200">
              <div className="p-4">
                <p className="text-xs text-gray-500 font-medium">Metric</p>
              </div>
              <div className="p-4 text-center border-l border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <p className="text-xs font-medium text-gray-500">Manual</p>
                </div>
              </div>
              <div className="p-4 text-center border-l border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-gray-500" />
                  <p className="text-xs font-medium text-gray-500">
                    Traditional RegTech
                  </p>
                </div>
              </div>
              <div className="p-4 text-center border-l border-amber-600/30 bg-amber-50">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-amber-600" />
                  <p className="text-xs font-semibold text-amber-600">
                    Reporting.bot
                  </p>
                </div>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-0 ${
                  i < rows.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="p-4 flex items-center gap-2">
                  <row.icon className="w-4 h-4 text-gray-500 shrink-0" />
                  <p className="text-xs font-medium text-gray-900">
                    {row.category}
                  </p>
                </div>
                <div className="p-4 border-l border-gray-200 flex items-center justify-center gap-2">
                  {scoreIcon(row.manual.score)}
                  <p className="text-xs text-gray-600">{row.manual.value}</p>
                </div>
                <div className="p-4 border-l border-gray-200 flex items-center justify-center gap-2">
                  {scoreIcon(row.traditional.score)}
                  <p className="text-xs text-gray-600">
                    {row.traditional.value}
                  </p>
                </div>
                <div className="p-4 border-l border-amber-600/30 bg-amber-50 flex items-center justify-center gap-2">
                  {scoreIcon(row.Reportingbot.score)}
                  <p className="text-xs font-medium text-gray-900">
                    {row.Reportingbot.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  User,
  ToggleLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const manualData = {
  capitalAdequacy: { cet1: 10.2, tier1: 12.1, total: 14.8, leverage: 4.2 },
  liquidity: { lcr: 128, nsfr: 105, hqla: 2.1 },
  exposures: { large: 15.2, concentration: 8.4, interbank: 6.8 },
  errors: 12,
  prepTime: "5-7 days",
  accuracy: "89%",
};

const botData = {
  capitalAdequacy: { cet1: 10.4, tier1: 12.3, total: 15.1, leverage: 4.3 },
  liquidity: { lcr: 132, nsfr: 108, hqla: 2.3 },
  exposures: { large: 14.8, concentration: 8.1, interbank: 6.5 },
  errors: 0,
  prepTime: "< 2 hours",
  accuracy: "99.7%",
};

const chartDataManual = [
  { name: "CET1", value: 10.2, min: 4.5 },
  { name: "Tier 1", value: 12.1, min: 6 },
  { name: "Total", value: 14.8, min: 8 },
  { name: "LCR", value: 128, min: 100 },
  { name: "NSFR", value: 105, min: 100 },
];

const chartDataBot = [
  { name: "CET1", value: 10.4, min: 4.5 },
  { name: "Tier 1", value: 12.3, min: 6 },
  { name: "Total", value: 15.1, min: 8 },
  { name: "LCR", value: 132, min: 100 },
  { name: "NSFR", value: 108, min: 100 },
];

export function ReportDashboard() {
  const [isBot, setIsBot] = useState(true);
  const data = isBot ? botData : manualData;
  const chartData = isBot ? chartDataBot : chartDataManual;

  const formatValue = (value, key) => {
    if (key === "hqla") return `€${value}B`;
    if (["cet1", "tier1", "total", "leverage", "lcr", "nsfr"].includes(key))
      return `${value}%`;
    return `€${value}B`;
  };

  // Simplified SVG pattern to avoid quote escaping issues
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C8C7C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section
      id="dashboard"
      className="py-20 md:py-28 relative bg-gradient-to-b from-stone-100 to-stone-50"
    >
      {/* Background pattern - using CSS variable or simpler approach */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: svgPattern,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Report Preview
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">
            Automated Report <span className="text-amber-700">Dashboard</span>
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Compare manual vs. bot-generated reporting side by side.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Toggle with improved styling */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center p-1 rounded-xl border border-stone-300 bg-white shadow-sm">
              <button
                onClick={() => setIsBot(false)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !isBot
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <User className="w-4 h-4" />
                Manual
              </button>
              <button
                onClick={() => setIsBot(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isBot
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <Bot className="w-4 h-4" />
                Bot-Generated
              </button>
            </div>
          </div>

          {/* Comparison Banner */}
          <motion.div
            key={`banner-${isBot}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-stone-50"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isBot
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isBot ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {isBot
                      ? "Bot Optimization Active"
                      : "Manual Process Detected"}
                  </p>
                  <p className="text-xs text-stone-600">
                    {isBot
                      ? "Zero errors detected with 99.7% accuracy"
                      : "12 validation errors found with 89% accuracy"}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-stone-600">Time Savings</p>
                <p className="text-lg font-bold text-amber-700">
                  {isBot ? "98% faster" : "5-7 days"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Stat Cards */}
            <motion.div
              key={`errors-${isBot}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-xl border ${
                isBot
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isBot ? (
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <p className="text-xs font-medium text-stone-700">
                  Validation Errors
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span
                  className={`text-3xl font-bold ${
                    isBot ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {data.errors}
                </span>
                <span className="text-sm text-stone-600 mb-1">errors</span>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                {isBot ? "All validations passed ✓" : "Requires manual review"}
              </p>
            </motion.div>

            <motion.div
              key={`time-${isBot}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 }}
              className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                {isBot ? (
                  <TrendingDown className="w-4 h-4 text-amber-600" />
                ) : null}
                <p className="text-xs font-medium text-stone-700">
                  Preparation Time
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-stone-900">
                  {data.prepTime}
                </span>
                {isBot && (
                  <span className="text-xs text-emerald-600 mb-1">
                    ✓ optimized
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                {isBot
                  ? "Automated data processing"
                  : "Manual data entry & validation"}
              </p>
            </motion.div>

            <motion.div
              key={`accuracy-${isBot}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                {isBot ? (
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                ) : null}
                <p className="text-xs font-medium text-stone-700">
                  Data Accuracy
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-stone-900">
                  {data.accuracy}
                </span>
                {isBot && (
                  <span className="text-xs text-emerald-600 mb-1">
                    industry best
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                {isBot ? "AI-enhanced validation" : "Manual accuracy check"}
              </p>
            </motion.div>
          </div>

          {/* Chart */}
          <motion.div
            key={`chart-${isBot}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-stone-300 bg-white shadow-sm p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-stone-900">
                Key Regulatory Ratios
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-amber-600"></div>
                  <span className="text-xs text-stone-600">Current</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-stone-300"></div>
                  <span className="text-xs text-stone-600">Minimum</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} barCategoryGap="15%" barSize={40}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#78716c" }}
                  axisLine={{ stroke: "#e5e5e5" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#78716c" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Value",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                    style: { fill: "#78716c", fontSize: 12 },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#44403c",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}`, "Value"]}
                  labelFormatter={(label) => `Metric: ${label}`}
                />
                <Bar
                  dataKey="min"
                  fill="#e5e5e5"
                  radius={[4, 4, 0, 0]}
                  opacity={0.7}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={isBot ? "#b45309" : "#78716c"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-3">
              <p className="text-xs text-stone-500">
                All ratios meet regulatory minimums.{" "}
                {isBot
                  ? "✓ Bot-optimized values shown."
                  : "Manual calculation shown."}
              </p>
            </div>
          </motion.div>

          {/* Capital / Liquidity / Exposure cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-amber-600 rounded"></div>
                <p className="text-sm font-semibold text-stone-900">
                  Capital Adequacy
                </p>
              </div>
              <div className="space-y-3">
                {Object.entries(data.capitalAdequacy).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2 hover:bg-stone-50 rounded"
                  >
                    <span className="text-sm text-stone-600 capitalize">
                      {key === "cet1"
                        ? "CET1 Ratio"
                        : key === "tier1"
                        ? "Tier 1 Ratio"
                        : key === "total"
                        ? "Total Capital"
                        : "Leverage Ratio"}
                    </span>
                    <span className="text-sm font-semibold font-mono text-stone-900">
                      {formatValue(val, key)}
                      {isBot && (
                        <span className="text-xs text-emerald-600 ml-1">✓</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-amber-600 rounded"></div>
                <p className="text-sm font-semibold text-stone-900">
                  Liquidity Metrics
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 hover:bg-stone-50 rounded">
                  <span className="text-sm text-stone-600">LCR</span>
                  <span className="text-sm font-semibold font-mono text-stone-900">
                    {data.liquidity.lcr}%
                    {isBot && (
                      <span className="text-xs text-emerald-600 ml-1">+4%</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-stone-50 rounded">
                  <span className="text-sm text-stone-600">NSFR</span>
                  <span className="text-sm font-semibold font-mono text-stone-900">
                    {data.liquidity.nsfr}%
                    {isBot && (
                      <span className="text-xs text-emerald-600 ml-1">+3%</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-stone-50 rounded">
                  <span className="text-sm text-stone-600">HQLA</span>
                  <span className="text-sm font-semibold font-mono text-stone-900">
                    €{data.liquidity.hqla}B
                    {isBot && (
                      <span className="text-xs text-emerald-600 ml-1">
                        +€0.2B
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-stone-300 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-4 bg-stone-600 rounded"></div>
                <p className="text-sm font-semibold text-stone-900">
                  Exposure Summary
                </p>
              </div>
              <div className="space-y-3">
                {Object.entries(data.exposures).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2 hover:bg-stone-50 rounded"
                  >
                    <span className="text-sm text-stone-600 capitalize">
                      {key === "large"
                        ? "Large Exposures"
                        : key === "concentration"
                        ? "Concentration Risk"
                        : "Interbank"}
                    </span>
                    <span className="text-sm font-semibold font-mono text-stone-900">
                      €{val}B
                      {isBot && (
                        <span className="text-xs text-emerald-600 ml-1">↓</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50/80 to-stone-50/80"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stone-900 mb-1">
                  {isBot
                    ? "Bot-Generated Report Summary"
                    : "Manual Report Summary"}
                </p>
                <p className="text-xs text-stone-600">
                  {isBot
                    ? "All regulatory requirements met with optimized values. Ready for submission."
                    : "Requires manual review for validation errors before submission."}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-sm font-medium transition-colors">
                  Download Report
                </button>
                <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {isBot ? "Submit Now" : "Fix Issues"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

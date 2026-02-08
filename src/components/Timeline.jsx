import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  AlertTriangle,
  Clock,
  ChevronDown,
  Info,
  Shield,
} from "lucide-react";

const timelineData = {
  eu: [
    {
      id: "1",
      report: "COREP (Own Funds)",
      regulator: "EBA",
      deadline: "Mar 31, 2026",
      daysRemaining: 51,
      frequency: "Quarterly",
      penaltyRisk: "high",
      description:
        "Common reporting on capital adequacy — Own Funds and Capital Ratios",
    },
    {
      id: "2",
      report: "FINREP (Financial)",
      regulator: "EBA",
      deadline: "Mar 31, 2026",
      daysRemaining: 51,
      frequency: "Quarterly",
      penaltyRisk: "high",
      description:
        "Financial reporting based on IFRS/nGAAP accounting standards",
    },
    {
      id: "3",
      report: "LCR (Liquidity)",
      regulator: "EBA",
      deadline: "Feb 15, 2026",
      daysRemaining: 7,
      frequency: "Monthly",
      penaltyRisk: "high",
      description: "Liquidity Coverage Ratio — 30-day liquidity stress test",
    },
    {
      id: "4",
      report: "AnaCredit",
      regulator: "ECB",
      deadline: "Mar 10, 2026",
      daysRemaining: 30,
      frequency: "Monthly",
      penaltyRisk: "medium",
      description:
        "Granular credit and credit risk data on individual bank loans",
    },
    {
      id: "5",
      report: "NSFR",
      regulator: "EBA",
      deadline: "Mar 31, 2026",
      daysRemaining: 51,
      frequency: "Quarterly",
      penaltyRisk: "medium",
      description: "Net Stable Funding Ratio — long-term funding resilience",
    },
    {
      id: "6",
      report: "Pillar 3 Disclosure",
      regulator: "EBA",
      deadline: "Jun 30, 2026",
      daysRemaining: 142,
      frequency: "Annual",
      penaltyRisk: "low",
      description: "Public disclosure of risk management and capital adequacy",
    },
  ],
  uk: [
    {
      id: "7",
      report: "PRA110 (Liquidity)",
      regulator: "PRA",
      deadline: "Feb 20, 2026",
      daysRemaining: 12,
      frequency: "Monthly",
      penaltyRisk: "high",
      description: "Daily liquidity reporting for major UK banks",
    },
    {
      id: "8",
      report: "Capital+ (COREP UK)",
      regulator: "PRA",
      deadline: "Mar 31, 2026",
      daysRemaining: 51,
      frequency: "Quarterly",
      penaltyRisk: "high",
      description: "UK version of COREP reporting post-Brexit",
    },
    {
      id: "9",
      report: "FCA RegData",
      regulator: "FCA",
      deadline: "Apr 15, 2026",
      daysRemaining: 66,
      frequency: "Quarterly",
      penaltyRisk: "medium",
      description: "FCA regulatory data returns for authorized firms",
    },
  ],
  us: [
    {
      id: "10",
      report: "Call Report (FFIEC 031)",
      regulator: "FDIC",
      deadline: "Apr 30, 2026",
      daysRemaining: 81,
      frequency: "Quarterly",
      penaltyRisk: "high",
      description: "Consolidated Reports of Condition and Income",
    },
    {
      id: "11",
      report: "FR Y-9C",
      regulator: "Fed Reserve",
      deadline: "Apr 30, 2026",
      daysRemaining: 81,
      frequency: "Quarterly",
      penaltyRisk: "high",
      description: "Consolidated financial statements for BHCs",
    },
    {
      id: "12",
      report: "CCAR / DFAST",
      regulator: "Fed Reserve",
      deadline: "Apr 5, 2026",
      daysRemaining: 56,
      frequency: "Annual",
      penaltyRisk: "high",
      description: "Capital stress testing submissions",
    },
  ],
};

const riskColors = {
  low: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    bgDark: "bg-emerald-100",
  },
  medium: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    bgDark: "bg-amber-100",
  },
  high: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    bgDark: "bg-red-100",
  },
};

export function RegulatoryTimeline() {
  const [selectedRegion, setSelectedRegion] = useState("eu");
  const [simulateDelay, setSimulateDelay] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const events = timelineData[selectedRegion] || [];

  return (
    <section id="timeline" className="py-20 md:py-28 relative bg-stone-50">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-stone-100/30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Deadline Management
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">
            Regulatory <span className="text-amber-700">Timeline</span> & Alerts
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Track upcoming deadlines, understand filing frequency, and simulate
            the impact of late submissions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "eu", label: "🇪🇺 EU" },
                { key: "uk", label: "🇬🇧 UK" },
                { key: "us", label: "🇺🇸 US" },
              ].map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setSelectedRegion(r.key);
                    setExpandedId(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    selectedRegion === r.key
                      ? "bg-amber-700 border-amber-700 text-white shadow-sm"
                      : "bg-white border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSimulateDelay(!simulateDelay)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                simulateDelay
                  ? "bg-red-100 border-red-300 text-red-800 shadow-sm"
                  : "bg-white border-stone-300 text-stone-700 hover:bg-stone-50"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              {simulateDelay ? "Late Submission: ON" : "Simulate Late Filing"}
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-stone-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-stone-600">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-stone-600">High Risk</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            {events.map((event, i) => {
              const isLate = simulateDelay && event.daysRemaining <= 30;
              const risk = isLate
                ? riskColors.high
                : riskColors[event.penaltyRisk];
              const isExpanded = expandedId === event.id;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    className={`rounded-xl border transition-all cursor-pointer ${
                      isLate
                        ? "border-red-300 bg-red-50 hover:bg-red-100/50"
                        : "border-stone-200 bg-white hover:bg-stone-50"
                    } ${isExpanded ? "shadow-lg" : "shadow-sm"}`}
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                  >
                    <div className="p-4 flex items-center gap-4">
                      {/* Days indicator */}
                      <div
                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${risk.bg} border ${risk.border}`}
                      >
                        <span className={`text-xl font-bold ${risk.text}`}>
                          {isLate ? "!" : event.daysRemaining}
                        </span>
                        <span className={`text-xs ${risk.text} font-medium`}>
                          {isLate ? "LATE" : "days"}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="text-base font-semibold text-stone-900">
                            {event.report}
                          </p>
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${risk.bg} ${risk.text} border ${risk.border}`}
                          >
                            {isLate
                              ? "OVERDUE"
                              : event.penaltyRisk.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {event.regulator}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.frequency}
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-stone-500 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-stone-200">
                        <div className="pt-4 space-y-4">
                          <p className="text-sm text-stone-700">
                            {event.description}
                          </p>
                          {isLate ? (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-red-800 mb-1">
                                    Late Submission Impact
                                  </p>
                                  <p className="text-sm text-red-700/90">
                                    Late filing of{" "}
                                    <span className="font-medium">
                                      {event.report}
                                    </span>{" "}
                                    can result in penalties up to €5M or 10% of
                                    annual turnover. Repeated violations may
                                    trigger enhanced supervisory measures and
                                    increased reporting frequency.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <div className="flex items-start gap-2">
                                <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-amber-800 mb-1">
                                    Automation Recommendation
                                  </p>
                                  <p className="text-sm text-amber-700/90">
                                    Reporting.bot can automate this report's
                                    preparation, validation, and submission,
                                    reducing preparation time by up to 85%.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex gap-3 pt-2">
                            <button className="px-3 py-1.5 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg border border-amber-300 transition-colors">
                              Mark as Prepared
                            </button>
                            <button className="px-3 py-1.5 text-sm bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg border border-stone-300 transition-colors">
                              Set Reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-8 p-4 bg-stone-100 border border-stone-300 rounded-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-stone-600">
                  Showing{" "}
                  <span className="font-semibold text-stone-900">
                    {events.length} reports
                  </span>{" "}
                  for {selectedRegion.toUpperCase()} region
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {simulateDelay
                    ? "⚠️ Late submission simulation is active"
                    : "All reports are on schedule"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-stone-600">Next Deadline</p>
                  <p className="text-lg font-semibold text-amber-700">
                    {
                      events.sort(
                        (a, b) => a.daysRemaining - b.daysRemaining
                      )[0]?.deadline
                    }
                  </p>
                </div>
                <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
                  Export Timeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

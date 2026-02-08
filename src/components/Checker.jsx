import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Calendar,
  Database,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
} from "lucide-react";

const institutionTypes = [
  { value: "commercial_bank", label: "Commercial Bank", icon: "🏦" },
  { value: "investment_bank", label: "Investment Bank", icon: "📈" },
  { value: "insurance", label: "Insurance Company", icon: "🛡️" },
  { value: "asset_manager", label: "Asset Manager", icon: "💼" },
  { value: "credit_union", label: "Credit Union", icon: "🤝" },
  { value: "fintech", label: "Fintech / E-Money", icon: "⚡" },
];

const jurisdictions = [
  { value: "eu", label: "European Union", flag: "🇪🇺" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "sg", label: "Singapore", flag: "🇸🇬" },
  { value: "hk", label: "Hong Kong", flag: "🇭🇰" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
];

const dataCategories = [
  "Balance Sheet Data",
  "P&L Statements",
  "Risk Exposures",
  "Liquidity Positions",
  "Capital Adequacy",
  "Counterparty Data",
  "Transaction Records",
  "Collateral Data",
];

function getResults(data) {
  const dataScore =
    (data.dataAvailability.length / dataCategories.length) * 100;
  const score = Math.round(dataScore * 0.6 + 40); // base 40 + data contribution

  const missing = dataCategories.filter(
    (d) => !data.dataAvailability.includes(d)
  );
  const riskAreas = [];
  if (!data.dataAvailability.includes("Capital Adequacy"))
    riskAreas.push("Capital adequacy reporting may be incomplete");
  if (!data.dataAvailability.includes("Liquidity Positions"))
    riskAreas.push("LCR/NSFR calculations at risk");
  if (!data.dataAvailability.includes("Risk Exposures"))
    riskAreas.push("Large exposure reporting could fail validation");
  if (riskAreas.length === 0) riskAreas.push("No critical risk areas detected");

  return { score, missing, riskAreas };
}

export function ComplianceChecker() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    institutionType: "",
    jurisdiction: "",
    reportingPeriod: "quarterly",
    dataAvailability: [],
  });
  const [showResults, setShowResults] = useState(false);

  const results = getResults(data);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setShowResults(true);
  };

  const handleBack = () => {
    if (showResults) setShowResults(false);
    else if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 0) return !!data.institutionType;
    if (step === 1) return !!data.jurisdiction;
    if (step === 2) return !!data.reportingPeriod;
    if (step === 3) return data.dataAvailability.length > 0;
    return false;
  };

  const toggleDataItem = (item) => {
    setData((prev) => ({
      ...prev,
      dataAvailability: prev.dataAvailability.includes(item)
        ? prev.dataAvailability.filter((d) => d !== item)
        : [...prev.dataAvailability, item],
    }));
  };

  const reset = () => {
    setStep(0);
    setData({
      institutionType: "",
      jurisdiction: "",
      reportingPeriod: "quarterly",
      dataAvailability: [],
    });
    setShowResults(false);
  };

  const stepLabels = [
    "Institution Type",
    "Jurisdiction",
    "Reporting Period",
    "Data Availability",
  ];

  return (
    <section id="checker" className="py-20 md:py-28 relative bg-stone-50">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-stone-100/20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Interactive Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">
            Compliance <span className="text-amber-700">Readiness</span> Checker
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Answer a few questions to assess your institution's compliance
            readiness and identify gaps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-stone-300 bg-white shadow-xl overflow-hidden">
            {/* Progress */}
            {!showResults && (
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  {[0, 1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        s < step
                          ? "bg-amber-700"
                          : s === step
                          ? "bg-gradient-to-r from-amber-600 to-amber-700"
                          : "bg-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-stone-600">
                    Step {step + 1} of 4:{" "}
                    <span className="font-medium text-stone-900">
                      {stepLabels[step]}
                    </span>
                  </p>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                    {step + 1}/4
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              {!showResults ? (
                <>
                  {/* Step 0: Institution Type */}
                  {step === 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-amber-700" />
                        <h3 className="text-lg font-semibold text-stone-900">
                          What type of institution are you?
                        </h3>
                      </div>
                      <p className="text-sm text-stone-600 mb-4">
                        Select the option that best describes your organization
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {institutionTypes.map((t) => (
                          <button
                            key={t.value}
                            onClick={() =>
                              setData((p) => ({
                                ...p,
                                institutionType: t.value,
                              }))
                            }
                            className={`p-3 rounded-xl border text-left text-sm transition-all ${
                              data.institutionType === t.value
                                ? "border-amber-600 bg-amber-50 text-stone-900 shadow-sm"
                                : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50"
                            }`}
                          >
                            <span className="text-lg mr-2">{t.icon}</span>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Jurisdiction */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-5 h-5 text-amber-700" />
                        <h3 className="text-lg font-semibold text-stone-900">
                          Where do you operate?
                        </h3>
                      </div>
                      <p className="text-sm text-stone-600 mb-4">
                        Select your primary regulatory jurisdiction
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {jurisdictions.map((j) => (
                          <button
                            key={j.value}
                            onClick={() =>
                              setData((p) => ({ ...p, jurisdiction: j.value }))
                            }
                            className={`p-3 rounded-xl border text-left text-sm transition-all ${
                              data.jurisdiction === j.value
                                ? "border-amber-600 bg-amber-50 text-stone-900 shadow-sm"
                                : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50"
                            }`}
                          >
                            <span className="text-lg mr-2">{j.flag}</span>
                            {j.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Reporting Period */}
                  {step === 2 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-amber-700" />
                        <h3 className="text-lg font-semibold text-stone-900">
                          Reporting Frequency
                        </h3>
                      </div>
                      <p className="text-sm text-stone-600 mb-4">
                        Select your primary reporting frequency
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          {
                            value: "monthly",
                            label: "Monthly",
                            desc: "LCR, ALMM, AnaCredit",
                            color:
                              "bg-amber-50 border-amber-200 text-amber-800",
                          },
                          {
                            value: "quarterly",
                            label: "Quarterly",
                            desc: "COREP, FINREP, NSFR",
                            color:
                              "bg-amber-50 border-amber-200 text-amber-800",
                          },
                          {
                            value: "annual",
                            label: "Annual",
                            desc: "Annual accounts, Pillar 3",
                            color:
                              "bg-emerald-50 border-emerald-200 text-emerald-800",
                          },
                        ].map((p) => (
                          <button
                            key={p.value}
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                reportingPeriod: p.value,
                              }))
                            }
                            className={`p-4 rounded-xl border text-left transition-all ${
                              data.reportingPeriod === p.value
                                ? `border-amber-600 ${p.color.replace(
                                    "50",
                                    "100"
                                  )} shadow-sm`
                                : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50"
                            }`}
                          >
                            <p className="text-sm font-medium">{p.label}</p>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {p.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Data Availability */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Database className="w-5 h-5 text-amber-700" />
                        <h3 className="text-lg font-semibold text-stone-900">
                          Data Availability
                        </h3>
                      </div>
                      <p className="text-sm text-stone-600 mb-4">
                        Select all data categories currently available in your
                        systems.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {dataCategories.map((d) => (
                          <button
                            key={d}
                            onClick={() => toggleDataItem(d)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                              data.dataAvailability.includes(d)
                                ? "border-amber-600 bg-amber-50 text-stone-900"
                                : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-400"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                data.dataAvailability.includes(d)
                                  ? "border-amber-600 bg-amber-600"
                                  : "border-stone-400"
                              }`}
                            >
                              {data.dataAvailability.includes(d) && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 mt-3">
                        Selected {data.dataAvailability.length} of{" "}
                        {dataCategories.length} data categories
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Results */
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      Compliance Readiness Report
                    </h3>
                    <p className="text-sm text-stone-600">
                      Based on your assessment results
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-40 h-40">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${results.score * 2.64} 264`}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#92400e" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-stone-900">
                          {results.score}
                        </span>
                        <span className="text-sm text-stone-600">
                          out of 100
                        </span>
                        <div
                          className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${
                            results.score >= 80
                              ? "bg-emerald-100 text-emerald-800"
                              : results.score >= 60
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {results.score >= 80
                            ? "Good Readiness"
                            : results.score >= 60
                            ? "Moderate Readiness"
                            : "Needs Improvement"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Missing Data */}
                  {results.missing.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Missing Data ({results.missing.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {results.missing.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-1 rounded-md bg-red-100 border border-red-300 text-xs text-red-800"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Areas */}
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Risk Areas
                    </p>
                    <ul className="space-y-2">
                      {results.riskAreas.map((r, i) => (
                        <li
                          key={i}
                          className="text-sm text-amber-700 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Actions */}
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <p className="text-sm font-semibold text-emerald-800 mb-2">
                      Recommended Next Steps
                    </p>
                    <ul className="space-y-2">
                      <li className="text-sm text-emerald-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        Connect missing data sources to Reporting.bot for
                        automated ingestion
                      </li>
                      <li className="text-sm text-emerald-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        Run a full data quality validation before next
                        submission
                      </li>
                      <li className="text-sm text-emerald-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        Set up automated deadline alerts to avoid late filing
                        penalties
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-medium transition-colors text-sm"
                    >
                      Start New Assessment
                    </button>
                    <button
                      onClick={() =>
                        alert("Export feature would be implemented here")
                      }
                      className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      Export Report
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {!showResults && (
              <div className="px-6 pb-6 flex justify-between border-t border-stone-200 pt-4">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    step === 0
                      ? "text-stone-400 cursor-not-allowed"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    !canProceed()
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-sm"
                  }`}
                >
                  {step === 3 ? "Get Results" : "Continue"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </div>

          {/* Assessment Summary */}
          {!showResults && (
            <div className="mt-4 text-center">
              <p className="text-sm text-stone-600">
                This assessment helps identify compliance gaps. Your answers are
                not stored.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

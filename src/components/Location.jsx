import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, FileText } from "lucide-react";

const regions = [
  {
    id: "na",
    name: "North America",
    flag: "🇺🇸",
    regulators: [
      "Federal Reserve",
      "OCC",
      "FDIC",
      "SEC",
      "FINRA",
      "OSFI (Canada)",
    ],
    reports: ["Call Reports", "FR Y-9C", "CCAR/DFAST", "SAR/CTR", "Form PF"],
    x: 22,
    y: 35,
  },
  {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    regulators: ["EBA", "ECB", "ESMA", "BaFin", "AMF", "DNB"],
    reports: ["COREP", "FINREP", "AnaCredit", "ALMM", "Solvency II", "MiFIR"],
    x: 48,
    y: 30,
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    regulators: ["PRA", "FCA", "Bank of England"],
    reports: ["PRA110", "Capital+", "RegData", "EMIR UK", "MiFID UK"],
    x: 44,
    y: 25,
  },
  {
    id: "asia",
    name: "Asia Pacific",
    flag: "🌏",
    regulators: [
      "MAS (Singapore)",
      "HKMA",
      "APRA (Australia)",
      "RBI (India)",
      "FSA (Japan)",
    ],
    reports: [
      "MAS 610",
      "HKMA Returns",
      "APRA D2A",
      "RBI Returns",
      "FSA Reports",
    ],
    x: 75,
    y: 38,
  },
  {
    id: "me",
    name: "Middle East",
    flag: "🏛️",
    regulators: ["CBUAE", "SAMA", "QCB", "CBB"],
    reports: [
      "CBUAE Returns",
      "SAMA Prudential",
      "Basel III Local",
      "AML Reports",
    ],
    x: 58,
    y: 40,
  },
  {
    id: "af",
    name: "Africa",
    flag: "🌍",
    regulators: ["SARB (South Africa)", "CBN (Nigeria)", "CBK (Kenya)"],
    reports: ["BA Returns", "CBN Prudential", "Basel II/III Local"],
    x: 50,
    y: 58,
  },
  {
    id: "latam",
    name: "Latin America",
    flag: "🌎",
    regulators: ["BCB (Brazil)", "CNBV (Mexico)", "SBS (Peru)"],
    reports: ["BACEN Reports", "CNBV Regulatory", "Basel Local"],
    x: 28,
    y: 58,
  },
];

export function CoverageMap() {
  const [selectedRegion, setSelectedRegion] = useState(regions[1]);

  return (
    <section id="coverage" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-700/30 bg-amber-50 text-amber-800 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Global Coverage
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">
            Regulator{" "}
            <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Coverage
            </span>{" "}
            Map
          </h2>
          <p className="text-amber-800/70 text-lg max-w-2xl mx-auto">
            Supporting 30+ jurisdictions with automated reporting across major
            global regulators.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-lg p-6 relative overflow-hidden min-h-[400px]">
              {/* Simplified world map outline via dots */}
              <div className="relative w-full h-full min-h-[350px]">
                {/* Grid dots for map feel */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #92400e 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Region pins */}
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all z-10 group ${
                      selectedRegion?.id === region.id
                        ? "scale-125"
                        : "hover:scale-110"
                    }`}
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      {selectedRegion?.id === region.id && (
                        <div className="absolute w-10 h-10 rounded-full bg-amber-700/20 animate-ping" />
                      )}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                          selectedRegion?.id === region.id
                            ? "border-amber-700 bg-amber-700/20 shadow-md shadow-amber-700/30"
                            : "border-amber-300 bg-white hover:border-amber-700/50"
                        }`}
                      >
                        <span className="text-sm">{region.flag}</span>
                      </div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-amber-800/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {region.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Details */}
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-lg p-6">
              {selectedRegion ? (
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{selectedRegion.flag}</span>
                    <h3 className="text-lg font-semibold text-amber-900">
                      {selectedRegion.name}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-medium text-amber-800/70 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Regulators Covered
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRegion.regulators.map((r) => (
                        <span
                          key={r}
                          className="px-2 py-1 rounded-md bg-amber-700/10 border border-amber-700/20 text-xs text-amber-800"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-amber-800/70 mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Report Types
                    </p>
                    <ul className="space-y-1.5">
                      {selectedRegion.reports.map((r) => (
                        <li
                          key={r}
                          className="text-xs text-amber-800/80 flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-amber-700" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-amber-800/70">
                  Select a region to view coverage
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

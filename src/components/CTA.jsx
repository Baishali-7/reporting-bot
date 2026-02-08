import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  ArrowRight,
  FileCheck,
  Calendar,
  Loader2,
} from "lucide-react";

const qualificationSteps = [
  {
    question: "What best describes your institution?",
    options: [
      "Commercial Bank",
      "Investment Bank",
      "Insurance Company",
      "Asset Manager",
      "Other",
    ],
  },
  {
    question: "What is your primary compliance challenge?",
    options: [
      "Manual report preparation",
      "Meeting submission deadlines",
      "Multi-jurisdiction reporting",
      "Data quality issues",
    ],
  },
  {
    question: "How many regulatory reports do you file per quarter?",
    options: ["1-5", "6-15", "16-30", "30+"],
  },
];

export function BotCTA() {
  const [step, setStep] = useState(-1); // -1 = not started
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    if (step < qualificationSteps.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(-1);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <section className="py-20 md:py-28 relative bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-stone-50/20 to-stone-100/30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-amber-300 bg-gradient-to-br from-white to-stone-50 shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12 text-center">
              {step === -1 && !showResult ? (
                <>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-stone-900">
                    Ready to Automate Your Compliance?
                  </h2>
                  <p className="text-stone-600 text-lg mb-8 max-w-xl mx-auto">
                    Talk to our Compliance Bot to get a personalized assessment
                    and sample report for your institution.
                  </p>
                  <button
                    onClick={() => setStep(0)}
                    className="flex items-center justify-center gap-2 px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all duration-200 mx-auto"
                  >
                    Start Compliance Assessment
                  </button>
                </>
              ) : showResult ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-md mx-auto"
                >
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">
                    Your Assessment is Ready
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Based on your profile as a{" "}
                    <strong className="text-amber-700">{answers[0]}</strong>{" "}
                    filing{" "}
                    <strong className="text-amber-700">{answers[2]}</strong>{" "}
                    reports per quarter, we've prepared a tailored compliance
                    package.
                  </p>

                  {/* Benefits Summary */}
                  <div className="p-4 mb-6 rounded-xl bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-200">
                    <p className="text-sm font-semibold text-stone-900 mb-2">
                      Estimated Benefits for Your Institution:
                    </p>
                    <ul className="text-sm text-stone-600 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        85% reduction in preparation time
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        99.7% data accuracy rate
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Zero late submission penalties
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-300 text-sm text-amber-800 hover:bg-amber-100 transition-colors group">
                      <FileCheck className="w-4 h-4" />
                      Download Sample Report
                      <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-100 border border-stone-300 text-sm text-stone-800 hover:bg-stone-200 transition-colors group">
                      <Calendar className="w-4 h-4" />
                      Schedule Live Demo
                      <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={reset}
                      className="text-sm text-stone-600 hover:text-amber-700 transition-colors font-medium"
                    >
                      Start Over
                    </button>
                    <button className="text-sm text-amber-700 hover:text-amber-800 transition-colors font-medium">
                      Contact Sales
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-left max-w-md mx-auto"
                >
                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-stone-700">
                          Compliance Bot
                        </span>
                      </div>
                      <span className="text-xs text-stone-600">
                        {step + 1} of {qualificationSteps.length}
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-amber-600 to-amber-700 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((step + 1) / qualificationSteps.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-lg font-semibold text-stone-900 mb-6">
                    {qualificationSteps[step].question}
                  </p>

                  {loading ? (
                    <div className="flex flex-col items-center gap-3 py-8">
                      <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                      <span className="text-sm text-stone-600">
                        Processing your response...
                      </span>
                      <span className="text-xs text-stone-500">
                        Analyzing compliance patterns
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {qualificationSteps[step].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          className="w-full p-3.5 rounded-xl border border-stone-300 bg-white text-sm text-stone-800 text-left hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 flex items-center justify-between group"
                        >
                          <span className="font-medium">{opt}</span>
                          <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer note */}
            <div className="px-8 py-4 border-t border-stone-200 bg-gradient-to-r from-stone-50/80 to-amber-50/80">
              <p className="text-xs text-center text-stone-600">
                <span className="font-medium text-amber-700">
                  Privacy First:
                </span>{" "}
                Your responses are anonymous and used only to personalize
                recommendations.
              </p>
            </div>
          </motion.div>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Personalized results</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Get results in 60 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

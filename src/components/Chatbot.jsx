import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  User,
  FileDown,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const quickQuestions = [
  "What regulatory reports does my bank need to file?",
  "What are the Basel III reporting requirements?",
  "When is the next COREP submission deadline?",
  "Generate a sample liquidity report",
];

const botResponses = {
  default: undefined,
};

function getBotResponse(input) {
  const lower = input.toLowerCase();

  if (
    lower.includes("report") &&
    (lower.includes("need") || lower.includes("file") || lower.includes("bank"))
  ) {
    return {
      text: "Based on typical banking requirements, here are the regulatory reports your institution likely needs to file:",
      extras: [
        {
          type: "checklist",
          items: [
            "COREP — Common Reporting (Capital adequacy, Large exposures)",
            "FINREP — Financial Reporting (IFRS-based balance sheet, P&L)",
            "LCR — Liquidity Coverage Ratio (Monthly/Daily)",
            "NSFR — Net Stable Funding Ratio (Quarterly)",
            "AnaCredit — Granular credit data reporting (Monthly)",
            "ALMM — Additional Liquidity Monitoring Metrics",
          ],
        },
        {
          type: "warning",
          items: [
            "Requirements vary by jurisdiction and institution size. Connect with our compliance team for a tailored assessment.",
          ],
        },
      ],
    };
  }

  if (lower.includes("basel") || lower.includes("capital")) {
    return {
      text: "Basel III introduces enhanced capital and liquidity requirements. Here's what you need to know:",
      extras: [
        {
          type: "checklist",
          items: [
            "CET1 Capital Ratio: Minimum 4.5% of risk-weighted assets",
            "Tier 1 Capital Ratio: Minimum 6% of RWA",
            "Total Capital Ratio: Minimum 8% of RWA",
            "Capital Conservation Buffer: Additional 2.5%",
            "Leverage Ratio: Minimum 3% (Tier 1 / Total Exposure)",
            "Countercyclical Buffer: 0-2.5% set by national authorities",
          ],
        },
        {
          type: "download",
          label: "Download Basel III Requirements Summary (PDF)",
        },
      ],
    };
  }

  if (
    lower.includes("deadline") ||
    lower.includes("corep") ||
    lower.includes("submission")
  ) {
    return {
      text: "Here are the upcoming COREP submission deadlines and key dates:",
      extras: [
        {
          type: "checklist",
          items: [
            "Q4 2025 COREP — Due: March 31, 2026 (52 days remaining)",
            "Q1 2026 COREP — Due: June 30, 2026",
            "Monthly LCR — Due: 15th of each month",
            "AnaCredit — Due: 30th working day after reference date",
          ],
        },
        {
          type: "warning",
          items: [
            "Late submissions may result in penalties up to €5M or 10% of annual turnover under CRR II. Our bot can automate deadline tracking.",
          ],
        },
      ],
    };
  }

  if (
    lower.includes("liquidity") ||
    lower.includes("sample") ||
    lower.includes("generate")
  ) {
    return {
      text: "I've generated a sample Liquidity Coverage Ratio (LCR) report based on standard templates. This includes HQLA composition, net cash outflows, and the resulting LCR metric.",
      extras: [
        {
          type: "checklist",
          items: [
            "Total HQLA: €2.4B (Level 1: €1.8B, Level 2A: €400M, Level 2B: €200M)",
            "Net Cash Outflows (30-day): €1.6B",
            "LCR Ratio: 150% ✓ (Minimum: 100%)",
            "NSFR Ratio: 112% ✓ (Minimum: 100%)",
          ],
        },
        {
          type: "download",
          label: "Download Sample LCR Report (Excel)",
        },
        {
          type: "download",
          label: "Download Sample LCR Report (PDF)",
        },
      ],
    };
  }

  return {
    text: "I can help you with regulatory reporting requirements, compliance checks, deadline tracking, and generating sample reports. Try asking me about specific regulations like Basel III, COREP/FINREP deadlines, or which reports your institution needs to file.",
  };
}

export function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "bot",
      content:
        "Welcome to the Reporting.bot Compliance Assistant. I can help you understand your regulatory reporting obligations, check filing deadlines, and generate sample reports. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const response = getBotResponse(text);
    const botMsg = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content: response.text,
      extras: response.extras,
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <section id="bot" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-700/30 bg-amber-50 text-amber-800 text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            AI-Powered Compliance Assistant
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">
            Your Regulatory{" "}
            <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Co-Pilot
            </span>
          </h2>
          <p className="text-amber-800/70 text-lg max-w-2xl mx-auto">
            Ask about reporting requirements, check deadlines, generate sample
            reports, and get compliance insights — all through natural
            conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-amber-200 flex items-center gap-3 bg-gradient-to-r from-amber-100 to-amber-200/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-50" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Reporting.bot Compliance Bot
                </p>
                <p className="text-xs text-amber-700">● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        msg.role === "bot"
                          ? "bg-gradient-to-r from-amber-700 to-amber-900"
                          : "bg-amber-200"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <Bot className="w-3.5 h-3.5 text-amber-50" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-amber-900" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "bot"
                          ? "bg-white/80 backdrop-blur-sm text-amber-900 border border-amber-100"
                          : "bg-amber-700/10 text-amber-900 border border-amber-700/20"
                      }`}
                    >
                      <p>{msg.content}</p>
                      {msg.extras?.map((extra, i) => (
                        <div key={i} className="mt-3">
                          {extra.type === "checklist" && (
                            <ul className="space-y-1.5">
                              {extra.items?.map((item, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-xs text-amber-800/80"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {extra.type === "warning" && (
                            <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-red-50 border border-red-200">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-red-700">
                                {extra.items?.[0]}
                              </p>
                            </div>
                          )}
                          {extra.type === "download" && (
                            <button className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-amber-700/10 border border-amber-700/20 text-xs text-amber-800 hover:bg-amber-700/20 transition-colors">
                              <FileDown className="w-3.5 h-3.5" />
                              {extra.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-amber-50" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-1 border border-amber-100">
                    <Loader2 className="w-4 h-4 text-amber-700 animate-spin" />
                    <span className="text-xs text-amber-800/70 ml-1">
                      Analyzing...
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 border-t border-amber-200 flex gap-2 overflow-x-auto bg-gradient-to-r from-amber-100/50 to-amber-200/30">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-amber-300 bg-white/80 text-xs text-amber-800/80 hover:text-amber-900 hover:border-amber-700/30 hover:bg-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-amber-200 bg-gradient-to-r from-amber-100/30 to-amber-200/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about regulatory requirements, deadlines, reports..."
                  className="flex-1 bg-white/90 border border-amber-300 rounded-xl px-4 py-2.5 text-sm text-amber-900 placeholder:text-amber-800/60 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 hover:opacity-90 rounded-xl h-10 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

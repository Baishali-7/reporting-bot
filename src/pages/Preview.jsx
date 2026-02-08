import React from "react";
import { Navbar } from "../components/Header";
import { Hero } from "../components/Hero";
import { RegulatoryTimeline } from "../components/Timeline";
import { ChatBot } from "../components/Chatbot";
import { CoverageMap } from "../components/Location";
import { ComplianceChecker } from "../components/Checker";
import { CompetitiveComparison } from "../components/Comparison";
import { ReportDashboard } from "../components/Dashboard";
import { BotCTA } from "../components/CTA";
import Footer from "../components/Footer";

const Preview = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RegulatoryTimeline />
      <ChatBot />
      <ComplianceChecker />
      <ReportDashboard />
      <CompetitiveComparison />
      <CoverageMap />
      <BotCTA />
      <Footer />
    </div>
  );
};

export default Preview;

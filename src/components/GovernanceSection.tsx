import React from 'react';

const GovernanceSection = () => {
  return (
    <section id="governance" className="py-24 relative z-10 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient glow">
          Governance
        </h2>
        
        <div className="space-y-12 text-blue-200/90">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overview */}
          <div className="glass p-6 rounded-2xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Overview</h3>
            <ul className="list-disc list-inside text-blue-200/90">
              <li>Decentralized Autonomous Organization (DAO) structure</li>
              <li>AI-powered decision making</li>
              <li>Smart contract execution of business strategies</li>
              <li>Transparent and open-source operations</li>
            </ul>
          </div>

          {/* Executive Management */}
          <div className="glass p-6 rounded-2xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Executive Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-300">AI Agents</h4>
                <ul className="list-disc list-inside text-blue-200/90">
                  <li>CEO Agent: Strategic decision making</li>
                  <li>CFO Agent: Financial oversight</li>
                  <li>CTO Agent: Technical direction</li>
                  <li>CLO Agent: Legal counsel</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300">Human Advisors</h4>
                <ul className="list-disc list-inside text-blue-200/90">
                  <li>Founder: Vision and strategy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

          {/* DAO Engine */}
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">AI-DAO Engine</h3>
            <p className="mb-6">
              A Decentralized Autonomous Organization (DAO) is a form of business organization where decisions are automated and open-sourced, powered by smart contracts. At Sadellari Enterprises, we're taking this concept further. While traditional DAOs rely on human voting, our AI-DAO engine integrates advanced AI agents directly into the governance structure, creating a system that autonomously runs an entire holding company. Through months of intensive development, Dorian has engineered a custom, state-of-the-art AI-DAO engine that forms the autonomous backbone of Sadellari Enterprises, fundamentally transforming traditional business operations and governance.
            </p>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-300"></h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fully autonomous decision-making system</li>
                <li>Powered by advanced AI agents</li>
                <li>Real-time business operations</li>
                <li>Transparent and open-source execution</li>
              </ul>
              <h4 className="text-xl font-semibold text-blue-300">How It Works:</h4>
              <p>
                Our AI agents actively manage and operate the business through our custom DAO engine, making Sadellari Enterprises the one of world's first truly autonomous organization. Every decision, from strategic planning to resource allocation, is handled by our AI C-Suite Council on the guidance of the Board of Directors, working tirelessly 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;

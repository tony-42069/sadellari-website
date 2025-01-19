import React from 'react';

const TimelineSection = () => {
  return (
    <section id="timeline" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient glow">
          Roadmap
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* Q1 2024 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Q1 2024</h3>
                <p className="text-blue-200">
                  - Initial 3 brands launch (January)                  
                  - Focus on growth and infrastructure
                </p>
              </div>
              <div className="w-1/2"></div>
            </div>

            {/* Q2 2024 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2 pl-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Q2 2024</h3>
                <p className="text-blue-200">
                  - Launch 2 additional brands
                  - Continue growth phase
                </p>
              </div>
            </div>

            {/* Q3 2024 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Q3 2024</h3>
                <p className="text-blue-200">
                  - Launch 3 more brands
                  - Begin seeing exponential growth
                </p>
              </div>
              <div className="w-1/2"></div>
            </div>

            {/* Q4 2024 */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2 pl-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Q4 2024</h3>
                <p className="text-blue-200">
                  - Launch final 2 brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

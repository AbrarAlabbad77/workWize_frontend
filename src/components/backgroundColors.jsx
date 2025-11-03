import React from "react";

function backgroundColors() {
  return (
    <section className="relative bg-purple-100 py-20 overflow-hidden">
      {/* angled background using pseudo-element */}
      <div className="absolute inset-0 bg-purple-200 -skew-y-3 origin-top-left"></div>

      {/* content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Discover project management with AI technology
        </h1>
        <p className="text-lg text-gray-700">
          Let WorkWize handle the busy work so your team can focus on what really matters.
        </p>
      </div>
    </section>
  );
}

export default backgroundColors;

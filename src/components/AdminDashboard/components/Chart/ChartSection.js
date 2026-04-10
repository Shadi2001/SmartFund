import React from 'react';

const ChartSection = () => {
  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <h5 className="mb-4" style={{ color: "#828282", fontWeight: 600 }}>
        Fund Statistics Chart
      </h5>
      {/* Placeholder for chart - you can integrate a chart library here */}
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: 24,
        }}
      >
        [Chart Placeholder]
      </div>
    </div>
  );
};

export default ChartSection;

import React from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import DecryptedText from "../../../DecryptedText";

const StatsSection = () => {
  const { statsData, pieChartData } = useAdminDashboard();

  return (
    <>
  
      {/* Stats Cards */}
      <div className="row g-4 justify-content-center mt-2 mb-4">
       

        {/* Always show stats cards with current data */}
        <>
          {/* Capsule 1: Total Users */}
          <div className="col-md-3 ">
            <div
              className="card h-100 text-center"
              style={{
                background: "#0343f2",
                color: "white",
                border: "none",
                borderRadius: 16,
              }}
            >
              <div className="card-body">
                <i className="fas fa-users fa-2x mb-2"></i>
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Total Users
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                  <DecryptedText
                    text={statsData.totalUsers}
                    animateOn="view"
                    revealDirection="center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Capsule 2: Total Funds */}
          <div className="col-md-3">
            <div
              className="card h-100 text-center"
              style={{
                background: "#2e00d5",
                color: "white",
                border: "none",
                borderRadius: 16,
              }}
            >
              <div className="card-body">
                <i className="fa-solid fa-file-contract fa-2x mb-2"></i>
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Total Loans
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                  {" "}
                  <DecryptedText
                    text={statsData.totalFunds.toLocaleString()}
                    animateOn="view"
                    revealDirection="center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Capsule 3: Funds Accepted */}
          <div className="col-md-3">
            <div
              className="card h-100 text-center"
              style={{
                background: "#009688",
                color: "white",
                border: "none",
                borderRadius: 16,
              }}
            >
              <div className="card-body">
                <i className="fas fa-check-circle fa-2x mb-2"></i>
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Loans Accepted
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                  {" "}
                  <DecryptedText
                    text={statsData.fundsAccepted.toLocaleString()}
                    animateOn="view"
                    revealDirection="center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Capsule 4: Funds Rejected */}
          <div className="col-md-3">
            <div
              className="card h-100 text-center"
              style={{
                background: "#4f6bed",
                color: "white",
                border: "none",
                borderRadius: 16,
              }}
            >
              <div className="card-body">
                <i className="fas fa-dollar-sign fa-2x mb-2"></i>
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.1rem" }}
                >
                  Total Funds
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                  {" "}
                  <DecryptedText
                    text= {statsData.fundsRejected.toLocaleString()+"$" }
                    animateOn="view"
                    revealDirection="center"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>


          {/* Charts Row */}
          <div className="row g-4 justify-content-center mb-4">
            {/* Pie Chart Card */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0" style={{ color: "#828282", fontWeight: 600 }}>
                    Loan Type Distribution
                  </h5>
                </div>
                <div className="card-body text-center">
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: pieChartData.Educational, label: 'Educational Loans' },
                          { id: 1, value: pieChartData.Medical, label: 'Medical Loans' },
                          { id: 2, value: pieChartData.Micro, label: 'Micro Loans' },
                        ],
                      },
                    ]}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>

            {/* Line Chart Card */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0" style={{ color: "#828282", fontWeight: 600 }}>
                    Monthly Loan Activity
                  </h5>
                </div>
                <div className="card-body">
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                    series={[
                      { curve: "linear", data: [2, 3, 8, 9, 2, 13, 2, 21, 11, 2, 0, 0], label: "Loans Accepted" },
                    ]}
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>

    </>
  );
};

export default StatsSection;

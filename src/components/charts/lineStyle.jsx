import React, { useState, useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPieChart,
  faBarChart,
  faLineChart,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(
  BarController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
  Title
);

const LineStyleCharts = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let chartInstance;
    if (type === "combined") {
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Gráfico Combinado de Datos",
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: "Valores",
              },
            },
            y1: {
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                callback: (value) => `${value}%`,
              },
              title: {
                display: true,
                text: "Porcentaje",
              },
            },
          },
          layout: {
            padding: 20,
          },
        },
      });
    } else {
      chartInstance = new Chart(ctx, {
        type: type,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Gráfico de Datos",
            },
          },
          scales:
            type !== "pie"
              ? {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Valores",
                    },
                  },
                }
              : {},
          layout: {
            padding: 20,
          },
        },
      });
    }

    return () => {
      chartInstance.destroy();
    };
  }, [data, type]);

  return <canvas ref={chartRef} width="400" height="400" />;
};

const Dashboard = () => {
  const [chartType, setChartType] = useState("pie");

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets:
      chartType === "combined"
        ? [
            {
              label: "Dataset 1",
              data: [35, 54, 62, 91, 56, 78, 35],
              borderColor: "rgb(199, 14, 143, 0.5)",
              backgroundColor: "rgb(199, 14, 143, 0.5)",
              stack: "combined",
              type: "bar",
              yAxisID: "y",
            },
            {
              label: "Dataset 2",
              data: [25, 34, 52, 31, 46, 98, 25],
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              stack: "combined",
              type: "line",
              yAxisID: "y1",
            },
          ]
        : [
            {
              label: "Meses",
              data: [35, 74, 82, 61, 56, 98, 45],
              backgroundColor: [
                "#da1fd6", // Color púrpura
                "#ff5722", // Color naranja
                "#4caf50", // Color verde
                "#2196f3", // Color azul
                "#ffeb3b", // Color amarillo
                "#e91e63", // Color rosa
                "#9c27b0", // Color morado
              ],
            },
          ],
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card w-75" style={{ maxWidth: "75vh" }}>
        <div className="card-body">
          <h5 className="card-title">Gráfico</h5>
          <div
            className="btn-group mb-3 d-flex justify-content-center  "
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={`btn ${
                chartType === "pie" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setChartType("pie")}
            >
              <FontAwesomeIcon icon={faPieChart} /> PIE
            </button>
            <button
              type="button"
              className={`btn ${
                chartType === "bar" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setChartType("bar")}
            >
              <FontAwesomeIcon icon={faBarChart} /> BAR
            </button>
            <button
              type="button"
              className={`btn ${
                chartType === "line" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setChartType("line")}
            >
              <FontAwesomeIcon icon={faLineChart} /> LINE
            </button>
            <button
              type="button"
              className={`btn ${
                chartType === "combined" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setChartType("combined")}
            >
              <FontAwesomeIcon icon={faLayerGroup} /> COMBINED
            </button>
          </div>
          <LineStyleCharts data={data} type={chartType} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

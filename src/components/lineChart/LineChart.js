/** @format */

import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function LineChart({ XDATA, YDATA, border, background, color }) {
  const data = {
    labels: XDATA,
    datasets: [
      {
        label: "Avg interest by month",
        data: YDATA,
        fill: true,
        borderColor: `${border}`,
        borderWidth: 2,
        backgroundColor: `${background}`,
        cubicInterpolationMode: "monotone",
        tension: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 47,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Avg interest by month (days)",
        padding: {
          bottom: 30,
        },
        weight: "bolder",
        color: "#00325c",
        font: {
          size: 13,
        },
        align: "start",
      },
      datalabels: {
        display: true,
        color: `${color}`,
        align: "end",
        padding: {
          right: 2,
        },
        labels: {
          padding: { top: 10 },
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "green",
          },
        },
        formatter: function (value) {
          return "\n" + value + "°";
        },
      },
    },
  };

  return (
    <div className="line_height">
      <Line data={data} options={options} />
    </div>
  );
}

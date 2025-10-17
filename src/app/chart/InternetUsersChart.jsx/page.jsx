// InternetUsersChart.jsx
"use client";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const InternetUsersChart = () => {
  const options = {
    title: {
      text: "Weekly Sales", 
      style: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#111827", 
      },
    },
    accessibility: {
      point: {
        valueDescriptionFormat: "{xDescription}{separator}{value} million(s)",
      },
    },
    xAxis: {
      title: { text: "Year" },
      categories: [2025-10-11, 2025-10-13, 2025-10-15, 2025-10-17],
    },
    yAxis: {
      type: "logarithmic",
      title: { text: "Number of Internet Users (in millions)" },
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br />",
      pointFormat: "{point.y} million(s)",
    },
    series: [
      {
        name: "Internet Users",
        data: [300, 1000, 10, 200],
        color: "var(--highcharts-color-1, #2caffe)",
      },
    ],
  };

  return (
    <div className=" w-[280px] sm:w-full mx-auto  bg-white dark:bg-gray-800 md:p-6 rounded-xl shadow-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default InternetUsersChart;

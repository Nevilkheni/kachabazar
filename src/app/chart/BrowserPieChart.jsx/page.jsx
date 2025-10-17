// BrowserPieChart.jsx
"use client";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BrowserPieChart = () => {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Best Selling Products",
      style: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "Products",
        colorByPoint: true,
        data: [
          { name: "Head Shoulders Shampoo", y: 5.57 },
          { name: "Mint", y: 5.44 },
          { name: "Pantene hair-care", y: 4.76 },
          { name: "Dark & Lovely Conditioner", y: 4.47 },
        ],
      },
    ],
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: { valueSuffix: "%" },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: { enabled: false },
        showInLegend: true,
        borderWidth: 0,
      },
    },
  };

  return (
    <div className=" w-[280px] sm:w-full mx-auto  bg-white dark:bg-gray-800 md:p-6 rounded-xl shadow-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BrowserPieChart;

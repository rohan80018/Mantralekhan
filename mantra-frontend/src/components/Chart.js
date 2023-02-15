import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ data }) {
    // console.log(data.mon)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: data.mon,
      },
    },
  };
  const labels = data.count.map((d,index)=>index+1);
  const pdata = {
    labels,
    datasets: [
      {
        label: "Mantralekhans",
        data: data.count,
        backgroundColor: "#fa7211"
      },
    ],
  };

  return (
        <Bar options={options} data={pdata} />
    // </Box>
  );
}

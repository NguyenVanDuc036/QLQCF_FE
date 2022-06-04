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
import PieChart from "./pieChart/PieChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ThongKe(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

    const  labels = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy' , 'Chủ nhật']

  const data = {
    labels: labels,
    datasets: [{
        label: '',
        data: [3300000, 4000000, 3200000, 2450000, 2370000, 3430000 , 6400000],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            '#ffc4ff',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            '#ce93d8',
        ],
        borderWidth: 3
    }]
  };
  return (
    <div className="container pt-5">
      <div style={{ width: "800px"}}>
          <h3>Doanh thu tuần qua</h3>
        <Bar options={options} data={data} labels={labels} className="ml-4" />

       
      </div>
      <h3 className="mt-5" >Top 6 nước uống bán chạy trong tháng 5</h3>
      <PieChart/>
    </div>
  );
}

export default ThongKe;
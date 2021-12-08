import React, { useState, useRef, useEffect } from "react";
import "./Graphs.scss";
import styled from "styled-components";
import { cardShadow, hoverEffect, themeColor } from "../../Attendance/utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graphs = (props) => {
  
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance Graphs',
      },
    },
  };
  
  const labels = props.attendance.classNames;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Attendance',
        data: props.attendance.totalClasses,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Attended Classes',
        data: props.attendance.attendedClasses,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="graphs">
      <Bar options={options} data={data} style={{
      }}/>
    </div>
  );
};

export default Graphs;

import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// x is days since phase 1
// y is enrollment percent
const data1 = [
  { x: 0, y: 0 },
  { x: 1, y: 11 },
  { x: 2, y: 30 },
  { x: 3, y: 65 },
  { x: 4, y: 95 },
  { x: 5, y: 100 },
  { x: 6, y: 100 },
  { x: 7, y: 99 },
  { x: 8, y: 100 },
  { x: 9, y: 100 },
  { x: 10, y: 100 },
  { x: 11, y: 98 },
  { x: 12, y: 100 },
  { x: 13, y: 100 },
];

const data2 = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 10 },
  { x: 3, y: 15 },
  { x: 4, y: 29 },
  { x: 5, y: 40 },
  { x: 6, y: 49 },
  { x: 7, y: 59 },
  { x: 8, y: 63 },
  { x: 9, y: 67 },
  { x: 10, y: 69 },
  { x: 11, y: 72 },
  { x: 12, y: 73 },
  { x: 13, y: 74 },
];

function EnrollmentGraph() {

  useEffect(() => {
    const ctx = document.getElementById('enrollment-graph');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Class 1',
          data: data1,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Class 2',
          data: data2,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Enrollment Percentage Over Time',
        },
        scales: {
          xAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Days Since Phase 1',
            },
            ticks: {
              stepSize: 15,
              beginAtZero: true,
              max: 90,
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Enrollment Percent",
            },
            ticks: {
              beginAtZero: true,
              max: 100,
              callback: (label) => label + '%',
            }
          }]
        }
      }
    });
  }, []);
  return <canvas id="enrollment-graph" width="400" height="400"></canvas>;
}

export default EnrollmentGraph;

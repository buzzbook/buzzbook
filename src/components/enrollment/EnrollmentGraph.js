import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// x is days since phase 1
// y is enrollment percent
const data1 = [
  { x: 0, y: 0, waitlist: 0 },
  { x: 1, y: 11, waitlist: 0 },
  { x: 2, y: 30, waitlist: 0 },
  { x: 3, y: 65, waitlist: 0 },
  { x: 4, y: 95, waitlist: 0 },
  { x: 5, y: 100, waitlist: 1 },
  { x: 6, y: 100, waitlist: 5 },
  { x: 7, y: 99, waitlist: 10 },
  { x: 8, y: 100, waitlist: 9 },
  { x: 9, y: 100, waitlist: 7 },
  { x: 10, y: 100, waitlist: 8 },
  { x: 11, y: 98, waitlist: 9 },
  { x: 12, y: 100, waitlist: 8 },
  { x: 13, y: 100, waitlist: 8 },
];

const data2 = [
  { x: 0, y: 0, waitlist: 0 },
  { x: 1, y: 2, waitlist: 0 },
  { x: 2, y: 10, waitlist: 0 },
  { x: 3, y: 15, waitlist: 0 },
  { x: 4, y: 29, waitlist: 0 },
  { x: 5, y: 40, waitlist: 0 },
  { x: 6, y: 49, waitlist: 0 },
  { x: 7, y: 59, waitlist: 0 },
  { x: 8, y: 63, waitlist: 0 },
  { x: 9, y: 67, waitlist: 0 },
  { x: 10, y: 69, waitlist: 0 },
  { x: 11, y: 72, waitlist: 0 },
  { x: 12, y: 73, waitlist: 0 },
  { x: 13, y: 74, waitlist: 0 },
];

function EnrollmentGraph() {

  useEffect(() => {
    const ctx = document.getElementById('enrollment-graph');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'ACCT 2102',
          data: data1,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'CS 1100',
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
        },
        tooltips: {
          callbacks: {
            title: function () {
              return ``;
            },
            label: function (tooltipItem, data) {
              const line = data.datasets[tooltipItem.datasetIndex];
              const className = line.label;
              return `${className}`;
            },
            afterBody: function (tooltipPoints, data) {
              const tooltipItem = tooltipPoints[0];
              const rawLine = data.datasets[tooltipItem.datasetIndex];
              
              // index of the item corresponds with the x value of the data
              // i.e. Day 15 = the 15th index in data array
              const rawItem = rawLine.data[parseInt(tooltipItem.label)];
              const day = rawItem.x;
              const enrollment = rawItem.y;
              const waitlist = rawItem.waitlist;
              let testMultiline = [`Day ${day}`, `${enrollment}% enrolled`, `${waitlist} waitlist`];
              return testMultiline;
            },
          }
        },
      },
    });
  }, []);
  return <canvas id="enrollment-graph" width="400" height="400"></canvas>;
}

export default EnrollmentGraph;

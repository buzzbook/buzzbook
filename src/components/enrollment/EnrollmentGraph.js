import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// x is days since phase 1
// y is enrollment percent
const savedCourses = [
  {
    name: 'ACCT 2102', data: [
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
    ]
  },
  {
    name: 'CS 1100', data: [
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
    ]
  },
  {
    name: 'CS 1331', data: [
      { x: 0, y: 0, waitlist: 0 },
      { x: 1, y: 8, waitlist: 0 },
      { x: 2, y: 15, waitlist: 0 },
      { x: 3, y: 45, waitlist: 0 },
      { x: 4, y: 70, waitlist: 0 },
      { x: 5, y: 90, waitlist: 0 },
      { x: 6, y: 100, waitlist: 1 },
      { x: 7, y: 100, waitlist: 5 },
      { x: 8, y: 100, waitlist: 15 },
      { x: 9, y: 100, waitlist: 12 },
      { x: 10, y: 100, waitlist: 11 },
      { x: 11, y: 97, waitlist: 13 },
      { x: 12, y: 100, waitlist: 13 },
      { x: 13, y: 100, waitlist: 14 },
    ]
  },
];

// more colors needed
const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

function EnrollmentGraph() {
  useEffect(() => {
    const ctx = document.getElementById('enrollment-graph');
    const enrollmentGraph = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: []
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
    savedCourses.forEach((course, i) => {
      enrollmentGraph.data.datasets.push({
        label: course.name,
        data: course.data,
        borderColor: colors[i % colors.length],
        borderWidth: 1,
        fill: false,
      });
    });
    enrollmentGraph.update();
  }, []);
  return <canvas id="enrollment-graph" width="400" height="400"></canvas>;
}

export default EnrollmentGraph;

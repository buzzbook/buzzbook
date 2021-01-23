import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// x is days since phase 1
// y is enrollment percent
const testData = [
  [
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
    { x: 14, y: 100, waitlist: 8 },
    { x: 15, y: 100, waitlist: 8 },
    { x: 16, y: 100, waitlist: 8 },
    { x: 17, y: 100, waitlist: 8 },
    { x: 18, y: 100, waitlist: 8 },
    { x: 19, y: 100, waitlist: 8 },
    { x: 20, y: 100, waitlist: 8 },
    { x: 21, y: 100, waitlist: 8 },
    { x: 22, y: 100, waitlist: 8 },
    { x: 23, y: 100, waitlist: 8 },
    { x: 24, y: 100, waitlist: 8 },
    { x: 25, y: 100, waitlist: 8 },
    { x: 26, y: 100, waitlist: 8 },
    { x: 27, y: 100, waitlist: 8 },
    { x: 28, y: 100, waitlist: 8 },
    { x: 29, y: 100, waitlist: 8 },
    { x: 30, y: 100, waitlist: 8 },
    { x: 31, y: 100, waitlist: 8 },
    { x: 32, y: 100, waitlist: 8 },
    { x: 33, y: 100, waitlist: 8 },
    { x: 34, y: 100, waitlist: 8 },
    { x: 35, y: 100, waitlist: 8 },
    { x: 36, y: 100, waitlist: 8 },
    { x: 37, y: 100, waitlist: 8 },
    { x: 38, y: 100, waitlist: 8 },
    { x: 39, y: 100, waitlist: 8 },
    { x: 40, y: 100, waitlist: 8 },
    { x: 41, y: 100, waitlist: 8 },
    { x: 42, y: 100, waitlist: 8 },
    { x: 43, y: 100, waitlist: 8 },
    { x: 44, y: 100, waitlist: 8 },
    { x: 45, y: 100, waitlist: 8 },
    { x: 46, y: 100, waitlist: 8 },
    { x: 47, y: 98, waitlist: 6 },
    { x: 48, y: 96, waitlist: 10 },
    { x: 49, y: 98, waitlist: 9 },
    { x: 50, y: 100, waitlist: 8 },
  ],
  [
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
    { x: 14, y: 74, waitlist: 0 },
    { x: 15, y: 74, waitlist: 0 },
    { x: 16, y: 74, waitlist: 0 },
    { x: 17, y: 74, waitlist: 0 },
    { x: 18, y: 74, waitlist: 0 },
    { x: 19, y: 74, waitlist: 0 },
    { x: 20, y: 74, waitlist: 0 },
    { x: 21, y: 74, waitlist: 0 },
    { x: 22, y: 74, waitlist: 0 },
    { x: 23, y: 74, waitlist: 0 },
    { x: 24, y: 74, waitlist: 0 },
    { x: 25, y: 74, waitlist: 0 },
    { x: 26, y: 74, waitlist: 0 },
    { x: 27, y: 74, waitlist: 0 },
    { x: 28, y: 74, waitlist: 0 },
    { x: 29, y: 74, waitlist: 0 },
    { x: 30, y: 74, waitlist: 0 },
    { x: 31, y: 74, waitlist: 0 },
    { x: 32, y: 74, waitlist: 0 },
    { x: 33, y: 74, waitlist: 0 },
    { x: 34, y: 74, waitlist: 0 },
    { x: 35, y: 74, waitlist: 0 },
    { x: 36, y: 74, waitlist: 0 },
    { x: 37, y: 74, waitlist: 0 },
    { x: 38, y: 74, waitlist: 0 },
    { x: 39, y: 74, waitlist: 0 },
    { x: 40, y: 74, waitlist: 0 },
    { x: 41, y: 74, waitlist: 0 },
    { x: 42, y: 74, waitlist: 0 },
    { x: 43, y: 74, waitlist: 0 },
    { x: 44, y: 74, waitlist: 0 },
    { x: 45, y: 74, waitlist: 0 },
    { x: 46, y: 74, waitlist: 0 },
    { x: 47, y: 80, waitlist: 0 },
    { x: 48, y: 97, waitlist: 0 },
    { x: 49, y: 100, waitlist: 1 },
    { x: 50, y: 100, waitlist: 3 },
  ],
  [
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
    { x: 14, y: 100, waitlist: 14 },
    { x: 15, y: 100, waitlist: 14 },
    { x: 16, y: 100, waitlist: 14 },
    { x: 17, y: 100, waitlist: 14 },
    { x: 18, y: 100, waitlist: 14 },
    { x: 19, y: 100, waitlist: 14 },
    { x: 20, y: 100, waitlist: 14 },
    { x: 21, y: 100, waitlist: 14 },
    { x: 22, y: 100, waitlist: 14 },
    { x: 23, y: 100, waitlist: 14 },
    { x: 24, y: 100, waitlist: 14 },
    { x: 25, y: 100, waitlist: 14 },
    { x: 26, y: 100, waitlist: 14 },
    { x: 27, y: 100, waitlist: 14 },
    { x: 28, y: 100, waitlist: 14 },
    { x: 29, y: 100, waitlist: 14 },
    { x: 30, y: 100, waitlist: 14 },
    { x: 31, y: 100, waitlist: 14 },
    { x: 32, y: 100, waitlist: 14 },
    { x: 33, y: 100, waitlist: 14 },
    { x: 34, y: 100, waitlist: 14 },
    { x: 35, y: 100, waitlist: 14 },
    { x: 36, y: 100, waitlist: 14 },
    { x: 37, y: 100, waitlist: 14 },
    { x: 38, y: 100, waitlist: 14 },
    { x: 39, y: 100, waitlist: 14 },
    { x: 40, y: 100, waitlist: 14 },
    { x: 41, y: 100, waitlist: 14 },
    { x: 42, y: 100, waitlist: 14 },
    { x: 43, y: 100, waitlist: 14 },
    { x: 44, y: 100, waitlist: 14 },
    { x: 45, y: 100, waitlist: 14 },
    { x: 46, y: 100, waitlist: 14 },
    { x: 47, y: 95, waitlist: 10 },
    { x: 48, y: 93, waitlist: 5 },
    { x: 49, y: 96, waitlist: 3 },
    { x: 50, y: 100, waitlist: 2 },
  ],
  [
    { x: 0, y: 5, waitlist: 0 },
    { x: 1, y: 10, waitlist: 0 },
    { x: 2, y: 15, waitlist: 0 },
    { x: 3, y: 20, waitlist: 0 },
    { x: 4, y: 25, waitlist: 0 },
    { x: 5, y: 30, waitlist: 0 },
    { x: 6, y: 35, waitlist: 0 },
    { x: 7, y: 40, waitlist: 0 },
    { x: 8, y: 45, waitlist: 0 },
    { x: 9, y: 50, waitlist: 0 },
    { x: 10, y: 55, waitlist: 0 },
    { x: 11, y: 60, waitlist: 0 },
    { x: 12, y: 65, waitlist: 0 },
    { x: 13, y: 70, waitlist: 0 },
    { x: 14, y: 70, waitlist: 0 },
    { x: 15, y: 70, waitlist: 0 },
    { x: 16, y: 70, waitlist: 0 },
    { x: 17, y: 70, waitlist: 0 },
    { x: 18, y: 70, waitlist: 0 },
    { x: 19, y: 70, waitlist: 0 },
    { x: 20, y: 70, waitlist: 0 },
    { x: 21, y: 70, waitlist: 0 },
    { x: 22, y: 70, waitlist: 0 },
    { x: 23, y: 70, waitlist: 0 },
    { x: 24, y: 70, waitlist: 0 },
    { x: 25, y: 70, waitlist: 0 },
    { x: 26, y: 70, waitlist: 0 },
    { x: 27, y: 70, waitlist: 0 },
    { x: 28, y: 70, waitlist: 0 },
    { x: 29, y: 70, waitlist: 0 },
    { x: 30, y: 70, waitlist: 0 },
    { x: 31, y: 70, waitlist: 0 },
    { x: 32, y: 70, waitlist: 0 },
    { x: 33, y: 70, waitlist: 0 },
    { x: 34, y: 70, waitlist: 0 },
    { x: 35, y: 70, waitlist: 0 },
    { x: 36, y: 70, waitlist: 0 },
    { x: 37, y: 70, waitlist: 0 },
    { x: 38, y: 70, waitlist: 0 },
    { x: 39, y: 70, waitlist: 0 },
    { x: 40, y: 70, waitlist: 0 },
    { x: 41, y: 70, waitlist: 0 },
    { x: 42, y: 70, waitlist: 0 },
    { x: 43, y: 70, waitlist: 0 },
    { x: 44, y: 70, waitlist: 0 },
    { x: 45, y: 70, waitlist: 0 },
    { x: 46, y: 75, waitlist: 0 },
    { x: 47, y: 80, waitlist: 0 },
    { x: 48, y: 85, waitlist: 0 },
    { x: 49, y: 90, waitlist: 0 },
    { x: 50, y: 95, waitlist: 0 },
  ],
];

// more colors needed
const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

const config = {
  type: 'LineWithLine',
  data: {
    datasets: [],
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
      mode: 'index',
      intersect: false,
      xAlign: 'left',
      callbacks: {
        title: function (tooltipItem) {
          const day = tooltipItem[0].xLabel;
          return `Day ${day}`;
        },
        label: function (tooltipItem, data) {
          const line = data.datasets[tooltipItem.datasetIndex];
          const className = line.label;
          return `${className}`;
        },
        afterLabel: function (tooltipItem, data) {
          const rawLine = data.datasets[tooltipItem.datasetIndex];

          // index of the item corresponds with the x value of the data
          // i.e. Day 15 = the 15th index in data array
          const rawItem = rawLine.data[parseInt(tooltipItem.label)];
          const enrollment = rawItem.y;
          const waitlist = rawItem.waitlist;
          const multiline = [`${enrollment}% enrolled`, `${waitlist} waitlist`];
          return multiline;
        },
      }
    },
  },
};

function EnrollmentGraph({ savedCourses }) {
  useEffect(() => {
    const ctx = document.getElementById('enrollment-graph');

    // extends line chart to have the vertical line - LineWithLine
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#07C';
          ctx.stroke();
          ctx.restore();
        }
      }
    });

    new Chart(ctx, config);
  }, []);

  useEffect(() => {
    const formattedData = [];
    Object.keys(savedCourses).forEach((course, i) => {
      formattedData.push({ name: course, data: testData[i % testData.length] })
    });
    const datasets = [];
    formattedData.forEach((course, i) => {
      datasets.push({
        label: course.name,
        data: course.data,
        borderColor: colors[i % colors.length],
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: colors[i % colors.length],
        pointRadius: 2.4,
      });
    });
    config.data.datasets = datasets;
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.chart.update(config);
    });
  });
  return <canvas id="enrollment-graph" width="400" height="400"></canvas>;
}

export default EnrollmentGraph;

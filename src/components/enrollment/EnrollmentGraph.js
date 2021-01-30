import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// x is the date
// y is enrollment percent
const testData = [
  [
    { x: '11/5/2020', y: 0, waitlist: 0 },
    { x: '11/6/2020', y: 11, waitlist: 0 },
    { x: '11/7/2020', y: 30, waitlist: 0 },
    { x: '11/8/2020', y: 65, waitlist: 0 },
    { x: '11/9/2020', y: 95, waitlist: 0 },
    { x: '11/10/2020', y: 100, waitlist: 1 },
    { x: '11/11/2020', y: 100, waitlist: 5 },
    { x: '11/12/2020', y: 99, waitlist: 10 },
    { x: '11/13/2020', y: 100, waitlist: 9 },
    { x: '11/14/2020', y: 100, waitlist: 7 },
    { x: '11/15/2020', y: 100, waitlist: 8 },
    { x: '11/16/2020', y: 98, waitlist: 9 },
    { x: '11/17/2020', y: 100, waitlist: 8 },
    { x: '11/18/2020', y: 100, waitlist: 8 },
    { x: '11/19/2020', y: 100, waitlist: 8 },
    { x: '11/20/2020', y: 100, waitlist: 8 },
    { x: '11/21/2020', y: 100, waitlist: 8 },
    { x: '11/22/2020', y: 100, waitlist: 8 },
    { x: '11/23/2020', y: 100, waitlist: 8 },
    { x: '11/24/2020', y: 100, waitlist: 8 },
    { x: '11/25/2020', y: 100, waitlist: 8 },
    { x: '11/26/2020', y: 100, waitlist: 8 },
    { x: '11/27/2020', y: 100, waitlist: 8 },
    { x: '11/28/2020', y: 100, waitlist: 8 },
    { x: '11/29/2020', y: 100, waitlist: 8 },
    { x: '11/30/2020', y: 100, waitlist: 8 },
    { x: '12/1/2020', y: 100, waitlist: 8 },
    { x: '12/5/2020', y: 100, waitlist: 8 },
    { x: '12/6/2020', y: 100, waitlist: 8 },
    { x: '12/7/2020', y: 100, waitlist: 8 },
    { x: '12/8/2020', y: 100, waitlist: 8 },
    { x: '12/9/2020', y: 100, waitlist: 8 },
    { x: '12/10/2020', y: 100, waitlist: 8 },
    { x: '12/11/2020', y: 100, waitlist: 8 },
    { x: '12/12/2020', y: 100, waitlist: 8 },
    { x: '12/13/2020', y: 100, waitlist: 8 },
    { x: '12/14/2020', y: 100, waitlist: 8 },
    { x: '12/15/2020', y: 100, waitlist: 8 },
    { x: '12/16/2020', y: 100, waitlist: 8 },
    { x: '12/17/2020', y: 100, waitlist: 8 },
    { x: '12/18/2020', y: 100, waitlist: 8 },
    { x: '12/19/2020', y: 100, waitlist: 8 },
    { x: '12/20/2020', y: 100, waitlist: 8 },
    { x: '12/21/2020', y: 100, waitlist: 8 },
    { x: '12/22/2020', y: 100, waitlist: 8 },
    { x: '12/23/2020', y: 100, waitlist: 8 },
    { x: '12/24/2020', y: 100, waitlist: 8 },
    { x: '12/25/2020', y: 98, waitlist: 6 },
    { x: '12/26/2020', y: 96, waitlist: 10 },
    { x: '12/27/2020', y: 98, waitlist: 9 },
    { x: '12/28/2020', y: 100, waitlist: 8 },
  ],
  [
    { x: '11/5/2020', y: 0, waitlist: 0 },
    { x: '11/6/2020', y: 5, waitlist: 0 },
    { x: '11/7/2020', y: 20, waitlist: 0 },
    { x: '11/8/2020', y: 50, waitlist: 0 },
    { x: '11/9/2020', y: 77, waitlist: 0 },
    { x: '11/10/2020', y: 88, waitlist: 0 },
    { x: '11/11/2020', y: 100, waitlist: 2 },
    { x: '11/12/2020', y: 100, waitlist: 5 },
    { x: '11/13/2020', y: 100, waitlist: 6 },
    { x: '11/14/2020', y: 99, waitlist: 7 },
    { x: '11/15/2020', y: 100, waitlist: 6 },
    { x: '11/16/2020', y: 100, waitlist: 6 },
    { x: '11/17/2020', y: 100, waitlist: 6 },
    { x: '11/18/2020', y: 100, waitlist: 6 },
    { x: '11/19/2020', y: 100, waitlist: 6 },
    { x: '11/20/2020', y: 100, waitlist: 6 },
    { x: '11/21/2020', y: 100, waitlist: 6 },
    { x: '11/22/2020', y: 100, waitlist: 6 },
    { x: '11/23/2020', y: 100, waitlist: 6 },
    { x: '11/24/2020', y: 100, waitlist: 6 },
    { x: '11/25/2020', y: 100, waitlist: 6 },
    { x: '11/26/2020', y: 100, waitlist: 6 },
    { x: '11/27/2020', y: 100, waitlist: 6 },
    { x: '11/28/2020', y: 100, waitlist: 6 },
    { x: '11/29/2020', y: 100, waitlist: 6 },
    { x: '11/30/2020', y: 100, waitlist: 6 },
    { x: '12/1/2020', y: 100, waitlist: 6 },
    { x: '12/5/2020', y: 100, waitlist: 6 },
    { x: '12/6/2020', y: 100, waitlist: 6 },
    { x: '12/7/2020', y: 100, waitlist: 6 },
    { x: '12/8/2020', y: 100, waitlist: 6 },
    { x: '12/9/2020', y: 100, waitlist: 6 },
    { x: '12/10/2020', y: 100, waitlist: 6 },
    { x: '12/11/2020', y: 100, waitlist: 6 },
    { x: '12/12/2020', y: 100, waitlist: 6 },
    { x: '12/13/2020', y: 100, waitlist: 6 },
    { x: '12/14/2020', y: 100, waitlist: 6 },
    { x: '12/15/2020', y: 100, waitlist: 6 },
    { x: '12/16/2020', y: 100, waitlist: 6 },
    { x: '12/17/2020', y: 100, waitlist: 6 },
    { x: '12/18/2020', y: 100, waitlist: 6 },
    { x: '12/19/2020', y: 100, waitlist: 6 },
    { x: '12/20/2020', y: 100, waitlist: 6 },
    { x: '12/21/2020', y: 100, waitlist: 6 },
    { x: '12/22/2020', y: 100, waitlist: 6 },
    { x: '12/23/2020', y: 100, waitlist: 6 },
    { x: '12/24/2020', y: 100, waitlist: 6 },
    { x: '12/25/2020', y: 100, waitlist: 4 },
    { x: '12/26/2020', y: 99, waitlist: 5 },
    { x: '12/27/2020', y: 100, waitlist: 5 },
    { x: '12/28/2020', y: 100, waitlist: 6 },
  ],
  [
    { x: '11/5/2020', y: 0, waitlist: 0 },
    { x: '11/6/2020', y: 5, waitlist: 0 },
    { x: '11/7/2020', y: 16, waitlist: 0 },
    { x: '11/8/2020', y: 29, waitlist: 0 },
    { x: '11/9/2020', y: 35, waitlist: 0 },
    { x: '11/10/2020', y: 56, waitlist: 0 },
    { x: '11/11/2020', y: 60, waitlist: 0 },
    { x: '11/12/2020', y: 75, waitlist: 0 },
    { x: '11/13/2020', y: 81, waitlist: 0 },
    { x: '11/14/2020', y: 81, waitlist: 0 },
    { x: '11/15/2020', y: 83, waitlist: 0 },
    { x: '11/16/2020', y: 83, waitlist: 0 },
    { x: '11/17/2020', y: 83, waitlist: 0 },
    { x: '11/18/2020', y: 83, waitlist: 0 },
    { x: '11/19/2020', y: 83, waitlist: 0 },
    { x: '11/20/2020', y: 83, waitlist: 0 },
    { x: '11/21/2020', y: 83, waitlist: 0 },
    { x: '11/22/2020', y: 83, waitlist: 0 },
    { x: '11/23/2020', y: 83, waitlist: 0 },
    { x: '11/24/2020', y: 83, waitlist: 0 },
    { x: '11/25/2020', y: 83, waitlist: 0 },
    { x: '11/26/2020', y: 83, waitlist: 0 },
    { x: '11/27/2020', y: 83, waitlist: 0 },
    { x: '11/28/2020', y: 83, waitlist: 0 },
    { x: '11/29/2020', y: 83, waitlist: 0 },
    { x: '11/30/2020', y: 83, waitlist: 0 },
    { x: '12/1/2020', y: 83, waitlist: 0 },
    { x: '12/5/2020', y: 83, waitlist: 0 },
    { x: '12/6/2020', y: 83, waitlist: 0 },
    { x: '12/7/2020', y: 83, waitlist: 0 },
    { x: '12/8/2020', y: 83, waitlist: 0 },
    { x: '12/9/2020', y: 83, waitlist: 0 },
    { x: '12/10/2020', y: 83, waitlist: 0 },
    { x: '12/11/2020', y: 83, waitlist: 0 },
    { x: '12/12/2020', y: 83, waitlist: 0 },
    { x: '12/13/2020', y: 83, waitlist: 0 },
    { x: '12/14/2020', y: 83, waitlist: 0 },
    { x: '12/15/2020', y: 83, waitlist: 0 },
    { x: '12/16/2020', y: 83, waitlist: 0 },
    { x: '12/17/2020', y: 83, waitlist: 0 },
    { x: '12/18/2020', y: 83, waitlist: 0 },
    { x: '12/19/2020', y: 83, waitlist: 0 },
    { x: '12/20/2020', y: 83, waitlist: 0 },
    { x: '12/21/2020', y: 83, waitlist: 0 },
    { x: '12/22/2020', y: 83, waitlist: 0 },
    { x: '12/23/2020', y: 83, waitlist: 0 },
    { x: '12/24/2020', y: 83, waitlist: 0 },
    { x: '12/25/2020', y: 83, waitlist: 0 },
    { x: '12/26/2020', y: 87, waitlist: 0 },
    { x: '12/27/2020', y: 95, waitlist: 0 },
    { x: '12/28/2020', y: 94, waitlist: 0 },
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
        type: 'time',
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
        ticks: {
          max: '1/15/2021',
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
          const day = new Date(tooltipItem[0].xLabel).toDateString();
          return `${day}`;
        },
        label: function (tooltipItem, data) {
          const line = data.datasets[tooltipItem.datasetIndex];
          const className = line.label;
          return `${className}`;
        },
        afterLabel: function (tooltipItem, data) {
          const rawLine = data.datasets[tooltipItem.datasetIndex];
          const rawItem = rawLine.data[tooltipItem.index];
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
        borderWidth: 3.5,
        fill: false,
        pointBackgroundColor: colors[i % colors.length],
        pointRadius: 0,
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

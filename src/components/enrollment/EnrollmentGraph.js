import React, { useEffect } from "react";
import Chart from 'chart.js';
// Webpack import not working for some reason
// import {graphic} from "../../img/gradesPageGraphic.png";

// Replace dates to change the phase start/end marker
const phaseOneEndDate = '12/11/2020';
const phaseTwoStartDate = '1/8/2021';
const phaseTwoEndDate = '1/22/2021';

// x is the date
// y is enrollment percent
const testEnrollmentData = [
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
    { x: '11/21/2020', y: 99, waitlist: 7 },
    { x: '11/22/2020', y: 98, waitlist: 8 },
    { x: '11/23/2020', y: 100, waitlist: 7 },
    { x: '11/24/2020', y: 100, waitlist: 8 },
    { x: '11/25/2020', y: 98, waitlist: 8 },
    { x: '11/26/2020', y: 100, waitlist: 8 },
    { x: '11/27/2020', y: 100, waitlist: 8 },
    { x: '11/28/2020', y: 100, waitlist: 8 },
    { x: '11/29/2020', y: 100, waitlist: 8 },
    { x: '11/30/2020', y: 100, waitlist: 8 },
    { x: '12/1/2020', y: 100, waitlist: 8 },
    { x: '12/5/2020', y: 98, waitlist: 8 },
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
    { x: '12/25/2020', y: 100, waitlist: 8 },
    { x: '12/26/2020', y: 100, waitlist: 8 },
    { x: '12/27/2020', y: 100, waitlist: 8 },
    { x: '12/28/2020', y: 100, waitlist: 8 },
    { x: '12/29/2020', y: 100, waitlist: 8 },
    { x: '12/30/2020', y: 100, waitlist: 8 },
    { x: '12/31/2020', y: 100, waitlist: 8 },
    { x: '1/1/2021', y: 100, waitlist: 8 },
    { x: '1/2/2021', y: 100, waitlist: 8 },
    { x: '1/3/2021', y: 100, waitlist: 8 },
    { x: '1/4/2021', y: 100, waitlist: 8 },
    { x: '1/5/2021', y: 100, waitlist: 8 },
    { x: '1/6/2021', y: 100, waitlist: 8 },
    { x: '1/7/2021', y: 100, waitlist: 8 },
    { x: '1/8/2021', y: 100, waitlist: 8 },
    { x: '1/9/2021', y: 99, waitlist: 8 },
    { x: '1/10/2021', y: 100, waitlist: 8 },
    { x: '1/11/2021', y: 100, waitlist: 8 },
    { x: '1/12/2021', y: null, waitlist: null },
    { x: '1/13/2021', y: null, waitlist: null },
    { x: '1/14/2021', y: null, waitlist: null },
    { x: '1/15/2021', y: null, waitlist: null },
    { x: '1/16/2021', y: null, waitlist: null },
    { x: '1/17/2021', y: null, waitlist: null },
    { x: '1/18/2021', y: null, waitlist: null },
    { x: '1/19/2021', y: null, waitlist: null },
    { x: '1/20/2021', y: null, waitlist: null },
    { x: '1/21/2021', y: null, waitlist: null },
    { x: '1/22/2021', y: null, waitlist: null },
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
    { x: '12/11/2020', y: 98, waitlist: 6 },
    { x: '12/12/2020', y: 98, waitlist: 6 },
    { x: '12/13/2020', y: 98, waitlist: 6 },
    { x: '12/14/2020', y: 98, waitlist: 6 },
    { x: '12/15/2020', y: 98, waitlist: 6 },
    { x: '12/16/2020', y: 98, waitlist: 6 },
    { x: '12/17/2020', y: 98, waitlist: 6 },
    { x: '12/18/2020', y: 98, waitlist: 6 },
    { x: '12/19/2020', y: 98, waitlist: 6 },
    { x: '12/20/2020', y: 98, waitlist: 6 },
    { x: '12/21/2020', y: 98, waitlist: 6 },
    { x: '12/22/2020', y: 98, waitlist: 6 },
    { x: '12/23/2020', y: 98, waitlist: 6 },
    { x: '12/24/2020', y: 98, waitlist: 6 },
    { x: '12/25/2020', y: 98, waitlist: 6 },
    { x: '12/26/2020', y: 98, waitlist: 6 },
    { x: '12/27/2020', y: 98, waitlist: 6 },
    { x: '12/28/2020', y: 98, waitlist: 6 },
    { x: '12/29/2020', y: 98, waitlist: 6 },
    { x: '12/30/2020', y: 98, waitlist: 6 },
    { x: '12/31/2020', y: 98, waitlist: 6 },
    { x: '1/1/2021', y: 98, waitlist: 6 },
    { x: '1/2/2021', y: 98, waitlist: 6 },
    { x: '1/3/2021', y: 98, waitlist: 6 },
    { x: '1/4/2021', y: 98, waitlist: 6 },
    { x: '1/5/2021', y: 98, waitlist: 6 },
    { x: '1/6/2021', y: 98, waitlist: 6 },
    { x: '1/7/2021', y: 98, waitlist: 6 },
    { x: '1/8/2021', y: 100, waitlist: 6 },
    { x: '1/9/2021', y: 100, waitlist: 6 },
    { x: '1/10/2021', y: 100, waitlist: 6 },
    { x: '1/11/2021', y: 100, waitlist: 6 },
    { x: '1/12/2021', y: null, waitlist: null },
    { x: '1/13/2021', y: null, waitlist: null },
    { x: '1/14/2021', y: null, waitlist: null },
    { x: '1/15/2021', y: null, waitlist: null },
    { x: '1/16/2021', y: null, waitlist: null },
    { x: '1/17/2021', y: null, waitlist: null },
    { x: '1/18/2021', y: null, waitlist: null },
    { x: '1/19/2021', y: null, waitlist: null },
    { x: '1/20/2021', y: null, waitlist: null },
    { x: '1/21/2021', y: null, waitlist: null },
    { x: '1/22/2021', y: null, waitlist: null },
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
    { x: '11/17/2020', y: 80, waitlist: 0 },
    { x: '11/18/2020', y: 81, waitlist: 0 },
    { x: '11/19/2020', y: 83, waitlist: 0 },
    { x: '11/20/2020', y: 84, waitlist: 0 },
    { x: '11/21/2020', y: 85, waitlist: 0 },
    { x: '11/22/2020', y: 84, waitlist: 0 },
    { x: '11/23/2020', y: 86, waitlist: 0 },
    { x: '11/24/2020', y: 85, waitlist: 0 },
    { x: '11/25/2020', y: 85, waitlist: 0 },
    { x: '11/26/2020', y: 85, waitlist: 0 },
    { x: '11/27/2020', y: 85, waitlist: 0 },
    { x: '11/28/2020', y: 86, waitlist: 0 },
    { x: '11/29/2020', y: 83, waitlist: 0 },
    { x: '11/30/2020', y: 82, waitlist: 0 },
    { x: '12/1/2020', y: 82, waitlist: 0 },
    { x: '12/5/2020', y: 82, waitlist: 0 },
    { x: '12/6/2020', y: 82, waitlist: 0 },
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
    { x: '12/26/2020', y: 83, waitlist: 0 },
    { x: '12/27/2020', y: 83, waitlist: 0 },
    { x: '12/28/2020', y: 83, waitlist: 0 },
    { x: '12/29/2020', y: 83, waitlist: 0 },
    { x: '12/30/2020', y: 83, waitlist: 0 },
    { x: '12/31/2020', y: 83, waitlist: 0 },
    { x: '1/1/2021', y: 83, waitlist: 0 },
    { x: '1/2/2021', y: 83, waitlist: 0 },
    { x: '1/3/2021', y: 83, waitlist: 0 },
    { x: '1/4/2021', y: 83, waitlist: 0 },
    { x: '1/5/2021', y: 83, waitlist: 0 },
    { x: '1/6/2021', y: 83, waitlist: 0 },
    { x: '1/7/2021', y: 83, waitlist: 0 },
    { x: '1/8/2021', y: 85, waitlist: 0 },
    { x: '1/9/2021', y: 89, waitlist: 0 },
    { x: '1/10/2021', y: 90, waitlist: 0 },
    { x: '1/11/2021', y: 89, waitlist: 0 },
    { x: '1/12/2021', y: null, waitlist: null },
    { x: '1/13/2021', y: null, waitlist: null },
    { x: '1/14/2021', y: null, waitlist: null },
    { x: '1/15/2021', y: null, waitlist: null },
    { x: '1/16/2021', y: null, waitlist: null },
    { x: '1/17/2021', y: null, waitlist: null },
    { x: '1/18/2021', y: null, waitlist: null },
    { x: '1/19/2021', y: null, waitlist: null },
    { x: '1/20/2021', y: null, waitlist: null },
    { x: '1/21/2021', y: null, waitlist: null },
    { x: '1/22/2021', y: null, waitlist: null },
  ],
];

const testData = [
  {
    course: "ACCT 2101", 
    overallData: testEnrollmentData[0],
    professor: {
      // Enrollment data for professor here in same format as testEnrollmentData
      Bob: testEnrollmentData[1],
      John: testEnrollmentData[2]
    }
  },
  {
    course: "ACCT 2102", 
    overallData: testEnrollmentData[1],
    professor: {
      // Enrollment data for professor here in same format as testEnrollmentData
      Bob: testEnrollmentData[0],
      John: testEnrollmentData[2]
    }
  },
  {
    course: "ACCT 2103", 
    overallData: testEnrollmentData[2],
    professor: {
      // Enrollment data for professor here in same format as testEnrollmentData
      Bob: testEnrollmentData[1],
      John: testEnrollmentData[0]
    }
  }
]

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
          max: phaseTwoEndDate,
        },
        gridLines: {},
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
        },
        gridLines: {},

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
    legend: {
      labels: {},
    },
  },
};

// more colors needed
const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

const getIndexOfDate = (date, data) => {
  for (let i = 0; i < data.length; i++) {
    if (date === data[i]) {
      return i;
    }
  }
  return -1;
}

const setColors = () => {
  const style = window.getComputedStyle(document.documentElement);

  const textColor = style.getPropertyValue('--primarytextcolor');
  const secTextColor = style.getPropertyValue('--secondarytextcolor');
  const grey = style.getPropertyValue('--boundarycolor');

  config.options.title.fontColor = textColor;

  config.options.scales.xAxes[0].scaleLabel.fontColor = textColor;
  config.options.scales.xAxes[0].ticks.fontColor = textColor;
  config.options.scales.xAxes[0].gridLines.color = grey;
  config.options.scales.xAxes[0].gridLines.zeroLineColor = secTextColor;

   config.options.scales.yAxes[0].scaleLabel.fontColor = textColor;
  config.options.scales.yAxes[0].ticks.fontColor = textColor;
  config.options.scales.yAxes[0].gridLines.color = grey;
  config.options.scales.yAxes[0].gridLines.zeroLineColor = secTextColor;

  config.options.legend.labels.fontColor = textColor;
}

function EnrollmentGraph({ savedCourses }) {

  setColors();

  useEffect(() => {
    const ctx = document.getElementById('enrollment-graph');

    // extends line chart to have the vertical line - LineWithLine
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        const ctx = this.chart.ctx,
          topY = this.chart.scales['y-axis-0'].top,
          bottomY = this.chart.scales['y-axis-0'].bottom;

        const data = this.chart.config.data.datasets[0].data;

        // phase 1 end line
        const phaseOneIndex = getIndexOfDate(phaseOneEndDate, data.map(point => point.x));
        const phaseOneLineX = this.getMeta().data[phaseOneIndex]._model.x;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([15, 10]);
        ctx.moveTo(phaseOneLineX, topY);
        ctx.lineTo(phaseOneLineX, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#C6C6C6';
        ctx.fillStyle = '#7C7C7C'
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.rotate(Math.PI / 2);
        ctx.fillText('PHASE 1 END', bottomY - (bottomY / 8), -phaseOneLineX - 10);
        ctx.restore();

        // phase 2 start line
        const phaseTwoIndex = getIndexOfDate(phaseTwoStartDate, data.map(point => point.x));
        const phaseTwoLineX = this.getMeta().data[phaseTwoIndex]._model.x;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([15, 10]);
        ctx.moveTo(phaseTwoLineX, topY);
        ctx.lineTo(phaseTwoLineX, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#C6C6C6';
        ctx.fillStyle = '#7C7C7C'
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.rotate(Math.PI / 2);
        ctx.fillText('PHASE 2 START', bottomY - (bottomY / 8), -phaseTwoLineX - 10);
        ctx.restore();

        // hover line
        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          const activePoint = this.chart.tooltip._active[0],
            x = activePoint.tooltipPosition().x;

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
      // decide whether to display overall data or specific professor's data
      // TODO: once we have real data, we select the appropriate course data
      const courseData = testData[i % testData.length];
      // TODO: one we have real data, we select the appropriate professor data
      const dataSource = (savedCourses[course].professorFilter.value === "All Professors") ? courseData.overallData : courseData.professor["Bob"];
      formattedData.push({ name: course, data: dataSource })
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

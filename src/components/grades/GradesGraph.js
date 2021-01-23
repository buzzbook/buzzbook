import React, { useEffect } from 'react';
import Chart from 'chart.js';

const testData = [
  [27, 19, 16, 15, 7, 5, 3, 4, 1, 3, 0],
  [9, 16, 19, 27, 14, 6, 5, 2, 1, 1, 0],
  [12, 14, 17, 22, 14, 7, 6, 3, 2, 2, 1],
];

const calcPercentile = (index, dataList) => {
  let sum = 0;
  for (let i = 0; i < dataList.length; i++) {
    if (i > index) break;
    sum += dataList[i];
  }
  return `${100 - sum}`;
}

const config = {
  type: 'bar',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Grade Distribution',
    },
    scales: {
      xAxes: [{
        type: 'category',
        labels: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
      }],
      yAxes: [{
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: "Percentage of Class",
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 50,
          callback: (label) => label + '%',
        }
      }]
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function (toolTipItemList, data) {
          return toolTipItemList[0].xLabel;
        },
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const className = dataset.label;
          const percentage = tooltipItem.value;
          return `${className} - ${percentage}%`;
        },
        afterLabel: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const className = dataset.label;
          const percetile = calcPercentile(tooltipItem.index, dataset.data);
          return `upper ${percetile} percentile of ${className}`;
        }
      }
    },
  },
};

const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

function GradesGraph({ savedCourses }) {
  useEffect(() => {
    const ctx = document.getElementById('grade-graph');
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
        backgroundColor: colors[i % colors.length],
        fill: false,
      });
    });
    config.data.datasets = datasets;
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.chart.update(config);
    })
  });
  return <canvas id="grade-graph" width="400" height="400"></canvas>;
}

export default GradesGraph;

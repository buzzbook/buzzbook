import React, { useEffect } from 'react';
import Chart from 'chart.js';

const savedCourses = [
  { name: 'CS 1100', data: [27, 19, 16, 15, 7, 5, 3, 4, 1, 3, 0], },
  { name: 'CS 1331', data: [9, 16, 19, 27, 14, 6, 5, 2, 1, 1, 0], },
  { name: 'CS 1332', data: [12, 14, 17, 22, 14, 7, 6, 3, 2, 2, 1], },
];

const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

function GradesGraph() {
  useEffect(() => {
    const ctx = document.getElementById('grade-graph');
    const gradeGraph = new Chart(ctx, {
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
          callbacks: {
            title: function() {
              return ``;
            },
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const className = dataset.label;
              const percentage = tooltipItem.value;
              return `${className} - ${percentage}%`;
            },
          }
        },
      },
    });
    savedCourses.forEach((course, i) => {
      gradeGraph.data.datasets.push({
        label: course.name,
        data: course.data,
        backgroundColor: colors[i % colors.length],
        fill: false,
      });
    });
    gradeGraph.update();
  }, []);
  return <canvas id="grade-graph" width="400" height="400"></canvas>;
}

export default GradesGraph;

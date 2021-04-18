import React, { useEffect } from 'react';
import Chart from 'chart.js';

const testData = [
  {
    course: "ACCT 2101", 
    averageData: [30, 23, 17, 18, 7, 5],
    professor: {
      Bob: [1, 2, 3, 4, 5, 6],
      John: [6, 5, 4, 3, 2, 1]
    }
  },
  {
    course: "ACCT 2102", 
    averageData: [14, 19, 20, 27, 14, 6],
    professor: {
      Bob: [1, 2, 3, 4, 5, 6],
      John: [6, 5, 4, 3, 2, 1]
    }
  },
  {
    course: "ACCT 2103", 
    averageData: [12, 20, 22, 25, 14, 7],
    professor: {
      Bob: [1, 2, 3, 4, 5, 6],
      John: [6, 5, 4, 3, 2, 1]
    }
  }
];

const calcPercentile = (index, dataList) => {
  let sum = 0;
  for (let i = 0; i < dataList.length; i++) {
    if (i > index) break;
    sum += dataList[i];
  }
  return `${100 - sum}`;
}

const getSuffix = (num) => {
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'st';
  } else if (lastDigit === 2 && lastTwoDigits !== 12) {
    return 'nd';
  } else if (lastDigit === 3 && lastTwoDigits !== 13) {
    return 'rd';
  } else {
    return 'th';
  }
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
        labels: ['A', 'B', 'C', 'D', 'F', 'W'],
        scaleLabel: {
          display: true,
          labelString: 'Grade',
        },
        ticks: {},
        gridLines: {},
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
        },
        gridLines: {},
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
          const lowerPercetile = calcPercentile(tooltipItem.index, dataset.data);
          const upperPercentile = (tooltipItem.xLabel === 'A') ? '99' : calcPercentile(tooltipItem.index - 1, dataset.data);
          const suffix = getSuffix(upperPercentile);
          return `${lowerPercetile}-${upperPercentile}${suffix} percentile of ${className}`;
        }
      }
    },
    legend: {
      labels: {},
    },
  },
};

const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 193, 69, 1)', 'rgba(178, 247, 239, 1)'];

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


function GradesGraph({ savedCourses }) {

  setColors();

  useEffect(() => {
    const ctx = document.getElementById('grade-graph');
    new Chart(ctx, config);
  }, []);

  useEffect(() => {
    const formattedData = [];
    Object.keys(savedCourses).forEach((course, i) => {
      // decide whether to display average data or specific professor's data
      // TODO: once we have real data, we select the appropriate course data
      const courseData = testData[i % testData.length];
      // TODO: one we have real data, we select the appropriate professor data
      const dataSource = (savedCourses[course].professorFilter.value === "All Professors") ? courseData.averageData : courseData.professor["Bob"];
      formattedData.push({ name: course, data: dataSource })
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

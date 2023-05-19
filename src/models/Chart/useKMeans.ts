import {
  ChartData, ChartOptions,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend, Point, PointPrefixedOptions, Color,
} from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import type { PointPrefixedHoverOptions } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export type ChartDataType = {
  x: number;
  y: number;
};

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'hotpink', 'black', 'orange', 'brown', 'grey'];

const useKMeans = (data: ChartDataType[], k: number, label = 'Dataset') => {
  const clusterCenters = useMemo(() => {
    const centers: ChartDataType[] = [];
    for (let i = 0; i < k; i++) {
      centers.push({
        x: Number((Math.random() * 10).toFixed(2)),
        y: Number((Math.random() * 10).toFixed(2)),
      });
    }
    return centers;
  }, [k]);

  const [chartData, setChartData] = useState<ChartData<'scatter'>>({
    datasets: [
      {
        label,
        data: clusterCenters.concat(data) as ChartDataType[],
        pointStyle: clusterCenters.map(() => 'triangle').concat(data.map(() => 'circle')),
        pointRadius: clusterCenters.map(() => 10).concat(data.map(() => 5.5)),
        pointBackgroundColor: colors.slice(0, k),
        showLine: false,
        backgroundColor: 'aqua',
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'scatter'>>({
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: false,
        display: true,
        ticks: {
          font: {
            size: 20,
          },
        },
        title: {
          text: 'X',
          color: '#000',
          font: {
            size: 30,
          },
          display: true,
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        labels: ['Y'],
        ticks: {
          font: {
            size: 20,
          },
        },
        title: {
          text: 'Y',
          color: '#000',
          font: {
            size: 30,
          },
          display: true,
        },
      },
    },
    responsive: true,
  });

  const labelDataPoints = () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      const newArray: Color[] = [...chartData.datasets[0].pointBackgroundColor as []];
      data.forEach((point, i) => {
        const distances = [];
        for (let j = 0; j < k; j++) {
          const item = chartData.datasets[0].data[j] as ChartDataType;
          const clusterCenterX = item.x;
          const clusterCenterY = item.y;
          distances.push(Math.sqrt(((clusterCenterX - point.x) ** 2) + ((clusterCenterY - point.y) ** 2)));
        }
        const { min } = Math;
        const minValue = min.apply(Math, distances);
        const index = distances.indexOf(minValue);
        newArray[i + k] = newArray[index];
      });
      setChartData((prevState) => {
        return {
          ...prevState,
          datasets: [
            ...prevState.datasets,
            {
              ...prevState.datasets[0],
              pointBackgroundColor: newArray,
            },
          ],
        };
      });
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((res) => setTimeout(res, 2000));
      resolve();
    });
  };

  return {
    chartData,
    chartOptions,
    labelDataPoints,
  };
};

export default useKMeans;

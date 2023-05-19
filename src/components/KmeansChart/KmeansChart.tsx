import React, { FC, useEffect } from 'react';
import { Chart, Scatter } from 'react-chartjs-2';
import { useKMeans } from '../../models';
import { ChartDataType } from '../../types';

interface KMeansChartProps {
  data: ChartDataType[];
}

const KmeansChart: FC<KMeansChartProps> = ({ data }) => {
  const { chartData, chartOptions, labelDataPoints } = useKMeans(data, 3, 'K - means');

  useEffect(() => {
    const setInitialLabelDataPoints = async () => {
      await labelDataPoints();
    };

    setInitialLabelDataPoints();
  }, [labelDataPoints]);

  return (
    <Scatter
      width={1200}
      height={800}
      data={chartData}
      options={chartOptions}
      updateMode="active"
    />
  );
};

export default KmeansChart;

import React from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

const StyledChartContainer = styled.div`
  width: 600px;

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 500px) {
    width: 400px;
  }
`;

const options = {
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 500 },
        chartOptions: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  },
};

function PieChart({ series }) {
  options.series = series;

  return (
    <StyledChartContainer>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </StyledChartContainer>
  );
}

PieChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, y: PropTypes.number }),
      ),
    }),
  ),
};

PieChart.defaultProps = {
  series: [
    {
      type: 'pie',
      data: [
        {
          name: '',
          y: 0,
        },
        {
          name: '',
          y: 0,
        },
      ],
    },
  ],
};

export default PieChart;

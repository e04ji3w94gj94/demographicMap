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
  chart: {
    type: 'column',
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    categories: ['共同生活', '獨立生活'],
    title: {
      text: '型態',
    },
  },
  yAxis: {
    title: {
      text: '數量',
    },
  },
};

function BarChart({ series }) {
  options.series = series;
  return (
    <StyledChartContainer>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </StyledChartContainer>
  );
}

BarChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
};

BarChart.defaultProps = {
  series: [{ name: '', data: [] }],
};

export default BarChart;

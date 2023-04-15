/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import BarChart from './barChart';
import PieChart from './pieChart';
import { rsOpendataDocument, rsOpendataDemographics } from '../api/rsOpendata';
import areaData from '../data/area_data';

const StyledBackdrop = styled(Backdrop)`
  z-index: 1000;
`;

const StyledMainContainer = styled(Grid)`
  @media only screen and (max-width: 500px) {
    position: relative;
  }
`;

const StyledInputGroupContainer = styled(Grid)`
  width: 35rem !important;

  @media only screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

const StyledRotatedTextontainer = styled(Grid)`

  @media only screen and (max-width: 500px) {
    position: absolute;
    top: 12%;
    left: -75%;
  }
`;

const StyledTitleContainer = styled(Grid)`
  @media only screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const StyledSearchResultWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLine = styled.div`
  height: 2px;
  background-color: #e833f5;
  flex-grow: 1;
  width: 35vw;
`;

const StyledChip = styled(Chip)`
  margin: 0 1.25rem;
`;

const RotatedText = styled.p`
  transform: rotate(90deg);
  position: absolute;
  text-align: center;
  font-size: 10rem;
  left: -15%;
  top: 25%;
  letter-spacing: 2rem;

  @media only screen and (max-width: 768px) {
    left: -45%;
    opacity: 0.5;
  }

  @media only screen and (max-width: 500px) {
    left: -80%;
    top: 22%;
    opacity: 0.1;
  }

  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:nth-child(1) {
    color: red;
  }

  &:nth-child(2) {
    color: orange;
  }

  &:nth-child(3) {
    color: yellow;
  }

  &:nth-child(4) {
    color: green;
  }

  &:nth-child(5) {
    color: blue;
  }

  &:nth-child(6) {
    color: indigo;
  }
`;

function Main() {
  const [loading, setLoading] = useState(false);
  const { year: getYear, country: getCountry, town: getTown } = useParams();
  const navigate = useNavigate();
  const [year, setYear] = useState('');
  const [rsOpendataDemographicsYear, setRsOpendataDemographicsYear] = useState([
    {
      value: '',
      label: '',
    },
  ]);
  const [countryData] = useState(areaData.map((area) => area.country));
  const [townData, setTownData] = useState([]);
  const [country, setCountry] = useState('');
  const [town, setTown] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState({
    year: '',
    country: '',
    town: '',
    barChartData: [],
    pieChartData: [],
  });

  const handleCountryData = (_, value) => {
    setTown('');

    setCountry(value);

    const getTownData = areaData.filter((area) => area.country === value);

    if (getTownData.length !== 0) {
      setTownData(getTownData[0].town);
    }
  };

  useEffect(() => {
    const getRsOpendataDemographicsYear = async () => {
      try {
        const data = await rsOpendataDocument();

        const yearList = data.paths['/ODRP019/{yyy}'].get.parameters[0].enum;

        const meunItemData = yearList.map((y) => ({
          value: y,
          label: y,
        }));

        setRsOpendataDemographicsYear(meunItemData);
      } catch (error) {
        console.log(error);
      }
    };

    getRsOpendataDemographicsYear();

    if (getYear) {
      setYear(getYear);
    }
    if (getCountry) {
      setCountry(getCountry);
      handleCountryData('', getCountry);
    }
    if (getTown) {
      setTown(getTown);
    }
  }, []);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleTownData = (_, value) => {
    setTown(value);
  };

  const handleBarChartData = (data) => {
    const householdOrdinaryMaleCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_ordinary_m),
      0,
    );

    const householdOrdinaryFemaleCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_ordinary_f),
      0,
    );

    const householdSingleMaleCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_single_m),
      0,
    );

    const householdSingleFemaleCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_single_f),
      0,
    );

    return [
      {
        name: '男性',
        data: [householdOrdinaryMaleCount, householdSingleMaleCount],
      },
      {
        name: '女性',
        data: [householdOrdinaryFemaleCount, householdSingleFemaleCount],
      },
    ];
  };

  const handlePieChartData = (data) => {
    const householdOrdinaryTotalCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_ordinary_total),
      0,
    );

    const householdSingleTotalCount = data.responseData.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.household_single_total),
      0,
    );

    return [
      {
        type: 'pie',
        data: [
          {
            name: '共同生活',
            y: householdOrdinaryTotalCount,
          },
          {
            name: '獨立生活',
            y: householdSingleTotalCount,
          },
        ],
      },
    ];
  };

  const handleSubmit = async (_year, _country, _town) => {
    setShowResult(false);
    setLoading(true);
    navigate(`/${_year}/${_country}/${_town}`);

    try {
      const data = await rsOpendataDemographics(_year, _country, _town);

      setLoading(false);

      if (data.responseMessage !== '查無資料') {
        setResultData({
          year: _year,
          country: _country,
          town: _town,
          barChartData: handleBarChartData(data),
          pieChartData: handlePieChartData(data),
        });

        setShowResult(true);
      } else {
        alert(data.responseMessage);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <main>
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <StyledMainContainer container spacing={1}>
        <StyledRotatedTextontainer item lg={1} xs={1}>
          <RotatedText>TAWIAN</RotatedText>
        </StyledRotatedTextontainer>

        <Grid item lg={11} xs={11}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <StyledTitleContainer item lg={12} xs={12}>
              <h1>人口數、戶數按戶別及性別統計</h1>
            </StyledTitleContainer>

            <Grid item lg={12} xs={12}>
              <StyledInputGroupContainer container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <TextField
                    select
                    label="年分"
                    value={year}
                    onChange={handleChangeYear}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    {rsOpendataDemographicsYear.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Autocomplete
                    value={country}
                    options={countryData}
                    getOptionLabel={(option) => option}
                    onChange={handleCountryData}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="縣/市"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Autocomplete
                    value={town}
                    options={townData}
                    getOptionLabel={(option) => option}
                    onChange={handleTownData}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="區"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    disabled={!country}
                  />
                </Grid>
                <Grid item lg={2} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleSubmit(year, country, town);
                    }}
                    disabled={!year || !country || !town}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </StyledInputGroupContainer>
            </Grid>

            <Grid item lg={12}>
              <StyledSearchResultWrapper>
                <StyledLine />
                <StyledChip
                  label="搜尋結果"
                  variant="outlined"
                  color="primary"
                />
                <StyledLine />
              </StyledSearchResultWrapper>
            </Grid>

            {showResult && (
              <>
                <Grid item lg={12}>
                  <h2>{`${resultData.year}年 ${resultData.country} ${resultData.town}`}</h2>
                </Grid>
                <Grid item lg={12}>
                  <h2>人口數統計</h2>
                </Grid>
                <Grid item lg={12}>
                  <BarChart series={resultData.barChartData} />
                </Grid>
                <Grid item lg={12}>
                  <PieChart series={resultData.pieChartData} />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </StyledMainContainer>
    </main>
  );
}

export default Main;

import axios from 'axios';

export const rsOpendataDocument = () => {
  const url = 'https://www.ris.gov.tw/rs-opendata/api/Main/docs/v1';

  return axios({
    method: 'GET',
    url,
  }).then(({ data }) => data);
};

export const rsOpendataDemographics = (year, country, town) => {
  const url = `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${country}&TOWN=${town}`;

  return axios({
    method: 'GET',
    url,
  }).then(({ data }) => data);
};

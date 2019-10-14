const axios = require('axios');
let formatData = require('../util/formatData');

let baseURL = 'https://content.mosalingua.com/export/statistic',
    axiosGetArr = [],
    apiURL = '',
    allresponseData = [];

//Function for getting data from API langFrom, langTo, mobileOS,
let getAPIRequest = async (combinationLangConfig) => {

  Object.values(combinationLangConfig).forEach((item) => {
    item.forEach((value, key) => {
      value[Object.keys(value)].forEach((obj) => {
        obj.toLang.forEach((langItem) => {
          apiURL = `${baseURL}/${obj.baseLang}/${langItem}/${obj.os}`;

          axiosGetArr.push(axios.get(apiURL));
        })
      })
    });
  });

  return axios.all(axiosGetArr).then(responseArr => {
    //this will be executed only when all requests are complete

    for (let i = 0; i < responseArr.length; i++) {
      allresponseData.push(responseArr[i].data)
    }

    return formatData.formatAllData(allresponseData);
  });



//*** TEST ***
/*let getAPIRequest = async (config) => {

  Object.values(config).forEach((item) => {

    item[Object.keys(item)].forEach((value, key) => {
        axiosGetArr.push(axios.get(value.url));
      });
    });

  return axios.all(axiosGetArr).then(responseArr => {
    //this will be executed only when all requests are complete

    for (let i = 0; i < responseArr.length; i++) {
      allresponseData.push(responseArr[i].data)
    }

    return formatData.formatAllData(allresponseData);
  });*/
}

module.exports = {
  getAPIRequest: getAPIRequest
}

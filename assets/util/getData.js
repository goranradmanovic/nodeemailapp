let api = require('../api/api');

let getAllData = async (obj) => {
  return api.getAPIRequest(obj).then((data) => {
    return data;
  });
};

module.exports = {
  getAllData: getAllData
}

// Required modules
var combinations = require('./assets/util/combinations'),
    getData = require('./assets/util/getData');
    sendEmail = require('./assets/util/sendEmail');

getData.getAllData(combinations).then(data => {
  //console.log('API calls and Formatting of data are finished. ', data);

  //Send the emails
  sendEmail.sendEmails(data);
});

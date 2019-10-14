let nodemailer = require('nodemailer');

let sendEmails = (messages) => {

  if (messages.length > 0) {
    //Nodemailer settup
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'noreplycardstat@gmail.com',
          pass: 'cardstat12'
      }
    });

    let mailOptions = {
      from: 'noreplycardstat@gmail.com',
      to: 'samuel@mosalingua.com, cedric@mosalingua.com, luca@mosalingua.com, goranradmanovic@gmail.com', //, samuel@mosalingua.com, cedric@mosalingua.com, luca@mosalingua.com
      subject: 'MosaContent Export differences since 24h',
      //text: 'Card statistic is attached in a file.',
      html: '<h1>MosaContent Export differences since 24h</h1><pre>' + messages + '</pre>',
      /*attachments: [
        {filename: 'cardsStats.txt', path: './assets/stats/cardsStats.txt', cid: 'uniq-cardsStats.txt'}
      ]*/
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  } else {
    console.log('No messages for sending');
    return false;
  }
}

module.exports = {
  sendEmails: sendEmails
}

let allMessages = null,
    sortedMessages = null,
    emailMessages = null,
    lastDataExportDate = null,
    yesterday = null,
    oneDayInMiliseconds = 90000000; //90000000 = 86400000 + 3600000
    dataInTwentyFourHourArr = [],
    filterByHoursArr = [];
    filterByLastExportArr = [],
    filterByCardsNumberDiffArr = [],
    allFilteredData = null;

let formatAllData = (allData) => {

  for (let i = 0; i < allData.length; i++) {
    console.log(allData[i])
    if (allData[i].items.length > 0 && allData[i].items.length > 1) {

        /*console.log('first date ', formatedDate(allData[i].items[0].date))
        console.log('second date ', formatedDate(allData[i].items[1].date))
        console.log('**************************************************')*/

      if (formatedDate(allData[i].items[0].date) == formatedDate() && is24hDiff(dateInMiliseconds(allData[i].items[0].date), dateInMiliseconds(allData[i].items[1].date))) {

        lastDataExportDate = allData[i].items[0].date;
        yesterday = dateInMiliseconds(allData[i].items[0].date) - oneDayInMiliseconds;

        let tempArr = filterByHours(lastDataExportDate, yesterday, allData[i].items);

        filterByHoursArr.push(tempArr[0], tempArr[tempArr.length - 1]);

      } else if (formatedDate(allData[i].items[0].date) == formatedDate() && formatedDate(allData[i].items[1].date) != formatedDate()) {

        filterByLastExportArr = filterByLastExport(allData[i].items);
      }
    }
  }

  //Concat all filtered data into one single array
  allFilteredData = filterByHoursArr.concat(filterByLastExportArr);

  filterByCardsNumberDiffArr = filterByCardsNumberDifferences(allFilteredData);

  allMessages = createMassage(filterByCardsNumberDiffArr);

  sortedMessages = sortByBiggerCardsDiff(allMessages);

  emailMessages = messagesForEmail(sortedMessages);

  return emailMessages;
}

let filterByHours = (endDateTime, startDateTime, data) => {

  let time = null,
      endDate = new Date(endDateTime).getTime(), //Last exported date/time from data (allData[i].items[0].date) first el. of items array
      startDate = new Date(yesterday).getTime(), //24h before last export
      filteredData = data.filter(item => { time = new Date(item.date).getTime(); return (startDate <= time && time <= endDate); });

      return filteredData;
}

let filterByLastExport = (data) => {
  return data.slice(0, 2);
}

let is24hDiff = (lastDateExport, prevDateExport) => {
  return ((prevDateExport + oneDayInMiliseconds) > lastDateExport) ? true : false;
}

let filterByCardsNumberDifferences = (data) => {

  let filteredData = [],
      groupedData = null;

  groupedData = groupBy(data, 'name');

  for (let i = 0; i < groupedData.length; i++) {

    if (groupedData[i][0].numberCards != groupedData[i][1].numberCards) {
      filteredData.push(groupedData[i][0], groupedData[i][1]);
    }
  }

  return filteredData;
}

let groupBy = (data, group) => {
    let hash = Object.create(null),
        result = [];

    data.forEach((item) => {
        if (!hash[item[group]]) {
            hash[item[group]] = [];
            result.push(hash[item[group]]);
        }

        hash[item[group]].push(item);
    });

    return result;
}

let createMassage = (data) => {
  let messages = [],
      tempObj = {},
      groupedData = null,
      cardDiff,
      categoriesDiff;

  groupedData = groupBy(data, 'name');

  for (let i = 0; i < groupedData.length; i++) {

    cardDiff = groupedData[i][0].numberCards - groupedData[i][1].numberCards;
    categoriesDiff = (groupedData[i][0].numberCategories == groupedData[i][1].numberCategories) ? `No change in categories (${groupedData[i][0].numberCategories})` : `${groupedData[i][0].numberCategories - groupedData[i][1].numberCategories} categories`,
    //Formating of the output string
    message =`
Name: ${groupedData[i][0].name} | Date: ${groupedData[i][0].date} | Cards: ${groupedData[i][0].numberCards} | Categories: ${groupedData[i][0].numberCategories}
Name: ${groupedData[i][1].name} | Date: ${groupedData[i][1].date} | Cards: ${groupedData[i][1].numberCards} | Categories: ${groupedData[i][1].numberCategories}
Cards Difference: *** ${cardDiff} cards ***
Categories Difference: *** ${categoriesDiff} *** \n`;

    tempObj.cardDiff = cardDiff;
    tempObj.message = message;

    messages.push(tempObj);

    tempObj = {};
  }

  return messages;
}

let sortByBiggerCardsDiff = (data) => {
  //Sort by higher cardDiff number
  let sortedMsg = data.sort((a, b) => (a.cardDiff < b.cardDiff) ? 1 : ((b.cardDiff < a.cardDiff) ? -1 : 0));

  return sortedMsg;
}

let messagesForEmail = (data) => {
  let messages = [];

  data.forEach(item => {
    messages.push(item.message);
  });

  return messages;
}

let dateInMiliseconds = (date) => {
  return new Date(date).getTime();
}

let formatedDate = (date = null) => {
  let currDate = (date) ? new Date(date) : new Date();

  return `${currDate.getDate()}.${currDate.getMonth() + 1}.${currDate.getFullYear()}`;
}


module.exports = {
  formatAllData: formatAllData
}

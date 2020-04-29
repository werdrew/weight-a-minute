const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const _monthAsStr = idx => {
  try {
    return months[idx];
  }
  catch (error) {
    console.log(`Error getting month: ${error}`);
    return false;
  }
};

const _year = yr => {
  return 1900 + yr;
};

const _suffix = day => {
  if ([1, 21, 31].includes(day)) return 'st';
  if ([2, 22].includes(day)) return 'nd';
  if ([3, 23].includes(day)) return 'rd';
  else return 'th';
};

const _numDays = (month, year) => {
  const leapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  if (month === 'February' && !leapYear) return 28;
  if (month === 'February' && leapYear) return 29;
  if (month in ['April', 'June', 'September', 'November']) return 30;
  else return 31;
};

const getDay = date => {
  return date.getDate();
};

const getMonth = date => {
  return date.getMonth() + 1;
};

const getMonthAsStr = monthNum => {
  return  _monthAsStr(monthNum);
};

const getMonthAsNum = monthStr => {
  return months.indexOf(monthStr) + 1
};

const getYear = date => {
  return _year(date.getYear());
};

const formatAsString = date => {
  const day = date.getDate();
  const month = _monthAsStr(date.getMonth());
  const year = _year(date.getYear());
  return `${month} ${day}${_suffix(day)}, ${year}`;
};

const getDaysForDate = date => {
  const month = _monthAsStr(date.getMonth());
  const numDays = _numDays(month, _year(date.getYear()));
  return [...Array(numDays).keys()].map(day => { return day += 1 });
};

const getMonths = () => {
  return months;
};

const getYearsToDate = (date, { startingFrom = 1900 }) => {
  const currentYear = _year(date.getYear());
  const numElements = currentYear - startingFrom + 1;
  const yearArr = [...Array(numElements).keys()];
  return yearArr.map(year => { return year += startingFrom });
};

const getDaysAgo = (today, { n = 1 }) => {
  const dateCopy = new Date(today);
  dateCopy.setDate(today.getDate() - n);
  return dateCopy;
};

const getWeeksAgo = (today, { n = 1 }) => {
  const dateCopy = new Date(today);
  dateCopy.setDate(today.getDate() - (n * 7));
  return dateCopy;
};

const getYearsAgo = (today, { n = 1 }) => {
  const dateCopy = new Date(today);
  dateCopy.setDate(today.getDate() - (n * 365));
  return dateCopy;
};

const ymdToDate = (year, month, day) => {
  return new Date(year, month - 1, day);
};

export {
  getDay, getMonth, getMonthAsStr, getMonthAsNum, getYear,
  formatAsString, getDaysForDate, getMonths, getYearsToDate,
  getDaysAgo, getWeeksAgo, getYearsAgo, ymdToDate
};
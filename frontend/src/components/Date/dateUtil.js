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

export default {
  getDay: date => {
    return date.getDate();
  },
  getMonth: date => {
    return date.getMonth() + 1;
  },
  getMonthAsStr: monthNum => {
    return _monthAsStr(monthNum);
  },
  getMonthAsNum: monthStr => {
    return months.indexOf(monthStr) + 1
  },
  getYear: date => {
    return _year(date.getYear());
  },
  formatAsString: date => {
    const day = date.getDate();
    const month = _monthAsStr(date.getMonth());
    const year = _year(date.getYear());
    return `${month} ${day}${_suffix(day)}, ${year}`;
  },
  getDaysForDate: date => {
    const month = _monthAsStr(date.getMonth());
    const numDays = _numDays(month, _year(date.getYear()));
    return [...Array(numDays).keys()].map(day => { return day += 1 });
  },
  getMonths: () => {
    return months;
  },
  getYearsToDate: (date, { startingFrom = 1900 }) => {
    const currentYear = _year(date.getYear());
    const numElements = currentYear - startingFrom + 1;
    const yearArr = [...Array(numElements).keys()];
    return yearArr.map(year => { return year += startingFrom });
  }
};
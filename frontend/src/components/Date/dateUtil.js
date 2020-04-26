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
  getMonthAsStr: date => {
    return _monthAsStr(date.getMonth());
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
  days: date => {
    const month = _monthAsStr(date.getMonth());
    const numDays = _numDays(month, _year(date.getYear()));
    const days = [...Array(numDays).keys()];
    return days.map(day => { return day += 1 });
  },
  months: () => {
    return months;
  },
  years: (date) => {
    const years = [...Array(date.getYear()).keys()].map(year => year++);
    return years.map(year => year += 1900);
  }
};
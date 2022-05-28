const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadLine = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year}  ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();

const getRemainingTime = () => {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 42 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  let remainingDays = Math.floor(t / oneDay);
  let remainingHours = Math.floor((t % oneDay) / oneHour);
  let remainingMinutes = Math.floor((t % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((t % oneMinute) / oneSecond);

  const values = [
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  ];

  const format = (item) => {
    if (item < 10) return `0${item}`;
    return item;
  };

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadLine.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
};

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();

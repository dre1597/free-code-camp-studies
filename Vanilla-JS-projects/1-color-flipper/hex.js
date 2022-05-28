const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const btn = document.getElementById('btn');
const spanColor = document.querySelector('.color');

btn.addEventListener('click', () => {
  const hexValue = randomHex();
  document.body.style.backgroundColor = hexValue;
  spanColor.textContent = hexValue;
});

const randomHex = () => {
  let hexValue = '#';

  for (let i = 0; i < 6; i++) {
    let unit = hex[randomUnit()];
    hexValue += unit;
  }

  return hexValue;
};

const randomUnit = () => {
  return Math.floor(Math.random() * hex.length);
};

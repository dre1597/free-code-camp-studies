const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025'];

const btn = document.getElementById('btn');
const spanColor = document.querySelector('.color');

btn.addEventListener('click', () => {
  document.body.style.backgroundColor = colors[randomNumber()];
  spanColor.textContent = colors[randomNumber()];
});

const randomNumber = () => {
  return Math.floor(Math.random() * colors.length);
};

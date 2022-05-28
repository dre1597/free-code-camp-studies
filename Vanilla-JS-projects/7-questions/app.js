// traversing the dom

// const btns = document.querySelectorAll('.question-btn')

// btns.forEach( (btn) => {
//     btn.addEventListener('click', (event) => {
//         const question = event.currentTarget.parentElement.parentElement
//         question.classList.toggle('show-text')
//     })

// })

// using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', () => {
    questions.forEach(function (item) {
      //for close the others texts
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});

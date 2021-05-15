var questions = document.querySelectorAll('.accordion-item');

questions.forEach((question) => {
    question.addEventListener("click", (e) => {
        question.classList.toggle("open");
    });
});
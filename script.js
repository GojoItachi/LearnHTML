/* =========== Пояснения:
   - typingTexts  — массив фраз, которые печатаются в заголовке
   - typing effect — простой эффект печати (type + delete)
   - scroll reveal — добавляет класс .revealed карточкам, когда они в зоне видимости
*/

// --- ТИПЕР (печатающий текст в хедере) ---
const typingTexts = ["веб-разработчик.", "быстрый ученик.", "будущий предприниматель."]; // фразы
const typeEl = document.getElementById('type');

let tIndex = 0; // индекс фразы
let charIndex = 0; // индекс символа
let deleting = false;

function typeLoop() {
  const current = typingTexts[tIndex];
  if (!deleting) {
    // печатаем по символу
    typeEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      // когда фраза допечатана — пауза и начинаем удалять
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
    setTimeout(typeLoop, 80); // скорость печати
  } else {
    // удаляем по символу
    typeEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      tIndex = (tIndex + 1) % typingTexts.length; // следующая фраза
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 40); // скорость удаления
  }
}
typeLoop(); // старт

// --- SCROLL REVEAL (появление карточек при скролле) ---
const revealEls = document.querySelectorAll('[data-reveal]');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85; // высота, когда считать "в поле зрения"
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('revealed'); // добавляем стиль для анимации
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
// запуск один раз при загрузке, чтобы элементы вверху тоже показались
revealOnScroll();

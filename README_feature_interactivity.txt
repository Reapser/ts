Опис інтерактивності (файл README_feature_interactivity.txt):
- Modal windows: кнопки з attribute data-open-modal="<selector>" відкривають модальні вікна, всередині є кнопки з data-close-modal для закриття.
- Event listeners:
  * scroll -> додає клас 'scrolled' до header коли прокручено більше 50px
  * scroll -> reveal-on-scroll елементи поступово з'являються при прокрутці
  * click -> кнопки .open-post відкривають модальне вікно з деталями поста
- Fetch: виконується запит до https://jsonplaceholder.typicode.com/posts?_limit=5 і виводить перші 5 постів у контейнер #posts. При натисканні 'Details' підвантажуються повні дані поста і показуються у модалі.
- TypeScript: весь JS-код має відповідний файл src/ts/main.ts з простими примітивними типами (string, number, boolean, Post type). Для демонстрації також є згенерований JS-файл assets/js/main.js.
- Анімації: прості CSS-перехідні ефекти для модального вікна та reveal-on-scroll (opacity + translateY).

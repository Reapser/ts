Опис інтерактивності (файл README_feature_interactivity.txt):
- Modal windows: кнопки з attribute data-open-modal="<selector>" відкривають модальні вікна, всередині є кнопки з data-close-modal для закриття.
- Event listeners:
  * scroll -> додає клас 'scrolled' до header коли прокручено більше 50px
  * scroll -> reveal-on-scroll елементи поступово з'являються при прокрутці
  * click -> кнопки .open-post відкривають модальне вікно з деталями поста
- Fetch: виконується запит до https://jsonplaceholder.typicode.com/posts?_limit=5 і виводить перші 5 постів у контейнер #posts. При натисканні 'Details' підвантажуються повні дані поста і показуються у модалі.
- TypeScript: весь JS-код має відповідний файл src/ts/main.ts з простими примітивними типами (string, number, boolean, Post type). Для демонстрації також є згенерований JS-файл assets/js/main.js.
- Анімації: прості CSS-перехідні ефекти для модального вікна та reveal-on-scroll (opacity + translateY).

Додаткові інтерактивності, додані в `src/ts/templatemo-prism-scripts.ts`:
- Carousel: автоматичне та ручне перелистування (кнопки next/prev, indicators, keyboard arrows), тривимірні трансформації для перспективи.
- Particles: анімаційні частинки в секції про філософію (випадкові зсуви, затримки і тривалості анімацій).
- Skills grid: фільтрація навичок через вкладки (category tabs) та анімовані hex items.
- Parallax effect: плавний вертикальний зсув секції `hero` при прокрутці.
- IntersectionObserver: анімація лічильників у секції `stats` при появі у вьюпорті.
- Contact form: локальна обробка сабміту з показом alert та скиданням форми (без відправки на сервер).
- Menu toggle: мобільне меню відкривається/закривається при натисканні, навігація плавно скролить до секцій та підсвічує активний пункт навігації.

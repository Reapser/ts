Інструкція (коротко):
1) Створіть гілку локально та на віддаленому репозиторії:
   git checkout -b feature/tsconfig
   git add .
   git commit -m "Add template, ts source and compiled js, tsconfig"
   git push -u origin feature/tsconfig
2) На GitHub: в Settings → Pages оберіть гілку feature/tsconfig і директорію / (або /docs якщо ви її використаєте) та збережіть.
   Після розгортання сторінка буде доступна за схожим URL: https://<USERNAME>.github.io/<REPO>/
3) Якщо хочете автоматизувати: скористайтесь gh cli: gh pages create --branch feature/tsconfig --path /

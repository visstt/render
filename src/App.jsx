import { useEffect, useLayoutEffect } from "react";
import "./App.css";

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ: App
// ============================================
function App() {
  console.log(
    "\n%c[ЭТАП 5] RENDER - Вызов компонента App()",
    "color: #0066cc; font-weight: bold; font-size: 14px"
  );
  console.log("   React вызывает функцию App");
  console.log("   Компонент создаёт JSX разметку");
  console.log("   React строит виртуальный DOM");

  useLayoutEffect(() => {
    console.log(
      "\n%c[ЭТАП 6] LAYOUT EFFECT - Синхронные эффекты",
      "color: #9933cc; font-weight: bold; font-size: 14px"
    );
    console.log("   Выполняется ДО отрисовки браузером");
    console.log("   Блокирует отрисовку (синхронно)");
    console.log("   Используется для измерений DOM");
  });

  useEffect(() => {
    console.log(
      "\n%c[ЭТАП 7] EFFECT - Асинхронные эффекты",
      "color: #cc6600; font-weight: bold; font-size: 14px"
    );
    console.log("   Выполняется ПОСЛЕ отрисовки браузером");
    console.log("   Не блокирует отрисовку (асинхронно)");
    console.log("   Используется для запросов к API, подписок");

    console.log(
      "\n%c[ЭТАП 8] ЗАВЕРШЕНО - Рендеринг завершён!",
      "color: #009900; font-weight: bold; font-size: 16px"
    );
    console.log("   Браузер отрисовал страницу");
    console.log("   Пользователь видит приложение");
    console.log("   React готов к взаимодействию");
  });

  return (
    <div className="app">
      <h1>Как браузер рендерит React приложение</h1>

      <div className="info">
        <h2>Этапы рендеринга:</h2>
        <ol>
          <li>Загрузка JavaScript модулей</li>
          <li>Поиск корневого DOM элемента (root)</li>
          <li>Создание React Root</li>
          <li>Запуск рендеринга</li>
          <li>Вызов функции компонента (render)</li>
          <li>useLayoutEffect (до отрисовки браузером)</li>
          <li>useEffect (после отрисовки браузером)</li>
          <li>Готово!</li>
        </ol>
      </div>
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ============================================
// ЭТАП 1: ЗАГРУЗКА JAVASCRIPT МОДУЛЕЙ
// ============================================
console.log(
  "%c[ЭТАП 1] ЗАГРУЗКА - JavaScript модули загружены",
  "color: #009900; font-weight: bold; font-size: 14px"
);
console.log("   React библиотека загружена");
console.log("   ReactDOM загружен");
console.log("   Компонент App импортирован");

// ============================================
// ЭТАП 2: ПОИСК КОРНЕВОГО DOM ЭЛЕМЕНТА
// ============================================
console.log(
  "\n%c[ЭТАП 2] ПОИСК DOM - Ищем корневой элемент",
  "color: #0099cc; font-weight: bold; font-size: 14px"
);
const rootElement = document.getElementById("root");
console.log('   Найден элемент <div id="root">');
console.log("   Тип элемента:", rootElement.tagName);

// ============================================
// ЭТАП 3: СОЗДАНИЕ REACT ROOT
// ============================================
console.log(
  "\n%c[ЭТАП 3] REACT ROOT - Создание корня приложения",
  "color: #cc0099; font-weight: bold; font-size: 14px"
);
const root = createRoot(rootElement);
console.log("   React Root создан");
console.log("   React готов управлять этим элементом");

// ============================================
// ЭТАП 4: ЗАПУСК РЕНДЕРИНГА
// ============================================
console.log(
  "\n%c[ЭТАП 4] ЗАПУСК - Начинаем рендеринг",
  "color: #cc6600; font-weight: bold; font-size: 14px"
);
console.log("   Вызываем root.render()");
console.log("   React начнёт обработку компонента App");

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

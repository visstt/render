import { useEffect, useLayoutEffect, useState, useMemo, memo } from "react";
import "./App.css";
import CacheDemo from "./CacheDemo";

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ: App
// ============================================
function App() {
  return (
    <div className="app">
      <h1>Как браузер рендерит React приложение</h1>

      <CacheDemo />
    </div>
  );
}

export default App;

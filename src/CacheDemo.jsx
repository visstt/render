import { useState, useMemo, memo } from "react";
import "./CacheDemo.css";

// ============================================
// КОМПОНЕНТ БЕЗ КЭШИРОВАНИЯ
// ============================================
function WithoutCacheChild({ count }) {
  console.log(
    "%c[БЕЗ КЭША] Child рендерится",
    "color: #ff0000; font-weight: bold"
  );
  return (
    <div className="demo-child">
      <p>Компонент БЕЗ memo()</p>
      <p>Счетчик родителя: {count}</p>
    </div>
  );
}

// ============================================
// КОМПОНЕНТ С КЭШИРОВАНИЕМ
// ============================================
const WithCacheChild = memo(function WithCacheChild({ count }) {
  console.log(
    "%c[С КЭШЕМ] Child рендерится",
    "color: #00aa00; font-weight: bold"
  );
  return (
    <div className="demo-child">
      <p>Компонент С memo()</p>
      <p>Счетчик родителя: {count}</p>
    </div>
  );
});

// ============================================
// ТЯЖЕЛОЕ ВЫЧИСЛЕНИЕ
// ============================================
function expensiveCalculation(num) {
  console.log("%c   Выполняется тяжелое вычисление...", "color: #ff6600");
  let _result = 0;
  for (let i = 0; i < 100000000; i++) {
    _result += i;
  }
  return num * 2;
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ ДЕМО
// ============================================
function CacheDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [number, setNumber] = useState(5);

  console.log(
    "\n%c=== РЕНДЕР CacheDemo ===",
    "color: #0066cc; font-weight: bold; font-size: 16px"
  );

  // БЕЗ useMemo - вычисляется при каждом рендере
  console.log("%c[БЕЗ useMemo]", "color: #ff0000; font-weight: bold");
  const withoutMemo = expensiveCalculation(number);
  console.log(`   Результат БЕЗ кэша: ${withoutMemo}`);

  // С useMemo - вычисляется только при изменении number
  console.log("%c[С useMemo]", "color: #00aa00; font-weight: bold");
  const withMemo = useMemo(() => {
    console.log(
      "%c   Выполняется тяжелое вычисление (мемоизированное)...",
      "color: #00aa00"
    );
    let _result = 0;
    for (let i = 0; i < 100000000; i++) {
      _result += i;
    }
    return number * 2;
  }, [number]);
  console.log(`   Результат С кэшем: ${withMemo}`);

  return (
    <div className="cache-demo">
      <h2>Демонстрация кэширования</h2>

      <div className="demo-section">
        <h3>1. React.memo() - Кэширование компонентов</h3>

        <div className="explanation-box">
          <h4>🔵 КНОПКА "Счетчик родителя"</h4>
          <p>
            <strong>Что делает:</strong> Изменяет состояние родителя
            (parentCount), но НЕ изменяет данные детей (childCount)
          </p>
          <p>
            <strong>Что происходит:</strong>
          </p>
          <ul>
            <li>✅ Родитель перерисовывается (это нормально)</li>
            <li>❌ КРАСНЫЙ компонент перерисовывается ЗРЯ (тратит ресурсы)</li>
            <li>✅ ЗЕЛЕНЫЙ компонент НЕ перерисовывается (экономит ресурсы)</li>
          </ul>
          <p>
            <strong>В консоли:</strong> Увидите красное сообщение "[БЕЗ КЭША]
            Child рендерится", но НЕ увидите зеленое
          </p>
        </div>

        <div className="explanation-box">
          <h4>🟢 КНОПКА "Изменить props детей"</h4>
          <p>
            <strong>Что делает:</strong> Изменяет данные, которые получают оба
            компонента-ребенка
          </p>  
          <p>
            <strong>Что происходит:</strong>
          </p>
          <ul>
            <li>
              ✅ ОБА компонента перерисовываются (это правильно, данные
              изменились)
            </li>
            <li>✅ Число в обоих блоках обновляется</li>
          </ul>
          <p>
            <strong>В консоли:</strong> Увидите ОБА сообщения - и красное, и
            зеленое
          </p>
        </div>

        <div className="controls">
          <button onClick={() => setParentCount(parentCount + 1)}>
            Счетчик родителя: {parentCount}
          </button>
          <button onClick={() => setChildCount(childCount + 1)}>
            Изменить props детей: {childCount}
          </button>
        </div>

        <div className="demo-grid">
          <div className="demo-box without-cache">
            <h4>БЕЗ кэширования</h4>
            <WithoutCacheChild count={childCount} />
          </div>

          <div className="demo-box with-cache">
            <h4>С кэшированием (memo)</h4>
            <WithCacheChild count={childCount} />
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>2. useMemo() - Кэширование вычислений</h3>

        <div className="explanation-box">
          <h4>🔵 КНОПКА "Счетчик родителя"</h4>
          <p>
            <strong>Что делает:</strong> Вызывает перерисовку, но число для
            вычислений НЕ меняется
          </p>
          <p>
            <strong>Что происходит:</strong>
          </p>
          <ul>
            <li>
              ❌ КРАСНЫЙ блок: Выполняет тяжелое вычисление ЗАНОВО (медленно,
              ~100мс)
            </li>
            <li>✅ ЗЕЛЕНЫЙ блок: Берет результат из ПАМЯТИ (мгновенно, 0мс)</li>
            <li>📊 Результаты одинаковые, но скорость разная!</li>
          </ul>
          <p>
            <strong>В консоли:</strong> Увидите оранжевое "Выполняется тяжелое
            вычисление", но НЕ увидите зеленое
          </p>
        </div>

        <div className="explanation-box">
          <h4>🟢 КНОПКА "Изменить число"</h4>
          <p>
            <strong>Что делает:</strong> Изменяет число, которое используется в
            вычислениях
          </p>
          <p>
            <strong>Что происходит:</strong>
          </p>
          <ul>
            <li>
              ✅ ОБА блока выполняют вычисление (это правильно, число
              изменилось)
            </li>
            <li>✅ Результаты обновляются (число × 2)</li>
          </ul>
          <p>
            <strong>В консоли:</strong> Увидите ОБА сообщения о вычислениях - и
            оранжевое, и зеленое
          </p>
        </div>

        <div className="controls">
          <button onClick={() => setParentCount(parentCount + 1)}>
            Счетчик родителя: {parentCount}
          </button>
          <button onClick={() => setNumber(number + 1)}>
            Изменить число: {number}
          </button>
        </div>

        <div className="demo-grid">
          <div className="demo-box without-cache">
            <h4>БЕЗ useMemo()</h4>
            <p>Результат: {withoutMemo}</p>
            <p className="warning">Вычисляется при каждом рендере</p>
          </div>

          <div className="demo-box with-cache">
            <h4>С useMemo()</h4>
            <p>Результат: {withMemo}</p>
            <p className="success">Вычисляется только при изменении числа</p>
          </div>
        </div>
      </div>

      <div className="console-hint">
        Откройте консоль (F12) чтобы увидеть подробные логи!
      </div>
    </div>
  );
}

export default CacheDemo;

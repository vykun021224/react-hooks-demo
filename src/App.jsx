import { useState, useEffect, useRef } from 'react';

// Custom hook: lưu vào localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useLocalStorage('name', 'Vy');
  const timerRef = useRef(null);

  useEffect(() => {
    document.title = `Count: ${count}`; // đổi title mỗi lần count thay đổi
  }, [count]);

  const start = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setCount(c => c + 1), 500);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>React Hooks Demo</h1>

      <p>Xin chào, <b>{name}</b></p>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nhập tên…"
      />

      <p style={{ marginTop: 10 }}>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>Reset</button>

      <div style={{ marginTop: 12 }}>
        <button onClick={start}>Start</button>
        <button onClick={stop} style={{ marginLeft: 8 }}>Stop</button>
      </div>
    </div>
  );
}

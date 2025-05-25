import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}


import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

import { useEffect, useState } from 'react';

function usePolling(url, interval = 3000) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      const res = await fetch(url);
      const json = await res.json();
      if (isActive) setData(json);
    };


    fetchData();
    const id = setInterval(fetchData, interval);
    return () => {
      isActive = false;
      clearInterval(id);
    };
  }, [url, interval]);

  return data;
}

import { useState } from 'react';

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (validate) setErrors(validate({ ...values, [name]: value }));
  };

  return {
    values,
    errors,
    handleChange
  };
}

import { useState } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  const setStoredValue = val => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStoredValue];
}

import { useEffect, useState } from 'react';

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

import { useEffect, useRef, useState } from 'react';

function useOnScreen(options) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, visible];
}

import { useEffect, useState } from 'react';

function useDarkMode() {
  const [enabled, setEnabled] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const className = 'dark-mode';
    document.body.classList.toggle(className, enabled);
  }, [enabled]);

  return [enabled, setEnabled];
}

import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      });

    return () => controller.abort();
  }, [url]);

  return { data, error };
}

function DynamicForm({ schema, onSubmit }) {
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      {schema.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input name={field.name} type={field.type} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./MyHeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

function withLogger(WrappedComponent) {
  return function(props) {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);
      return () => console.log(`${WrappedComponent.name} unmounted`);
    }, []);
    return <WrappedComponent {...props} />;
  };
}

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  useEffect(() => {
    function onEscape(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, handler]);
}

const Button = React.memo(({ onClick, label }) => {
  console.log('Rendering:', label);
  return <button onClick={onClick}>{label}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(c => c + 1), []);

  return (
    <div>
      <p>{count}</p>
      <Button onClick={increment} label="Increment" />
    </div>
  );
}

import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext);
}

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={e => setPosition({ x: e.clientX, y: e.clientY })}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <h1>Mouse at {x}, {y}</h1>} />

import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

function ToggleList() {
  const [visible, setVisible] = useState(true);

  const transitions = useTransition(visible, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' }
  });

  return (
    <div>
      <button onClick={() => setVisible(v => !v)}>Toggle</button>
      {transitions((style, item) =>
        item ? <animated.div style={style}>Hello World</animated.div> : null
      )}
    </div>
  );
}


import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>Hello, {name}!</p>
    </form>
  );
}

import { useState } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, task]);
    setTask("");
  };

  return (
    <div>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t, i) => (
          <li key={i} onClick={() => setTodos(todos.filter((_, j) => j !== i))}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

import { useState } from "react";

function DarkMode() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{ background: dark ? "#222" : "#fff", color: dark ? "#fff" : "#000", padding: "2rem" }}>
      <button onClick={() => setDark(!dark)}>Toggle Dark Mode</button>
    </div>
  );
}

import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <h2>Time: {seconds}s</h2>;
}

import { useState } from "react";

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h3 onClick={() => setOpen(!open)}>{title}</h3>
      {open && <div>{children}</div>}
    </div>
  );
}

import { useState } from "react";

function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div style={{ background: "#0008", padding: "2rem", color: "#fff" }}>
          <p>This is a modal!</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

function MouseTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return <p>Mouse: {pos.x}, {pos.y}</p>;
}

import { useState } from "react";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "" });

  return (
    <div>
      {step === 1 && (
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      {step === 2 && (
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      )}
      <button onClick={() => setStep(step === 2 ? 1 : 2)}>
        {step === 2 ? "Back" : "Next"}
      </button>
      {step === 2 && <pre>{JSON.stringify(form, null, 2)}</pre>}
    </div>
  );
}

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}


import { useEffect, useState } from "react";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debounced) {
      fetch(`https://api.tvmaze.com/search/shows?q=${debounced}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [debounced]);

    return (
    <div>
      <input
        placeholder="Search TV Shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((r) => (
          <li key={r.show.id}>{r.show.name}</li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

function InfiniteScrollList() {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [page, setPage] = useState(1);
  const loader = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );


     if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {items.map((_, i) => (
        <div key={i} style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
          Item #{i + 1}
        </div>
      ))}
      <div ref={loader}>Loading more...</div>
    </div>
  );
}

import { useState } from "react";

function FakeLogin() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const login = () => {
    if (email === "test@example.com" && pw === "1234") {
      const fakeToken = "abc123";
      setToken(fakeToken);
      localStorage.setItem("token", fakeToken);
    } else {
      alert("Invalid credentials");
    }
  };


  function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const log = debounce((msg) => console.log(msg), 1000);
log("hello");
log("world"); // Only "world" logs after 1s


function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);

  const clone = {};
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}

const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
console.log(b); // { x: 1, y: { z: 2 } }

function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n]) return cache[n];
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

const fib = memoize((n) =>
  n < 2 ? n : fib(n - 1) + fib(n - 2)
);

console.log(fib(30)); // Fast thanks to memoization

function sum(a) {
  const inner = (b) => sum(a + b);
  inner.valueOf = () => a;
  return inner;
}

console.log(+sum(1)(2)(3)); // 6

function throttle(fn, interval) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}

// Usage
const log = throttle(() => console.log("Throttled!"), 2000);
log(); log(); // Only one will run

function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
}

const data = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];

console.log(groupBy(data, 'type'));

Array.prototype.myFilter = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter((n) => n % 2 === 0)); // [2, 4]


function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          results[i] = val;
          completed++;
          if (completed === promises.length) resolve(results);
        },
        reject
      );
    });
  });
}

// Usage
promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);

class LRUCache {
  constructor(limit = 5) {
    this.cache = new Map();
    this.limit = limit;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(ke    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.limit) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, value);
  }
}

// Usage
const cache = new LRUCache(2);
cache.put('a', 1);
cache.put('b', 2);
console.log(cache.get('a')); // 1
cache.put('c', 3);
console.log(cache.get('b')); // -1 (evicted)


import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

import { createContext, useReducer, useContext } from 'react';

const StateContext = createContext();
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);


import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}

import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const FancyInput = forwardRef((_, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  return <input ref={inputRef} />;
});
<<<<<<< HEAD

import { useState } from 'react';

export default function DynamicForm() {
  const [fields, setFields] = useState(['']);

  const handleChange = (i, value) => {
    const newFields = [...fields];
    newFields[i] = value;
    setFields(newFields);
  };

=======

export default function App() {
  const ref = useRef();
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
    </>
  );
}
>>>>>>> a820255c76f9d9ca4723baee5b2beb9218169ad3


  return (
    <>
      {fields.map((field, i) => (
        <input key={i} value={field} onChange={e => handleChange(i, e.target.value)} />
      ))}
      <button onClick={() => setFields([...fields, ''])}>Add Field</button>
    </>
  );
}


import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}


import { useMemo, useState } from 'react';

export default function ExpensiveComponent() {
  const [count, setCount] = useState(0);

  const expensiveCalc = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total;
  }, []);

  return (
    <>
      <p>Expensive value: {expensiveCalc}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
    </>
  );
}

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DraggableItem({ name }) {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { name }
  }));
  return <div ref={drag}>{name}</div>;
}

function DropZone({ onDrop }) {
  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item.name)
  }));
  return <div ref={drop} style={{ border: '1px solid black', padding: '20px' }}>Drop Here</div>;
}

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableItem name="Box A" />
      <DropZone onDrop={(name) => alert(`Dropped: ${name}`)} />
    </DndProvider>
  );
}

useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadMorePosts(); // pagination logic
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
<<<<<<< HEAD


const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
=======


const filtered = posts.filter(post =>
  post.title.toLowerCase().includes(search.toLowerCase())
);
>>>>>>> ad203a93f447c8a615fc94ed65f68bfdd1f4dce2


import { useParams } from 'react-router-dom';
const { id } = useParams();
const post = posts.find(p => p.id === parseInt(id))


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return [...state, action.payload];
    case 'DELETE': return state.filter(p => p.id !== action.payload);
    default: return state;
  }
};
const [posts, dispatch] = useReducer(reducer, []);



const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full" />
  </div>
);


import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
  >
    {children}
  </button>
);
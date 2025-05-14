import React, { useState, useEffect } from 'react';

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
          .then(res => res.json())
          .then(data => setResults(data.items || []));
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} placeholder="Search GitHub users..." />
      <ul>
        {results.map(user => <li key={user.id}>{user.login}</li>)}
      </ul>
    </div>
  );
  \


  import React, { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([{ value: '' }]);

  const addField = () => setFields([...fields, { value: '' }]);
  const updateField = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  return (
    <div>
      {fields.map((field, i) => (
        <input
          key={i}
          value={field.value}
          onChange={(e) => updateField(i, e.target.value)}
        />
      ))}
      <button onClick={addField}>Add Field</button>
    </div>
  );
}

}
import React, { useReducer } from 'react';

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}


import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark(!dark);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggler() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle}>
      Switch to {dark ? 'Light' : 'Dark'} Mode
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggler />
    </ThemeProvider>
  );
}


import React, { useState, useEffect } from 'react';

function PaginatedList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
      .then(res => res.json())
      .then(setData);
  }, [page]);

  return (
    <div>
      <ul>
        {data.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}



import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, { text: input, done: false }]);
    setInput('');
  };

  const toggle = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };


   const filtered = todos.filter(todo => filter === 'all' || (filter === 'done' ? todo.done : !todo.done));

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="notdone">Not Done</option>
      </select>
      <ul>
        {filtered.map((todo, i) => (
          <li key={i} onClick={() => toggle(i)} style={{ textDecoration: todo.done ? 'line-through' : '' }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
7. Optimized Expensive Calculation with useMemo
jsx
Copy
Edit
import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [num, setNum] = useState(0);
  const [inc, setInc] = useState(0);

  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
    return fact(num);
  }, [num]);

  return (
    <div>
      <input type="number" value={num} onChange={e => setNum(+e.target.value)} />
      <div>Factorial: {factorial}</div>
      <button onClick={() => setInc(inc + 1)}>Re-render</button>
    </div>
  );
}


import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef();

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="modal">
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && <Modal onClose={() => setOpen(false)}>Hello from Modal</Modal>}
    </div>
  );
}


function FileUploader() {
  const [progress, setProgress] = useState(0);

  const upload = (file) => {
    const data = new FormData();
    data.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");
    xhr.upload.onprogress = (e) => {
      setProgress((e.loaded / e.total) * 100);
    };
    xhr.send(data);
  };

  return (
    <div>
      <input type="file" onChange={(e) => upload(e.target.files[0])} />
      <progress value={progress} max="100" />


import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Users() {
  const { data, isLoading } = useQuery(["users"], () =>
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => res.data)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}


function todoReducer(state, action) {
  switch (action.type) {
    case "ADD": return [...state, { id: Date.now(), text: action.text }];
    case "REMOVE": return state.filter(t => t.id !== action.id);
    default: return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: "ADD", text })}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => dispatch({ type: "REMOVE", id: t.id })}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(!dark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

import { useRef, useEffect, useState } from "react";

function LazyImage({ src, alt }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={visible ? src : ""}
      alt={alt}
      style={{ minHeight: 100 }}
    />
  );
}


function DynamicForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <input name="name" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}


// AuthContext.js
import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const reducer = (state, action) => {
  if (action.type === "LOGIN") return { user: action.payload };
  if (action.type === "LOGOUT") return { user: null };
  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null });
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

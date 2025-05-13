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


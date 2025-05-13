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
}

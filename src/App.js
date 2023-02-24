import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './components/Collection';

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const cats = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];

  const categoryies = categoryId ? `category=${categoryId}` : '';

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://63f891ac5b0e4a127de8c5e0.mockapi.io/photos?page=${page}&limit=4&${categoryies}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCollection(data);
      })
      .catch((err) => {
        console.log('Error detected');
      })
      .finally(() => setLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              key={obj.name}
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>"Loading photos..."</h2>
        ) : (
          collection
            .filter((obj) =>
              obj.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((obj, id) => (
              <Collection
                category={obj.category}
                key={obj.id}
                name={obj.name}
                images={[obj.photos]}
              />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i)}
            className={page === i ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

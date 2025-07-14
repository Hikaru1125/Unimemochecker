import React, { useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    setSearchResult(null);

    if (!searchNumber.trim()) {
      setError('番号を入力してください');
      return;
    }

    const result = data.items.find(item => item.id === searchNumber.trim());
    
    if (result) {
      setSearchResult(result);
    } else {
      setError('該当する番号が見つかりませんでした');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchNumber('');
    setSearchResult(null);
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ユニメモリーチ目チェッカー</h1>
        <div className="search-container">
          <input
            type="text"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="番号を入力してください"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            検索
          </button>
          <button onClick={clearSearch} className="clear-button">
            クリア
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {searchResult && (
          <div className="result-container">
            <div className="result-card">
              <h2>{searchResult.title}</h2>
              <div className="result-content">
                <img 
                  src={process.env.PUBLIC_URL + '/' + searchResult.image}
                  alt={searchResult.title}
                  className="result-image"
                />
                <div className="result-details">
                  <p className="result-id">番号: {searchResult.id}</p>
                  <p className="result-category">カテゴリ: {searchResult.category}</p>
                  <p className="result-description">{searchResult.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="available-numbers">
          <h3>利用可能な番号例</h3>
          <div className="number-list">
            {data.items.map(item => (
              <span 
                key={item.id} 
                className="number-tag"
                onClick={() => setSearchNumber(item.id)}
              >
                {item.id}
              </span>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

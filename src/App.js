import React, { useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [completedItems, setCompletedItems] = useState(() => {
    // ローカルストレージから達成状況を読み込み
    const saved = localStorage.getItem('unimemo-completed');
    return saved ? JSON.parse(saved) : {};
  });
  const [showChecklist, setShowChecklist] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
      // モバイルでキーボードを閉じる
      e.target.blur();
    }
  };

  const clearSearch = () => {
    setSearchNumber('');
    setSearchResult(null);
    setError('');
    // フォーカスを外してキーボードを閉じる
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  };

  const handleNumberTagClick = (id) => {
    setSearchNumber(id);
    // モバイルで自動検索
    const result = data.items.find(item => item.id === id);
    if (result) {
      setSearchResult(result);
      setError('');
    }
  };

  // 達成状況をトグル
  const toggleCompletion = (id) => {
    const newCompletedItems = {
      ...completedItems,
      [id]: !completedItems[id]
    };
    setCompletedItems(newCompletedItems);
    localStorage.setItem('unimemo-completed', JSON.stringify(newCompletedItems));
  };

  // 達成率を計算
  const getCompletionRate = () => {
    const total = data.items.length;
    const completed = Object.values(completedItems).filter(Boolean).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  // フィルタリング処理
  const getFilteredItems = () => {
    return data.items.filter(item => {
      // カテゴリフィルタ
      if (filterCategory && item.category !== filterCategory) {
        return false;
      }
      
      // 状態フィルタ
      if (filterState) {
        if (Array.isArray(item.state)) {
          if (!item.state.includes(filterState)) {
            return false;
          }
        } else {
          if (item.state !== filterState) {
            return false;
          }
        }
      }
      
      // 条件フィルタ
      if (filterCondition) {
        if (Array.isArray(item.condition)) {
          if (!item.condition.includes(filterCondition)) {
            return false;
          }
        } else {
          if (item.condition !== filterCondition) {
            return false;
          }
        }
      }
      
      return true;
    });
  };

  // ユニークな値を取得する関数
  const getUniqueValues = (field) => {
    const values = new Set();
    data.items.forEach(item => {
      if (Array.isArray(item[field])) {
        item[field].forEach(val => values.add(val));
      } else if (item[field]) {
        values.add(item[field]);
      }
    });
    return Array.from(values).sort();
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="App">
      <header className="App-header">
        <h1>ユニメモチェッカー</h1>
        <div className="search-container">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="番号を入力してください"
            className="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
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
              <div className="result-header">
                <h2>{searchResult.title}</h2>
                <label className="completion-checkbox">
                  <input
                    type="checkbox"
                    checked={completedItems[searchResult.id] || false}
                    onChange={() => toggleCompletion(searchResult.id)}
                  />
                  <span className="checkmark">達成済み</span>
                </label>
              </div>
              <div className="result-content">
                <img 
                  src={process.env.PUBLIC_URL + '/' + searchResult.image}
                  alt={searchResult.title}
                  className="result-image"
                />
                <div className="result-details">
                  <p className="result-id">番号: {searchResult.id}</p>
                  <p className="result-category">成立役: {searchResult.category}</p>
                  {searchResult.state && (
                    <p className="result-state">状態: {Array.isArray(searchResult.state) ? searchResult.state.join('・') : searchResult.state}</p>
                  )}
                  {searchResult.condition && (
                    <p className="result-condition">条件: {searchResult.condition}</p>
                  )}
                  {searchResult.pressOrder && (
                    <p className="result-press-order">押し順: {searchResult.pressOrder}</p>
                  )}
                  <p className="result-description">{searchResult.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="available-numbers">
          <div className="checklist-header">
            <h3>新HANABIリーチ目コレクション</h3>
            <div className="checklist-controls">
              <div className="completion-stats">
                達成率: {getCompletionRate().completed}/{getCompletionRate().total} ({getCompletionRate().percentage}%)
                {filteredItems.length !== data.items.length && (
                  <span className="filter-info"> (フィルター適用: {filteredItems.length}件)</span>
                )}
              </div>
              <div className="control-buttons">
                <button 
                  className="filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'フィルター非表示' : 'フィルター表示'}
                </button>
                <button 
                  className="checklist-toggle"
                  onClick={() => setShowChecklist(!showChecklist)}
                >
                  {showChecklist ? 'リスト表示' : 'チェックリスト表示'}
                </button>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="filter-container">
              <div className="filter-group">
                <label htmlFor="category-filter">成立役:</label>
                <select 
                  id="category-filter"
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">全て</option>
                  {getUniqueValues('category').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="state-filter">状態:</label>
                <select 
                  id="state-filter"
                  value={filterState} 
                  onChange={(e) => setFilterState(e.target.value)}
                >
                  <option value="">全て</option>
                  {getUniqueValues('state').map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="condition-filter">条件:</label>
                <select 
                  id="condition-filter"
                  value={filterCondition} 
                  onChange={(e) => setFilterCondition(e.target.value)}
                >
                  <option value="">全て</option>
                  {getUniqueValues('condition').map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className="clear-filters"
                onClick={() => {
                  setFilterCategory('');
                  setFilterState('');
                  setFilterCondition('');
                }}
              >
                フィルタークリア
              </button>
            </div>
          )}
          
          <div className="number-list">
            {filteredItems.map(item => (
              <span 
                key={item.id} 
                className={`number-tag ${completedItems[item.id] ? 'completed' : ''} ${showChecklist ? 'checklist-mode' : ''}`}
                onClick={() => showChecklist ? toggleCompletion(item.id) : handleNumberTagClick(item.id)}
              >
                <img 
                  src={process.env.PUBLIC_URL + '/' + item.image}
                  alt={item.title}
                  className="number-tag-icon"
                />
                {showChecklist && (
                  <span className="checkbox-indicator">
                    {completedItems[item.id] ? '✓' : '○'}
                  </span>
                )}
                <span className="number-text">{item.id}</span>
              </span>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

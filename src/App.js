import React, { useState, useReducer, useEffect } from 'react'
import './App.css';
import { Books } from './Data.js'

const ACTIONS = {
  CHANGE_FILTER: 'change-keyword',
  CHANGE_CATEGORY: 'change-category',
  SORTBY_CATEGORY: 'sortby-category',
  SORTBY_KEYWORD: 'sortby-keyword',
  RESET: 'reset-books'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_FILTER:
      return {
        ...state,
        search: { ...state.search, keyword: action.payload.keyword }
      }
    case ACTIONS.CHANGE_CATEGORY:
      return {
        ...state,
        search: { ...state.search, category: action.payload.category }
      }
    default:
      return state
  }
}

function reducerBook(books, action) {
  switch (action.type) {
    case ACTIONS.SORTBY_CATEGORY:
      if (action.payload.category === '全部分類') {
        return books = action.payload.origin
      } else {
        return books.filter(book => book.category.match(action.payload.category))
      }
    case ACTIONS.SORTBY_KEYWORD:
      return books.filter(book => book.title.match(action.payload.keyword))
    case ACTIONS.RESET:
      return books = action.payload.origin
    default:
      return books
  }
}

const initialState = {
  search: { keyword: '', category: '0' }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [books, dispatchBook] = useReducer(reducerBook, Books)

  function handleCategory(e) {
    dispatch({ type: ACTIONS.CHANGE_CATEGORY, payload: { category: e.target.value } })
  }

  function handleFilter(e) {
    dispatch({ type: ACTIONS.CHANGE_FILTER, payload: { keyword: e.target.value } })
  }


  useEffect(() => {
    dispatchBook({ type: ACTIONS.RESET, payload: { origin: Books}})
    dispatchBook({ type: ACTIONS.SORTBY_CATEGORY, payload: { category: state.search.category, origin: Books}})
    dispatchBook({ type: ACTIONS.SORTBY_KEYWORD, payload: { keyword: state.search.keyword }})
  }, [state.search])


  return (
    <div className="flex flex-col w-1/2 mx-auto my-5 border-2 p-5">
      <div className="flex justify-center">
        <select value={state.search.category} onChange={handleCategory} className="border-2">
          <option key="0">全部分類</option>
          <option key="1">社會科學</option>
          <option key="2">商業理財</option>
        </select>
        <input type="text" value={state.search.keyword} onChange={handleFilter} className="border-2" placeholder="搜尋關鍵字" />
      </div>
      <table className="border-2 p-2 border-collapse mt-5">
        <thead className="bg-slate-400">
          <tr>
            <th className="border-2">書名</th>
            <th className="border-2">價錢</th>
            <th className="border-2">分類</th>
            <th className="border-2">出版日期</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book => {
              return <tr>
                <td className="border-2">{book.title}</td>
                <td className="border-2">{book.price}</td>
                <td className="border-2">{book.category}</td>
                <td className="border-2">{book.publishedAt}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

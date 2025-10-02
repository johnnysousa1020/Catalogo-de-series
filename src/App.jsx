import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SeriesDetails from "./pages/SeriesDetails"
import MySeriesList from './components/MySeriesList'
import SearchResults from './components/SearchResults'
import './App.css'

function App() {
    
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/series/:id' element={<SeriesDetails />}/>
          <Route path='/my-series' element={<MySeriesList />}/>
          <Route path='/search-results' element={<SearchResults />}/>
        </Routes>
      </div>
    </Router>
  )

}

export default App

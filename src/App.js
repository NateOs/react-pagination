import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

function App() {
  const {loading, data} = useFetch()  
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const handlePrevious = () => {
    let oldPage = page
    if (oldPage > 0) {
      setPage(oldPage - 1)
    } else {
      setPage(data.length - 1)
    }
  }

  const handleNext = () => {
    let oldPage = page
    if (oldPage < data.length - 1) {
      setPage(oldPage + 1)
    } else {
      setPage(0)
    }
  }

  return (
  <main>
    <div className='section-title'>
      <h1>{loading ? 'loading...' : 'pagination'}</h1>
      <div className='underline'></div>
    </div>
    <section className='followers'>
      <div className='container'>
        {followers.map((follower) => {
          return <Follower key={follower.id} {...follower}/>
        })}
      </div>
      {!loading && 
      <div className='btn-container'>
        <button className='page-btn' onClick={handlePrevious}>Prev</button>
        {data.map((item, index) => {
          return <button key={index} className={`page-btn ${index === page ? 'active-btn' : null}`} onClick={() => setPage(index)}>{index + 1}</button>
        })}
        <button className='page-btn' onClick={handleNext}>Next</button>
      </div>}
    </section>
  </main>)
}

export default App

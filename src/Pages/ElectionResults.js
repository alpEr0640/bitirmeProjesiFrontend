import React from 'react'
import Elections from '../Components/Elections'
import ElectionDetails from '../Components/ElectionDetails'
import "../Css/electionResults.css"

function ElectionResults() {
  return (
      <div className='electionResultsContainer'>
      <Elections />
      <ElectionDetails/>
    </div>
  )
}

export default ElectionResults
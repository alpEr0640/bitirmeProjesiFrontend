import React from 'react'
import CreateElectionCandidate from '../Components/CreateElectionCandidate'
import ElectionProperty from '../Components/ElectionProperty'
import '../Css/CreateElection.css'
function CreateElection() {
  return (
      <div className='CreateElectionContainer'>
          <CreateElectionCandidate />
          <ElectionProperty/>
    </div>
  )
}

export default CreateElection
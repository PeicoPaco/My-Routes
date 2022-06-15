import React from 'react'
import PropTypes from 'prop-types'

Directions.propTypes = {
  leg: PropTypes.any,
  cost: PropTypes.any
} 

export default function Directions({leg, cost}) {
  if (!leg.duration || !leg.distance) return null;
  return (
    <div className='information-headers'>
      <ul>
        <li>{leg.distance.text}</li>
        <li>{leg.duration.text}</li>
        <li>{cost} $</li>
      </ul>
        <div className='duration'></div>
  
    </div>
    
  )
}



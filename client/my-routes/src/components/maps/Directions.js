import React from 'react'

export default function Directions({leg}) {
  if (!leg.duration || !leg.distance) return null;
  return (
    <div className='directions-container'>
        <h2>Directions</h2>
        <div className='duration'>{leg.duration.text}</div>
    </div>
    
  )
}

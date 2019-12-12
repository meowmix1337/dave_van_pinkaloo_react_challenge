import './ProgressBar.css'
import React from 'react'
import Numeral from 'numeral'

function ProgressBar({ progress }) {
  const width = Numeral(progress).format('0%')
  
  return <div className="ProgressBar">
    <div className="ProgressBar-progress" style={{ width }} />
  </div>
}

export default ProgressBar
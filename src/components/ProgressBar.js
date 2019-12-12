import './ProgressBar.css'
import React from 'react'
import Numeral from 'numeral'

function ProgressBar({ progress }) {
  const width = Numeral(progress).format('0%')
  console.log(progress)
  return <div className="ProgressBar">
      <div className={ (progress >= 1.0 ? "ProgressBar-complete": "ProgressBar-progress") } style={{ width }}>
        
        { progress >= 1.0
          ? "Goal Reached!"
          : Numeral(progress).format('0%')
        }
      </div>
  </div>
}

export default ProgressBar
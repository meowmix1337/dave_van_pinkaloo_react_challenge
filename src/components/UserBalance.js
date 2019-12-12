import React from 'react'
import Numeral from 'numeral'
import './UserBalance.css'

export default ({ balance }) => {
	return <div className="UserBalance">
		<div className="UserBalance-amount">{ Numeral(balance).format('$0,0.00') }</div>
		<label>Available</label>
	</div>
}
import React from 'react'
import Numeral from 'numeral'
import './UserBalance.css'

export default ({ user, users }) => {
	const findUser = userId => {
		return users.find(user => user.id === userId);
	}

	const userData = findUser(user.id)

	//duplicate code, can move out to a util function
	let userName = "Anonymous"
    let image = null

	if(userData) {
		userName = userData.first_name && userData.last_name ? 
		  userData.first_name + " " + userData.last_name : userData.first_name
		image = userData.image
	}

	return <div className="UserBalance">
		<img className="UserImage ProfileImage" alt="" src={ image } />
		<strong className="ProfileName">Welcome, { userName }</strong>
		<div className="UserBalance-amount">{ Numeral(user.balance).format('$0,0.00') }</div>
		<label>Available</label>
	</div>
}
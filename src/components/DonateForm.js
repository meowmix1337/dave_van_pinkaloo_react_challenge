import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ADD_CONTRIBUTION } from '../modules'

const DonateForm = ({ campaign, dispatch }) => {
	const [amount, setAmount] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState(null)

	const resetForm = () => {
		setAmount('')
		setMessage('')
		setError(null)
	}

	const amountInputProps = {
		className: 'Donate-amount',
		value: amount,
		placeholder: 'Amount',
		onChange: ({ target: { value } }) => setAmount(value)
	}

	const messageInputProps = {
		className: 'Donate-message',
		value: message,
		placeholder: 'Message',
		onChange: ({ target: { value } }) => setMessage(value)
	}
	
	const buttonProps = {
		className: 'Donate-button',
		onClick: (event) => {

			//some validations
			if(!amount || amount <= 0) {
				setError('Please enter an amount above 0.')
			} else {
				//this took a while for me to figure out,
				// never used reacjs redux or anything before.
				dispatch({
					type: ADD_CONTRIBUTION,
					payload: {
						setError: setError,
						resetForm: resetForm,
						amount: parseFloat(parseFloat(amount).toFixed(2)), //make sure it is a number and only 2 decimal places
						campaignId: campaign.id,
						message: message
					}
				})
			}
		}
	}

	const errorMessage = error && (
		<div className="Donate-error">{ error }</div>
	)
	
	return <div className="CampaignInfo-donate">
		<h2>Donate to { campaign.name }</h2>
		<input type="number" { ...amountInputProps } />
		<input maxLength="40" { ...messageInputProps } />
		{ errorMessage }
		<button { ...buttonProps }>Donate</button>
	</div>
}

const mapStateToProps = function(state) {
	return {};
}

export default connect(mapStateToProps)(DonateForm)
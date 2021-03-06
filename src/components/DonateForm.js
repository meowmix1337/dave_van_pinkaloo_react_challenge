import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ADD_CONTRIBUTION, ADD_FUNDS } from '../modules'

const DonateForm = ({ campaign, dispatch }) => {
	const [amount, setAmount] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState(null)
	const [option, setOption] = useState("donate")

	const resetForm = () => {
		setAmount('')
		setMessage('')
		setError(null)
	}

	const optionInputProps = {
		className: 'Select-option',
		value: option,
		onChange: ({ target: { value } }) => setOption(value)
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
				if(option === "donate") {
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
				} else {
					dispatch({
						type: ADD_FUNDS,
						payload: {
							setError: setError,
							resetForm: resetForm,
							amount: parseFloat(parseFloat(amount).toFixed(2)), //make sure it is a number and only 2 decimal places
						}
					})
				}
			}
		}
	}

	const errorMessage = error && (
		<div className="Donate-error">{ error }</div>
	)
	
	return <div className="CampaignInfo-donate">
		<select { ...optionInputProps }>
			<option value="donate">Donate</option>
			<option value="add_funds">Add Funds</option>
		</select>
		{ option === "donate" ?
			<h2>Donate to { campaign.name }</h2>
			:
			<h2>Add funds to your Account</h2>
		}
		
		<input type="number" { ...amountInputProps } />
		{ option === "donate" ?
			<input maxLength="40" { ...messageInputProps } />
			:
			<div></div>
		}
		
		{ errorMessage }
		
		<button { ...buttonProps }>
		{ option === "donate" ?
			"Donate"
			:
			"Add Funds"
		}
		</button>
	</div>
}

const mapStateToProps = function(state) {
	return {};
}

export default connect(mapStateToProps)(DonateForm)
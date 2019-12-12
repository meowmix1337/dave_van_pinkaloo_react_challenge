import sampleData from './mock_data'

const initialState = { ...sampleData }

export const MERGE_SESSION = 'app/MERGE_SESSION'
export const ADD_CONTRIBUTION = 'app/ADD'

//- Redux
export const app = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case MERGE_SESSION: {
			const session = { ...state.session, ...payload }

			return { ...state, session }
		}

		case ADD_CONTRIBUTION: {
			const session = { ...state.session, ...payload }

			if(payload.amount > state.session.user.balance) {
				payload.setError("You do not have enough funds available")
				return { ...state, session }
			}
			//reset error message if any
			payload.resetForm()
			
			//creating the contribution object and appending it to the contributions array
			const contributions = state.contributions;
	
			const contribution = {
				id: contributions.length + 1,
				amount: payload.amount,
				campaignId: payload.campaignId,
				date: new Date().toISOString(),
				userId: state.session.user.id,
				message: payload.message
			}

			contributions.push(contribution);

			if(!state.transactions) {
				state.transactions = []
			}

			//one of the tasks required us to place the contribution into the state.transactions
			state.transactions.push(contribution)

			//updating the users balance
			state.session.user.balance -= payload.amount

			return { ...state, session, state}
		}

		default: {
			return state
		}
	}
}

//- Actions
/**
 * @name addContribution
 * @description sets up the action to add a contribution
 * @param amount {Number} - the amount to contribute
 * @param campaignId {Number} - the campaign id to contribute to
 * @param message {String} - the message the contributor set
 * @return the redux action
 */
export const addContribution = (amount, campaignId, message) => {
	return {
		type: ADD_CONTRIBUTION,
		payload: {
			amount: amount,
			campaignId: campaignId,
			message: message
		}
	}
}

export const selectCampaignById = campaignId => {
	return {
		type: MERGE_SESSION,
		payload: { selectedCampaignId: campaignId }
	}
}

//- Selectors

// Users
export const getUsers = state => {
	return state.app.users;
}

export const getSessionUser = state => {
	return state.app.session.user
}

// Session
export const getSession = state => {
	return state.app.session
}

// Contributions
export const getContributions = state => {
	return state.app.contributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Campaigns
export const getCampaigns = state => {
	//sorts the campaigns based off progress
	return state.app.campaigns.sort((a, b) => {
		const camp1Total = getCampaignContributionsTotal(state, a.id)
		const camp2Total = getCampaignContributionsTotal(state, b.id)

		const camp1Progress = camp1Total / a.goal
		const camp2Progress = camp2Total / b.goal

		return camp2Progress - camp1Progress
	})
}

export const getSelectedCampaignId = state => {
	return state.app.session.selectedCampaignId
}

export const getCampaignById = (state, campaignId) => {
	const campaigns = getCampaigns(state)
	
	return campaigns.find(campaign => campaign.id === campaignId)
}

export const getCampaignContributions = (state, campaignId) => {
	const contributions = getContributions(state)
	
	return contributions.reduce((array, contribution) => {
		if (contribution.campaignId !== campaignId) {
			return array
		}
		
		return [...array, contribution]
	}, [])
}

export const getCampaignContributionsTotal = (state, campaignId) =>
	getCampaignContributions(state, campaignId)
	.reduce((total, { amount }) => {
		return (total + amount)
	}, 0)

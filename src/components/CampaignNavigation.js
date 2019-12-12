import React from 'react'
import { connect } from 'react-redux'
import { selectCampaignById, getSession, getCampaigns, getCampaignContributions } from '../modules'

import CampaignItem from './CampaignItem'

function CampaignNavigation({ campaigns, selectedCampaignId, selectCampaignById, campaignContributions}) {
  // Generate component click handler for campaignId
  const campaignClickHandler = campaignId => event =>
    selectCampaignById(campaignId, event)

  const renderCampaignItem = campaign => {
    const { id } = campaign

    const key = `campaign-${ id }`
    const active = (id === selectedCampaignId)
    const onClick = campaignClickHandler(id)

    const itemProps = {
      key, active, campaign, onClick
    }

    return <CampaignItem { ...itemProps } />
  }

  //TODO: I have the campaigns sorted properly on load and if you click on a campaign
  // cannot figure out how to rerender when donations are contributed
  // how do I update the state so it re-renders this
  return (
    <div className="Campaigns">
    { campaigns.map(renderCampaignItem) }
  </div>
  )
}

const mapStateToProps = function(state) {
  const { selectedCampaignId } = getSession(state)
  const campaignContributions = getCampaignContributions(state, selectedCampaignId)

	return {
		campaigns: getCampaigns(state),
    selectedCampaignId,
    campaignContributions
	}
}

const mapDispatchToProps = {
  selectCampaignById
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignNavigation)

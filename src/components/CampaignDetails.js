import React from 'react'
import { connect } from 'react-redux'
import Numeral from 'numeral'
import ProgressBar from './ProgressBar'
import { getSelectedCampaignId, getCampaignContributionsTotal } from '../modules'

/**
 * @name CampaignDetails
 * @description Purpose: this component displays the current campagin in the main view
 * @param campaign {Object} - the campaign details
 * @param totalContributions {Number} - the total contributions in dollars
 */
function CampaignDetails({ campaign, totalContributions }) {

  const totalRaised = totalContributions; 
  let progress = totalRaised / campaign.goal; 

  //this will make sure the progress bar will never overflow
  if(progress > 1.0 || isNaN(progress)) {
    progress = 1.0
  }

	return  <div className="CampaignInfo-details">
            <div className="CampaignInfo-logo">
              <div className="Campaign-image" style={{backgroundImage: `url('${ campaign.image }')`}} />
            </div>
            <h3>{ campaign.name }</h3>
            <ProgressBar progress={ progress } />
            <div className="CampaignInfo-raised">{ Numeral(totalRaised).format('$0,0.00') } raised</div>
	        </div>
}


//learning purposes...this is how react uses redux to connect the states from different components?
// that's my guess
const mapStateToProps = function(state) {
  const selectedCampaignId = getSelectedCampaignId(state)
  const totalContributions = getCampaignContributionsTotal(state, selectedCampaignId)

  return { totalContributions }
}

export default connect(mapStateToProps)(CampaignDetails)
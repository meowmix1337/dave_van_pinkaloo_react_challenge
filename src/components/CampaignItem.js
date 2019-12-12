import React from 'react'
import ClassNames from 'classnames'
import { connect } from 'react-redux'

import ProgressBar from './ProgressBar'
import { getCampaignContributionsTotal } from '../modules'

function CampaignItem({ campaign, totalRaised, active, onClick }) {
  const className = ClassNames('Campaign', { active })
  const divProps = { className, onClick }

  let progress = totalRaised / campaign.goal; 
  //this will make sure the progress bar will never overflow
  if(progress > 1.0 || isNaN(progress)) {
    progress = 1.0
  }
  
  return <div {...divProps}>
    <div className="Campaign-logo">
      <div className="Campaign-image" style={{backgroundImage: `url('${ campaign.image }')`}} />
    </div>
    <div className="Campaign-name">{ campaign.name }</div>
    <div style={{flex: 1}} />
    <ProgressBar progress={ progress } />
  </div>
}

const mapStateToProps = function(state, { campaign }) {
  return {
    totalRaised: getCampaignContributionsTotal(state, campaign.id)
  }
}

export default connect(mapStateToProps)(CampaignItem)
import './CampaignInfo.css'

import React from 'react'
import { connect } from 'react-redux'
import { getCampaignById, getSelectedCampaignId, getCampaignContributions, getUsers } from '../modules'

import DonateForm from './DonateForm'
import Contributions from './CampaignContributions'
import CampaignDetails from './CampaignDetails'

function CampaignInfo({ campaign, contributions, users }) {
  return (
    <div className="CampaignInfo">
      <CampaignDetails campaign={ campaign } contributions={ contributions }/>
      <Contributions contributions={ contributions } users={ users }/>
      <DonateForm campaign={ campaign } />
    </div>
  )
}

const mapStateToProps = function(state) {
  const selectedCampaignId = getSelectedCampaignId(state)
  const campaign = getCampaignById(state, selectedCampaignId )
  const contributions = getCampaignContributions(state, selectedCampaignId)
  const users = getUsers(state)

  return { campaign, contributions, users }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignInfo)

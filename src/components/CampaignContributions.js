import './CampaignContributions.css'
import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

/**
 * @name Contributions
 * @description this component renders all the contributes
 * @param contributions {Array} - The list of contributions
 * @param users {Array} - The list of users, this is used to find the name of the contributor
 */
function Contributions({ contributions, users }) {

  /**
   * @name findUser
   * @description Finds the specific user for the contribution
   * @param userId {String} - the user id of the contributor
   * @return user {Obj} - the user of the contribution
   */
  const findUser = userId => {
    return users.find(user => user.id === userId);
  }
  
  const renderContribution = (contribution, index) => {

    //find the user so we can grab the avatar and name
    const userData = findUser(contribution.userId)

    //some default values for unknown peeps
    let userName = "Anonymous"
    let image = null

    //if we have user data, then we can set the name and image
    if(userData) {
      userName = userData.first_name && userData.last_name ? 
        userData.first_name + " " + userData.last_name : userData.first_name
      image = userData.image
    }
      
    const {
      user = {
        name: userName,
        image: image || "https://static.pinkaloo.com/static/img/profile.png"
      },
      amount,
      date,
      message
    } = contribution

    //we only care for displaying the message if there was one provided
    const hasMessage = !!contribution.message
  
    return <div key={contribution.id} className="ContributionInfo">
      <img className="UserImage" alt="" src={ user.image } />
      <div className="ContributionInfo-user">
        <strong>{ user.name }</strong>
        <div>{ Numeral(amount).format('$0,0.00') } donated</div>
        { hasMessage 
          ? <div>Message: { message }</div> 
          : <div></div>
        }
        <div className="ContributionInfo-date">{ Moment(date).format('MMM DD, YYYY') }</div>
      </div>
    </div>
  }

  return (
    <div className="CampaignInfo-contributions">
      { contributions.map(renderContribution) }
    </div>
  )
}

export default Contributions
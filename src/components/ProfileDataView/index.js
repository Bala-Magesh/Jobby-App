import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

class ProfileDataView extends Component {
  state = {showError: false, profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formattedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({profileDetails: formattedProfileData})
    } else {
      this.setState({showError: true})
    }
  }

  render() {
    const {profileDetails, showError} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails

    if (showError) {
      return (
        <div className="profile-error-bg">
          <button>Retry</button>
        </div>
      )
    }

    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt={name} />
        <h1 className="profile-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
}

export default ProfileDataView

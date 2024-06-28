import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'

class JobItemDetails extends Component {
  state = {isLoading: true, jobDetails: {}, skills: [], similarJobs: []}

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    const jobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
    }

    const formattedSkills = data.job_details.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    }))

    const formattedSimilarJobs = data.similar_jobs.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      employmentType: eachSimilarJob.employment_type,
      id: eachSimilarJob.id,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
    }))

    console.log(formattedSimilarJobs)

    this.setState({
      jobDetails,
      skills: formattedSkills,
      similarJobs: formattedSimilarJobs,
      isLoading: false,
    })
  }

  render() {
    const {isLoading, jobDetails, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <Header />
        {isLoading ? (
          <div className="job-details-bg-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        ) : (
          <div className="job-details-bg-container">
            <div className="job-item-info-card">
              <div className="job-info-heading-container">
                <div className="job-info-img-container">
                  <img
                    className="job-info-img"
                    src={companyLogoUrl}
                    alt="job details company logo"
                  />
                </div>
                <div>
                  <h1 className="job-card-title">{title}</h1>
                  <p className="job-card-rating">
                    <FaStar className="job-card-star-icon" /> {rating}
                  </p>
                </div>
              </div>
              <div className="outer-job-info-container">
                <div className="job-card-all-info-container">
                  <div className="job-card-icon-and-text-container">
                    <IoLocationSharp className="job-card-info-icon" />
                    <p className="job-card-info-text">{location}</p>
                  </div>
                  <div className="job-card-icon-and-text-container">
                    <BsBriefcaseFill className="job-card-info-icon" />
                    <p className="job-card-info-text">{employmentType}</p>
                  </div>
                </div>
                <div>
                  <p>{packagePerAnnum}</p>
                </div>
              </div>
              <hr className="horizontal-line" />
              <div className="heading-and-href-container">
                <h1 className="description-heading">Description</h1>
                <a className="href-element" href={companyWebsiteUrl}>
                  Visit
                </a>
              </div>
              <p className="job-description">{jobDescription}</p>
              <p>Skills</p>
              <ul className="skills-ul">
                {skills.map(eachSkill => {
                  const {imageUrl, name} = eachSkill
                  return (
                    <li className="skills-li" key={name}>
                      <img className="skills-img" src={imageUrl} alt={name} />
                      <p>{name}</p>
                    </li>
                  )
                })}
              </ul>
              <p>Life at Company</p>
              <div className="life-at-company-container">
                <p className="life-at-company-description">
                  {lifeAtCompany.description}
                </p>
                <img src={lifeAtCompany.imageUrl} alt="life at company" />
              </div>
            </div>
            <div>
              <h1 className="similar-jobs-heading">Similar Jobs</h1>
              <ul className="similar-jobs-ul">
                {similarJobs.map(eachJobDetails => (
                  <SimilarJobsCard
                    jobData={eachJobDetails}
                    key={eachJobDetails.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails

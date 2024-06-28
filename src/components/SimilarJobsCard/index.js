import './index.css'

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobData

  return (
    <li className="similar-jobs-card">
      <div className="job-info-heading-container">
        <div className="job-info-img-container">
          <img className="job-info-img" src={companyLogoUrl} alt={id} />
        </div>
        <div>
          <p className="job-card-title">{title}</p>
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
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}

export default SimilarJobsCard

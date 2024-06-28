import './index.css'

import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobInfoCard = props => {
  const {eachJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobData
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-info-card">
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
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 style={{fontSize: '20px'}}>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobInfoCard

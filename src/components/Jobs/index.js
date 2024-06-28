import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDataView from '../ProfileDataView'
import RadioButtonInput from '../RadioButtonInput'
import InputElement from '../InputElement'
import JobInfoCard from '../JobInfoCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobViewConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    selectedEmploymentTypeId: [],
    selectedSalaryRange: '',
    searchValue: '',
    jobViewStatus: jobViewConstants.initial,
    jobsData: [],
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({jobViewStatus: jobViewConstants.loading})
    const {
      selectedEmploymentTypeId,
      selectedSalaryRange,
      searchValue,
    } = this.state
    const joinedEmploymentType = selectedEmploymentTypeId.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinedEmploymentType}&minimum_package=${selectedSalaryRange}&search=${searchValue}`
    console.log(url)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const result = await fetch(url, options)

    if (result.ok === false) {
      this.setState({jobViewStatus: jobViewConstants.failure})
      return
    }

    const data = await result.json()
    const jobsData = data.jobs.map(eachJobs => ({
      companyLogoUrl: eachJobs.company_logo_url,
      employmentType: eachJobs.employment_type,
      id: eachJobs.id,
      jobDescription: eachJobs.job_description,
      location: eachJobs.location,
      packagePerAnnum: eachJobs.package_per_annum,
      rating: eachJobs.rating,
      title: eachJobs.title,
    }))

    this.setState({jobsData, jobViewStatus: jobViewConstants.success})
  }

  onChangeEmploymentType = employmentTypeId => {
    this.setState(prevState => {
      let {selectedEmploymentTypeId} = prevState

      if (selectedEmploymentTypeId.includes(employmentTypeId)) {
        selectedEmploymentTypeId = selectedEmploymentTypeId.filter(
          eachId => eachId !== employmentTypeId,
        )
      } else {
        selectedEmploymentTypeId.push(employmentTypeId)
      }

      return {selectedEmploymentTypeId}
    }, this.fetchJobDetails)
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.fetchJobDetails)
  }

  onChangeSearchValue = val => {
    this.setState({searchValue: val}, this.fetchJobDetails)
  }

  render() {
    const {
      selectedEmploymentTypeId,
      selectedSalaryRange,
      searchValue,
      jobViewStatus,
      jobsData,
    } = this.state

    const renderJobView = () => {
      const loadingView = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )

      const jobsView = (
        <ul className="jobs-view-ul">
          {jobsData.map(eachJobData => (
            <JobInfoCard eachJobData={eachJobData} key={eachJobData.id} />
          ))}
        </ul>
      )

      const failureView = (
        <div className="error-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={this.fetchJobDetails}
          >
            Retry
          </button>
        </div>
      )

      switch (jobViewStatus) {
        case jobViewConstants.initial:
          return null
        case jobViewConstants.loading:
          return loadingView
        case jobViewConstants.success:
          return jobsView
        case jobViewConstants.failure:
          return failureView
        default:
          return null
      }
    }

    return (
      <div className="outer-jobs-route-container">
        <Header />
        <div className="jobs-bg-container">
          <div className="menu-container">
            <ProfileDataView />
            <hr className="horizontal-line" />
            <div>
              <h1 className="filter-type-heading">Type of employment</h1>
              <ul className="radio-btns-ul-element">
                {employmentTypesList.map(eachEmploymentType => (
                  <RadioButtonInput
                    type="checkbox"
                    label={eachEmploymentType.label}
                    id={eachEmploymentType.employmentTypeId}
                    checked={selectedEmploymentTypeId.includes(
                      eachEmploymentType.employmentTypeId,
                    )}
                    onChange={this.onChangeEmploymentType}
                    key={eachEmploymentType.employmentTypeId}
                  />
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="filter-type-heading">Salary Range</h1>
              <ul className="radio-btns-ul-element">
                {salaryRangesList.map(eachSalary => (
                  <RadioButtonInput
                    type="radio"
                    label={eachSalary.label}
                    id={eachSalary.salaryRangeId}
                    name="salaryType"
                    checked={eachSalary.salaryRangeId === selectedSalaryRange}
                    onChange={this.onChangeSalaryRange}
                    key={eachSalary.salaryRangeId}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <InputElement
              value={searchValue}
              onChange={this.onChangeSearchValue}
            />
            {renderJobView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

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

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobsRoute extends Component {
  state = {
    profileApiStatus: 'initial',
    jobsApiStatus: 'initial',
    profileDetails: {},
    radioInputData: '',
    checkboxInputVal: '',
    allTypesOfJobs: [],
    requiredJobList: [],
  }

  componentDidMount() {
    this.fetchingProfileData()
    this.fetchJobsData()
  }

  fetchingProfileData = async () => {
    this.setState({profileApiStatus: constantApiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const profileDataResponse = await fetch(url, options)
    const profileDetailsData = await profileDataResponse.json()

    if (profileDataResponse.ok === true) {
      const updatedProfileDetails = {
        name: profileDetailsData.profile_details.name,
        shortBio: profileDetailsData.profile_details.short_bio,
        profileImageUrl: profileDetailsData.profile_details.profile_image_url,
      }
      console.log(updatedProfileDetails)
      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: constantApiStatus.success,
      })
    } else {
      this.setState({profileApiStatus: constantApiStatus.failure})
    }
  }

  ProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="CardOfUser">
        <div>
          <img src={profileImageUrl} alt="profile" className="image-user" />
        </div>
        <h1 className="user-name">{name}</h1>
        <p className="description">{shortBio}</p>
      </div>
    )
  }

  ProfileLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  ProfileFailureView = () => (
    <div>
      <div>
        <button type="button" onClick={this.fetchingProfileData}>
          Retry
        </button>
      </div>
    </div>
  )

  ProfileApiStatusChecking = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case 'SUCCESS':
        return this.ProfileSuccessView()
      case 'FAILURE':
        return this.ProfileFailureView()
      case 'LOADER':
        return this.ProfileLoaderView()
      default:
        return null
    }
  }

  fetchJobsData = async () => {
    this.setState({jobsApiStatus: constantApiStatus.loading})

    const {checkboxInputVal, radioInputData, requiredJobList} = this.state
    console.log(requiredJobList)
    const jwtToken = Cookies.get('jwt_token')
    const fetchingJobs = `https://apis.ccbp.in/jobs?employment_type=${requiredJobList}&minimum_package=${radioInputData}&search=${checkboxInputVal}`
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const FetchingJobsDetails = await fetch(fetchingJobs, optionsJobs)
    console.log(FetchingJobsDetails)
    const DetailsOfJobs = await FetchingJobsDetails.json()
    console.log(DetailsOfJobs)

    if (FetchingJobsDetails.ok === true) {
      const jobsDataAll = DetailsOfJobs.jobs.map(each => ({
        packagePerAnnum: each.package_per_annum,
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        allTypesOfJobs: jobsDataAll,
        jobsApiStatus: constantApiStatus.success,
      })
    } else {
      this.setState({jobsApiStatus: constantApiStatus.failure})
    }
  }

  onChangeInput = event => {
    this.setState({checkboxInputVal: event.target.value})
  }

  searchInputDown = event => {
    if (event.key === 'Enter') {
      this.fetchJobsData()
    }
  }

  onButtonSearch = () => {
    this.fetchJobsData()
  }

  onRadioChange = event => {
    this.setState({radioInputData: event.target.id}, this.fetchJobsData)
  }

  requiredJobList = event => {
    const {requiredJobList} = this.state
    const checkboxNotInLists = requiredJobList.filter(
      each => each === event.target.id,
    )
    if (checkboxNotInLists.length === 0) {
      this.setState(
        prevState => ({
          requiredJobList: [...prevState.requiredJobList, event.target.id],
        }),
        this.fetchJobsData,
      )
    } else {
      const filterData = requiredJobList.filter(
        each => each !== event.target.id,
      )
      this.setState(
        {
          requiredJobList: filterData,
        },
        this.fetchJobsData,
      )
    }
  }

  renderAllTypesJobs = () => {
    const {allTypesOfJobs} = this.state

    return (
      <ul className="AllDataOfItems">
        {allTypesOfJobs.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  DataNotFound = () => (
    <div className="DataNot">
      <div>
        <img
          className="noJobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
      </div>
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  JobsSuccessView = () => {
    const {allTypesOfJobs} = this.state

    const DataOfAllFetching =
      allTypesOfJobs.length > 0
        ? this.renderAllTypesJobs()
        : this.DataNotFound()

    return (
      <div className="jobsALlBg">
        <div className="flexingData">
          <div className="detailsOfAllJobs">{DataOfAllFetching}</div>
        </div>
      </div>
    )
  }

  JobsFailureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.fetchJobsData} type="button">
        Retry
      </button>
    </div>
  )

  JobsApiStatusChecking = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case 'SUCCESS':
        return this.JobsSuccessView()
      case 'FAILURE':
        return this.JobsFailureView()
      case 'LOADER':
        return this.ProfileLoaderView()
      default:
        return null
    }
  }

  render() {
    const {checkboxInputData} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="jobs-view-container">
          <div className="profile-and-filters-container">
            <div className="profile-container">
              {this.ProfileApiStatusChecking()}
            </div>
            <hr className="line" />
            <h1 className="heading">Type of Employment</h1>
            <ul className="type-of-employment-list">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    value={each.label}
                    className="emp-type"
                    id={each.employmentTypeId}
                  />
                  <label htmlFor={each.employmentTypeId} className="list-item">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="heading">Salary Range</h1>
            <ul className="salary-range-list">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input
                    type="radio"
                    value={each.label}
                    className="emp-type"
                    id={each.salaryRangeId}
                  />
                  <label htmlFor={each.salaryRangeId} className="list-item">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="search-and-jobs-details-container">
            <div className="search-input-container">
              <input
                className="inputSearch"
                onChange={this.onChangeInput}
                type="search"
                placeholder="Search"
                value={checkboxInputData}
                onKeyDown={this.searchInputDown}
              />
              <button
                className="ButtonSearch"
                onClick={this.onButtonSearch}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
                {/* */}
              </button>
            </div>
            <div className="jobs-list-container">
              {this.JobsApiStatusChecking()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute

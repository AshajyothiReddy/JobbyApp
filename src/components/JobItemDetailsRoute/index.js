import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BiBriefcase} from 'react-icons/bi'
import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

class JobItemDetails extends Component {
  state = {
    companyLogoUrl: '',
    companyWebsiteUrl: '',
    employmentType: '',
    id: '',
    jobDescription: '',
    skills: [],
    lifeAtCompany: {},
    location: '',
    packagePerAnnumn: '',
    rating: '',
    similarJobs: [],
    isLoading: true,
    requestFailed: false,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedCompanyLogoUrl = data.job_details.company_logo_url
      const updatedCompanyWebsiteUrl = data.job_details.company_website_url
      const updatedEmploymentType = data.job_details.employment_type
      const updatedId = data.job_details.id
      const updatedDescription = data.job_details.job_description
      const updatedSkills = data.job_details.skills.map(eachSkill => ({
        id: uuidv4(),
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedLocation = data.job_details.location
      const updatedPackagePerAnnum = data.job_details.package_per_annum
      const updatedRating = data.job_details.rating
      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employmemt_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        companyLogoUrl: updatedCompanyLogoUrl,
        companyWebsiteUrl: updatedCompanyWebsiteUrl,
        employmentType: updatedEmploymentType,
        id: updatedId,
        jobDescription: updatedDescription,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        location: updatedLocation,
        packagePerAnnumn: updatedPackagePerAnnum,
        rating: updatedRating,
        similarJobs: updatedSimilarJobs,
        isLoading: false,
      })
    } else {
      this.setState({requestFailed: true})
    }
  }

  renderFailureView = () => (
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

  renderSuccessView = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnumn,
      rating,
      similarJobs,
    } = this.state

    return (
      <>
        <div className="bg-container">
          <div className="job-item-bg-container">
            <div className="top-part">
              <div className="logo-title-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div className="title-rating-container">
                  <div className="icon-desc-container">
                    <FaStar className="icon" />
                    <p className="desc">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="icon-desc-container">
                  <MdLocationOn className="icon" />
                  <p className="desc">{location}</p>
                </div>
                <div className="icon-desc-container">
                  <BiBriefcase className="icon" />
                  <p className="desc">{employmentType}</p>
                </div>
                <div className="package-container">
                  <p className="package">{packagePerAnnumn}</p>
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="desc-website-url-container">
              <div className="headings-container">
                <h1 className="title">Description</h1>
                <a href={companyWebsiteUrl}>Visit</a>
              </div>
              <p className="desc">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1 className="title">Skills</h1>
              <ul className="skills-list">
                {skills.map(each => (
                  <SkillCard key={each.id} skillsDetails={each} />
                ))}
              </ul>
            </div>
            <h1 className="title">Life At Company</h1>
            <div className="life-at-company-container">
              <p className="desc">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                className="image"
                alt="life at company"
              />
            </div>
          </div>
          <div className="similar-jobs-container">
            <h1 className="title">Similar Jobs</h1>
            <ul className="skills-list">
              {similarJobs.map(each => (
                <SimilarJobItem similarJobDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {requestFailed} = this.state

    return requestFailed ? this.renderFailureView() : this.renderSuccessView()
  }
}

export default JobItemDetails

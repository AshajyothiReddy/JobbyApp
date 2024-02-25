import './index.css'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BiBriefcase} from 'react-icons/bi'

const JobCard = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const {jobDetails} = props
  const {
    companyLogo,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-card-item">
        <div className="logo-title-container">
          <img src={companyLogo} alt="company logo" className="company-logo" />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
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
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="desc-container">
          <h1 className="title">Description</h1>
          <p className="desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard

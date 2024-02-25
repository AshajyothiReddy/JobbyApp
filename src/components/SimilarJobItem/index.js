import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BiBriefcase} from 'react-icons/bi'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-container">
          <h1 className="title">{title}</h1>
          <div className="icon-desc-container">
            <FaStar className="icon" />
            <p className="desc">{rating}</p>
          </div>
        </div>
      </div>
      <div className="desc-container">
        <h1 className="title">Description</h1>
        <p className="desc">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem

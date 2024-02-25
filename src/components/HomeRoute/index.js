import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const HomeRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="home-content-container">
          <h1 className="home-page-heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="home-page-desc">
            Millions of people are searching for jobs, <br />
            salary information, company reviews. Find the job <br />
            that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="findjobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomeRoute

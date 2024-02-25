import './index.css'

const NotFoundRoute = () => (
  <div className="bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="desc">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFoundRoute

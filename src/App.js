import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import NotFoundRoute from './components/NotFoundRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetails from './components/JobItemDetailsRoute'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/jobs" component={JobsRoute} />
    <Route exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading'

import Nav from './components/Nav'

import Home from './screens/Home'
import Login from './screens/Login'
import NewQuestion from './screens/NewQuestion'
import Board from './screens/Board'
import Question from './screens/Question'
import NotFound from './screens/NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <main>
            {this.props.authedUser
              ? <Fragment>
                  <Nav />
                <div className="max-w-7xl mx-auto p-6">
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Board} />
                    <Route path='/question/:question_id' exact component={Question} />
                    <Route component={NotFound} />
                  </Switch>
                  </div>
                </Fragment>
              : <div className="max-w-7xl mx-auto p-6"><Login /></div>
            }
          </main>
        </Fragment>
      </Router>
    )
  } 
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

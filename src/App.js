import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'

import Login from './screens/Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        {/* <Header/> */}
        <main>
          <Login />
        </main>
        {/* <Footer/> */}
      </div>
    )
  } 
}

// function mapStateToProps({ authedUser }) {
//   return {
//     loading: authedUser === null
//   }
// }

export default connect()(App)

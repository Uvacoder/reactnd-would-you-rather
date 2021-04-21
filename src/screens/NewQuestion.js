import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewQuestion extends Component {
  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" >
        New Question
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: !users ? [] : Object.values(users).sort((a, b) => b.name - a.name)
  }
}

export default connect(mapStateToProps)(NewQuestion)
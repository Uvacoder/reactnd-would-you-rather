
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import UserListBox from '../components/UserListBox'

class Login extends Component {

  state = {
    selected: this.props.users[0]
  }

  setSelected = (selected) => {
    this.setState(() => ({
      selected
    }))
  }

  setUser = (e) => {
    e.preventDefault()
    this.state.selected && this.props.dispatch(setAuthedUser(this.state.selected.id))
  }

  render() {
    const { users } = this.props
    const { selected } = this.state

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" >
          <form className="max-w-md mt-8 space-y-6" onSubmit={this.setUser}>
            <h1 className="mt-6 text-center text-xl font-extrabold text-gray-900">
              Welcome to the Would You Rather App
            </h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to continue
            </h2>
          
            <UserListBox users={users} handleChange={this.setSelected} selected={selected} />

            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users: !users ? [] : Object.values(users).sort((a, b) => b.name - a.name)
  }
}

export default connect(mapStateToProps)(Login)
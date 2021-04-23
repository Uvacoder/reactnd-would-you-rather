import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from '../components/User'
import { AiOutlineTrophy } from 'react-icons/ai'
import { classNames } from '../utils/helpers'

class Board extends Component {
  render() {
    const {users} = this.props
    return (
      <div >
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex-grow">Leader Board</h1>
        </div>

        <div className='flex flex-col space-y-4'>
          {users.map((user, i) => (
            <div key={user.id} className="bg-white shadow overflow-hidden rounded-lg p-4">
              
              <div className="flex items-center mb-4 border-b pb-4 border-gray-200">
                <h3 className='text-lg font-bold flex-grow'>
                  <User user={user} />
                </h3>
                {i < 3 && (
                  <div>
                    <div className={classNames(
                      i === 0 && 'text-yellow-500',
                      i === 1 && 'text-gray-500',
                      i === 2 && 'text-yellow-800',
                      'flex font-bold items-center'
                    )}>
                      <AiOutlineTrophy className="h-5 w-5 mr-2" aria-hidden="true" />
                      {i === 0 && (<span>1st Place!</span>)}
                      {i === 1 && (<span>2nd Place!</span>)}
                      {i === 2 && (<span>3rd Place!</span>)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mb-4">
                <div className='space-y-2'>
                  <p><strong>Created questions:</strong> {user.questions.length}</p>
                  <hr />
                  <p><strong>Answered questions:</strong> {Object.entries(user.answers).length}</p>
                </div>
                <div className='flex-grow space-y-2'></div>
                <div className='text-center w-24 flex-shrink-0'>
                  <div className='font-bold'>Score</div>
                  <div className='font-bold text-xl p-2 rounded-full text-white bg-green-500 w-12 mx-auto center-items'>{user.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  users = Object.values(users).map(user => {
    return {
      ...user,
      score: user.questions.length + Object.values(user.answers).length
    }
  })
  return {
    authedUser,
    users: !users ? [] : users.sort((a, b) => (b.score) - (a.score))
  }
}

export default connect(mapStateToProps)(Board)
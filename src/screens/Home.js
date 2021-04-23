import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from '../components/Question'
import {classNames} from '../utils/helpers'

class Home extends Component {
  state = {
    tab: 'unanswered'
  }

  setTab = (tab) => {
    this.setState(() => ({
      tab
    }))
  }

  render() {
    const { answeredQuestions, unansweredQuestions, users } = this.props
    const {tab} = this.state
    return (
      <div>
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex-grow">Home</h1>

          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={(e) => this.setTab('unanswered')}
              className={classNames(
                          tab === 'unanswered' ? 'bg-blue-600 border-blue-800 hover:bg-blue-700 text-gray-100' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-500',
                          'relative inline-flex items-center px-2 py-2 rounded-l-md border  text-sm  font-medium'
                        )}
            >
              Unanswered Questions ({unansweredQuestions.length})
            </button>
            <button
              onClick={(e) => this.setTab('answered')}
              className={classNames(
                          tab === 'answered' ? 'bg-blue-600 border-blue-800 hover:bg-blue-700 text-gray-100' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-500',
                          'relative inline-flex items-center px-2 py-2 rounded-r-md border  text-sm  font-medium'
                        )}
            >
              Answered Questions ({answeredQuestions.length})
            </button>
          </nav>
        </div>
        
        <div className='flex flex-col space-y-4'>
          {this.state.tab === 'unanswered' && (
            unansweredQuestions.length ?
              unansweredQuestions.map(question => (
                <Question question={question} user={users[question.author]} key={question.id} />
              ))
            : (<div>You don't have any unanswered questions</div>)
          )}

          {this.state.tab === 'answered' && (
            answeredQuestions.length ?
              answeredQuestions.map(question => (
                <Question question={question} user={users[question.author]} key={question.id}  />
              ))
            : (<div>You don't have any answered questions yet</div>)
          )}

          
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    answeredQuestions: Object.values(questions).filter(q => Object.keys(users[authedUser].answers).includes(q.id)).sort((a,b) => b.timestamp - a.timestamp),
    unansweredQuestions: Object.values(questions).filter(q => !Object.keys(users[authedUser].answers).includes(q.id)).sort((a, b) => b.timestamp - a.timestamp),
    users
  }
}

export default connect(mapStateToProps)(Home)
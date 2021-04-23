import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { classNames } from '../utils/helpers'

import { handleAnswerQuestion } from '../actions/questions'

import User from '../components/User'
import Button from '../components/Button'

class Question extends Component {

  setAnswer = (e) => {
    e.preventDefault()
    const answer = e.target.elements.option.value
    const { dispatch, authedUser, id } = this.props
    if (!answer) {
      alert('Please select an option')
      return;
    }
    dispatch(handleAnswerQuestion({ authedUser, qid: id, answer}))
  }

  render() {
    const { authedUserAnswer, question, user } = this.props
    const options = ['optionOne', 'optionTwo']
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length

    return (
      <div>
        <div className="flex items-center mb-4 text-sm">
          <h3 className='text-3xl font-bold flex-grow'>
            Would you rather...
          </h3>
          <User user={user} context='by' />
        </div>
        {authedUserAnswer ? 
          
          <div className='flex flex-col mt-4'>
            <div className='flex items-center mb-4'>
              {options.map((option, i) => (
                <Fragment key={i}>
                  <div className={classNames(
                    authedUserAnswer === option ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-400',
                    'p-4 flex-grow rounded-md items-center text-lg font-bold'
                  )}>
                    <div className='flex items-center'>
                      {authedUserAnswer === option && (
                        <div className='w-4 h-4 bg-green-600 mr-2 rounded-xl'></div>
                      )}
                      {question[option].text}
                    </div>

                    <div className='mt-4 w-full bg-gray-200 rounded-md'>
                      <div style={{ width: `${question[option].votes.length / totalVotes * 100}%` }} className='bg-green-600 rounded-md text-sm h-6 items-center'>
                        {question[option].votes.length > 0 && (
                          <span className='ml-1 text-white'>
                            {Math.floor(question[option].votes.length / totalVotes * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <span className='text-sm font-bold'>{question[option].votes.length} of {totalVotes} votes</span>
                  </div>
                  {i === 0 && (
                    <div className='p-4 flex-grow-0'>or</div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          
          : <form className='flex flex-col mt-4' onSubmit={this.setAnswer}>
            <div className='flex items-center mb-4'>

              {options.map((option, i) => (
                <Fragment key={i}>
                  <label htmlFor={option} className='p-4 flex-grow bg-gray-100 rounded-md flex items-center hover:bg-gray-200'>
                    <input
                      id={option}
                      name="option"
                      value={option}
                      type="radio"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 mr-2"
                    />
                    {question[option].text}
                  </label>
                  { i === 0 && (
                    <div className='p-4 flex-grow-0'>or</div>
                  )}
                </Fragment>
              ))}
            </div>
            <Button>Submit answer</Button>
          </form>
        }
        
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { question_id } = props.match.params
  return {
    id: question_id,
    authedUser,
    authedUserAnswer: users[authedUser].answers[question_id],
    question: questions[question_id],
    user: users[questions[question_id].author]
  }
}

export default connect(mapStateToProps)(Question)
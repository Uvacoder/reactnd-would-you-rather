
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../components/Button'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: ''
  }

  updateOption = (e) => {
    e.preventDefault()
    const option = e.target.name
    const value = e.target.value

    this.setState(() => ({
      [option]: value
    }))
  }

  submitQuestion = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo
    }

    dispatch(handleAddQuestion(question))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='text-3xl font-bold flex-grow'>
          Create New question
        </h3>
        
        <form className="mt-8 font-bold" onSubmit={this.submitQuestion}>
          <label htmlFor="optionOne" className='mb-1'>Would you rather...</label>
          <div className='flex items-center mb-4'>
            <div className='p-4 flex-grow bg-gray-100 rounded-md flex items-center hover:bg-gray-200'>
              <input
                type="text"
                name="optionOne"
                id="optionOne"
                onChange={this.updateOption}
                value={optionOne}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md p-2"
              />
            </div>
          
            <label htmlFor="optionTwo" className='p-4 flex-grow-0'>or</label>
            
            <div className='p-4 flex-grow bg-gray-100 rounded-md flex items-center hover:bg-gray-200'>
              <input
                type="text"
                name="optionTwo"
                id="optionTwo"
                onChange={this.updateOption}
                value={optionTwo}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md p-2"
              />
            </div>
              
          </div>
          <Button disabled={this.state.optionOne.length === 0 || this.state.optionTwo.length === 0}>Submit question</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
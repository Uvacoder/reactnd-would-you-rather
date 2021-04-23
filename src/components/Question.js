import User from './User'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Question(props) {
  const { question, user } = props

  return (
    <Link to={`/question/${question.id}`} className="bg-white shadow overflow-hidden rounded-lg p-4">
      <div className="flex items-center mb-4 text-sm">
        <h3 className='text-lg font-bold flex-grow'>
          Would you rather...
        </h3>
        <User user={user} context='by' />
      </div>
      
      <div className='flex items-center mb-4'>
        <div className='p-4 flex-grow bg-gray-100 rounded-md'>{question.optionOne.text}</div>
        <div className='p-4 flex-grow-0'>or</div>
        <div className='p-4 flex-grow bg-gray-100 rounded-md'>{question.optionTwo.text}</div>
      </div>
    </Link>
  )
}
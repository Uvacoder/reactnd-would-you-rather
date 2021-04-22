import User from './User'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Question(props) {
  const { question, user } = props

  return (
    <Link to={`/question/${question.id}`} className="bg-white shadow overflow-hidden rounded-lg p-4">
      <h1 className='text-lg mb-4 font-bold'>
        Would you rather...
      </h1>
      
      <div className='flex items-center mb-4'>
        <div className='p-4 flex-grow bg-gray-100 rounded-md'>{question.optionOne.text}</div>
        <div className='p-4 flex-grow-0'>or</div>
        <div className='p-4 flex-grow bg-gray-100 rounded-md'>{question.optionTwo.text}</div>
      </div>
      <User user={user} />
    </Link>
  )
}
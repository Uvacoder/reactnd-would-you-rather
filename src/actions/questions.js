import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(text) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      text,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function answerQuestion({ qid, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
      .then(() => dispatch(addUserAnswer(info)))
      .then(() => dispatch(hideLoading()))
  }
}
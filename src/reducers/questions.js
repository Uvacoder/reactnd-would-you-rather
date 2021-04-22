import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      const { question } = action

      let replyingTo = {}
      if (question.replyingTo !== null) {
        replyingTo = {
          [question.replyingTo]: {
            ...state[question.replyingTo],
            replies: state[question.replyingTo].replies.concat([question.id])
          }
        }
      }

      return {
        ...state,
        [action.question.id]: action.question,
        ...replyingTo
      }
    default:
      return state
  }
}
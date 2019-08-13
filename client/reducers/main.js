import { UPDATE_ATTACHMENT_BASE } from '../actions/main'

const INITIAL_STATE = {
  attachmentBase: 'ABC'
}

const attachmentBase = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ATTACHMENT_BASE:
      return { ...state }

    default:
      return state
  }
}

export default attachmentBase

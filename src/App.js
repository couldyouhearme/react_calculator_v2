import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  SUB_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT: // bug here...
      return {
        ...state,
        curOp: `${state.curOp}${payload.digit}`
      }
  }
}

function App() {
  const [{ curOp, preOp, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='pre-op'>{preOp} {operation}</div>
        <div className='cur-op'>{curOp}</div>
      </div>
      <button className='span-two'>AC</button>
      <button>DEL</button>
      <OperationButton dispatch={dispatch} operation='/' />
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <OperationButton dispatch={dispatch} operation='*' />
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <OperationButton dispatch={dispatch} operation='+' />
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <OperationButton dispatch={dispatch} operation='-' />
      <DigitButton dispatch={dispatch} digit='.' />
      <DigitButton dispatch={dispatch} digit='0' />
      <button className='span-two'>=</button>
    </div>
  );
}

export default App

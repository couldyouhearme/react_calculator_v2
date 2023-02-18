import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          curOp: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === '0' && state.curOp === '0') return state
      if (payload.digit === '.' && state.curOp.includes('.')) return state
      return {
        ...state,
        curOp: `${state.curOp || ''}${payload.digit}`
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          curOp: null,
        }
      }
      if (state.curOp == null) return state
      if (state.curOp.length === 1) {
        return {
          ...state,
          curOp: null,
        }
      }
      return {
        ...state,
        curOp: state.curOp.slice(0, -1)
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.curOp == null && state.preOp == null) return state
      if (state.curOp == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.preOp == null) {
        return {
          ...state,
          operation: payload.operation,
          preOp: state.curOp,
          curOp: null,
        }
      }
      return {
        ...state,
        operation: payload.operation,
        preOp: evaluate(state),
        curOp: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if (state.preOp == null || state.curOp == null || state.operation == null) return state
      return {
        ...state,
        overwrite: true,
        operation: null,
        preOp: null,
        curOp: evaluate(state),
      }
  }
}

function evaluate({ curOp, preOp, operation }) {
  const curNum = parseFloat(curOp)
  const preNum = parseFloat(preOp)
  if (isNaN(curNum) || isNaN(preNum)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = preNum + curNum
      break
    case '-':
      computation = preNum - curNum
      break
    case '*':
      computation = preNum * curNum
      break
    case '/':
      computation = preNum / curNum
      break
    default:
      return computation
  }
  return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 })
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  } else {
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }
}

function App() {
  const [{ curOp, preOp, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='pre-op'>{formatOperand(preOp)} {operation}</div>
        <div className='cur-op'>{formatOperand(curOp)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
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
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div >
  );
}

export default App

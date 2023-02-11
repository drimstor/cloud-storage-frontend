import { ChangeEvent, useState } from 'react'
import useCheckValidation, { validationsList } from './useCheckValidation'

const useInput = (initialValue: string, validationsList: validationsList) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const [isOutFocus, setIsOutFocus] = useState(false)
  const onBlur = () => {
    setIsOutFocus(true)
  }

  const validateError = useCheckValidation(inputValue, validationsList)

  return {
    inputValue,
    onChange,
    onBlur,
    isOutFocus,
    validateError,
  }
}

export default useInput

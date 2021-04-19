import { ChangeEvent, useState } from 'react'
import { CustomInput } from './styled'
interface InputProps extends HTMLInputElement {}

export const Input = (props: InputProps) => {
  const [getChanges, setGetChanges] = useState('')

  function onChange(props: ChangeEvent<HTMLInputElement>) {
    return setGetChanges(props.target.value)
  }

  return (
    <CustomInput type={props.type} value={getChanges} onChange={e => onChange(e)}/>

  )
}
